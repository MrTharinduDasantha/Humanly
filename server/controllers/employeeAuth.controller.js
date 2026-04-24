import query from "../utils/query.util.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.utils.js";

const getCurrentEmployeeId = (req) => {
  const token = req.cookies?.token;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "employee") return null;
    return decoded.id;
  } catch (error) {
    console.log("Error in get current employee id:", error);
    return null;
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || email.trim() === "" || password.trim() === "")
      return res.json({
        status: false,
        message: "Email and password are required",
      });

    const sql = "SELECT * FROM employees WHERE email = ?";
    const response = await query(sql, [email.trim()]);

    if (response.length === 0)
      return res.json({
        status: false,
        message: "Invalid email or password",
      });

    const employee = response[0];

    let isPasswordValid = false;
    try {
      isPasswordValid = await bcrypt.compare(password, employee.password);
    } catch (error) {
      isPasswordValid = false;
    }

    if (!isPasswordValid && password === employee.password)
      isPasswordValid = true;

    if (!isPasswordValid)
      return res.json({
        status: false,
        message: "Invalid email or password",
      });

    const token = jwt.sign(
      { role: "employee", email: employee.email, id: employee.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.json({
      status: true,
      message: "Employee logged in successfully",
    });
  } catch (error) {
    console.log("Error in employee login:", error);
    res.json({ status: false, error: "Error in employee login" });
  }
};

const getEmployeeProfile = async (req, res) => {
  try {
    const employeeId = getCurrentEmployeeId(req);
    if (!employeeId)
      return res.json({ status: false, message: "Unauthorized" });

    const sql = `
      SELECT
        e.id,
        e.name,
        e.category_id AS categoryId,
        c.name AS categoryName,
        e.email,
        e.salary,
        e.address,
        e.profile_photo AS profilePhoto,
        e.profile_photo_public_id AS profilePhotoPublicId
      FROM employees e
      LEFT JOIN employee_category c ON e.category_id = c.id
      WHERE e.id = ?
    `;
    const response = await query(sql, [employeeId]);

    if (response.length === 0)
      return res.json({ status: false, message: "Employee not found" });

    res.json({
      status: true,
      employee: response[0],
    });
  } catch (error) {
    console.log("Error in get employee profile:", error);
    res.json({ status: false, message: "Error in get employee profile" });
  }
};

const updateEmployeeProfile = async (req, res) => {
  try {
    const employeeId = getCurrentEmployeeId(req);
    if (!employeeId)
      return res.json({ status: false, message: "Unauthorized" });

    const { name, categoryId, email, password, address } = req.body;
    if (
      !name ||
      !categoryId ||
      !email ||
      !address ||
      name.trim() === "" ||
      email.trim() === "" ||
      address.trim() === ""
    )
      return res.json({
        status: false,
        message: "Name, category, email, and address are required",
      });

    const existingRows = await query("SELECT * FROM employees WHERE id = ?", [
      employeeId,
    ]);
    if (existingRows.length === 0)
      return res.json({ status: false, message: "Employee not found" });

    const existingEmployee = existingRows[0];
    let profilePhoto = existingEmployee.profile_photo;
    let profilePhotoPublicId = existingEmployee.profile_photo_public_id;

    if (req.file) {
      const uploadResponse = await uploadToCloudinary(req.file.buffer);
      profilePhoto = uploadResponse.secure_url;
      profilePhotoPublicId = uploadResponse.public_id;

      if (existingEmployee.profile_photo_public_id)
        await deleteFromCloudinary(existingEmployee.profile_photo_public_id);
    }

    let finalPassword = existingEmployee.password;
    if (password && password.trim() !== "")
      finalPassword = await bcrypt.hash(password.trim(), 10);

    const sql = `
      UPDATE employees
      SET profile_photo = ?, profile_photo_public_id = ?, name = ?, category_id = ?, email = ?, password = ?, address = ?
      WHERE id = ?
    `;
    await query(sql, [
      profilePhoto,
      profilePhotoPublicId,
      name.trim(),
      categoryId,
      email.trim(),
      finalPassword,
      address.trim(),
      employeeId,
    ]);

    res.json({
      status: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log("Error in update employee profile:", error);
    res.json({
      status: false,
      message: "Error in update employee profile",
    });
  }
};

const requestLeave = async (req, res) => {
  try {
    const employeeId = getCurrentEmployeeId(req);
    if (!employeeId)
      return res.json({ status: false, message: "Unauthorized" });

    const { reason, leaveDate, returnDate } = req.body;
    if (
      !reason ||
      !leaveDate ||
      !returnDate ||
      reason.trim() === "" ||
      leaveDate.trim() === "" ||
      returnDate.trim() === ""
    )
      return res.json({
        status: false,
        message: "All leave request fields are required",
      });

    const sql = `
      INSERT INTO leave_requests
      (employee_id, reason, leave_date, return_date)
      VALUES (?, ?, ?, ?)
    `;
    await query(sql, [employeeId, reason.trim(), leaveDate, returnDate]);

    res.json({
      status: true,
      message: "Leave request sent successfully",
    });
  } catch (error) {
    console.log("Error in request leave:", error);
    res.json({ status: false, message: "Error in request leave" });
  }
};

const getMyLeaves = async (req, res) => {
  try {
    const employeeId = getCurrentEmployeeId(req);
    if (!employeeId)
      return res.json({ status: false, message: "Unauthorized" });

    const sql = `
      SELECT
        id,
        reason,
        leave_date AS leaveDate,
        return_date AS returnDate,
        status,
        rejection_reason AS rejectionReason,
        reviewed_at AS reviewedAt,
        created_at AS createdAt
      FROM leave_requests
      WHERE employee_id = ?
      ORDER BY id DESC
    `;
    const response = await query(sql, [employeeId]);

    res.json({
      status: true,
      leaves: response,
    });
  } catch (error) {}
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({
    status: true,
    message: "Logged out successfully",
  });
};

export {
  login,
  getEmployeeProfile,
  updateEmployeeProfile,
  requestLeave,
  getMyLeaves,
  logout,
};
