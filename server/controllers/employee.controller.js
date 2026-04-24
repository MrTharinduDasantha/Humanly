import query from "../utils/query.util.js";
import bcrypt from "bcrypt";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.utils.js";

const addEmployee = async (req, res) => {
  try {
    const { name, categoryId, email, password, salary, address } = req.body;
    if (
      !req.file ||
      !name ||
      !categoryId ||
      !email ||
      !password ||
      !salary ||
      !address ||
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      address.trim() === ""
    )
      return res.json({
        status: false,
        message: "Profile photo and all fields are required",
      });

    const uploadResponse = await uploadToCloudinary(req.file.buffer);

    const sql = `
        INSERT INTO employees
        (profile_photo, profile_photo_public_id, name, category_id, email, password, salary, address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    await query(sql, [
      uploadResponse.secure_url,
      uploadResponse.public_id,
      name.trim(),
      categoryId,
      email.trim(),
      hashedPassword,
      salary,
      address.trim(),
    ]);

    res.json({
      status: true,
      message: "Employee added successfully",
    });
  } catch (error) {
    console.log("Error in add employee:", error);
    res.json({
      status: false,
      message: "Error in add employee",
    });
  }
};

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, categoryId, email, password, salary, address } = req.body;
    if (
      !name ||
      !categoryId ||
      !email ||
      !salary ||
      !address ||
      name.trim() === "" ||
      email.trim() === "" ||
      address.trim() === ""
    )
      return res.json({
        status: false,
        message: "All fields are required",
      });

    const existingRows = await query("SELECT * FROM employees WHERE id = ?", [
      id,
    ]);
    if (existingRows.length === 0)
      return res.json({
        status: false,
        message: "Employee not found",
      });

    const existingEmployee = existingRows[0];

    let profilePhoto = existingEmployee.profile_photo;
    let profilePhotoPublicId = existingEmployee.profile_photo_public_id;

    if (req.file) {
      const uploadResponse = await uploadToCloudinary(req.file.buffer);
      profilePhoto = uploadResponse.secure_url;
      profilePhotoPublicId = uploadResponse.public_id;

      await deleteFromCloudinary(existingEmployee.profile_photo_public_id);
    }

    const hansedPassword = await bcrypt.hash(password.trim(), 10);

    const findPassword =
      password && password.trim() !== ""
        ? hansedPassword
        : existingEmployee.password;

    const sql = `
        UPDATE employees
        SET profile_photo = ?, profile_photo_public_id = ?, name = ?, category_id = ?, email = ?, password = ?, salary = ?, address = ?
        WHERE id = ?
    `;

    await query(sql, [
      profilePhoto,
      profilePhotoPublicId,
      name.trim(),
      categoryId,
      email.trim(),
      findPassword,
      salary,
      address.trim(),
      id,
    ]);

    res.json({
      status: true,
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.log("Error in edit employee:", error);
    res.json({
      status: false,
      message: "Error in edit employee",
    });
  }
};

const getEmployee = async (req, res) => {
  try {
    const sql = `
        SELECT
            e.id,
            e.profile_photo AS profilePhoto,
            e.profile_photo_public_id AS profilePhotoPublicId,
            e.name,
            e.category_id AS categoryId,
            c.name AS categoryName,
            e.email,
            e.salary,
            e.address
        FROM employees e
        LEFT JOIN employee_category c ON e.category_id = c.id
    `;

    const response = await query(sql);

    res.json({
      status: true,
      employees: response,
    });
  } catch (error) {
    console.log("Error in get employee:", error);
    res.json({
      status: false,
      message: "Error in get employee",
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const existingRows = await query("SELECT * FROM employees WHERE id = ?", [
      id,
    ]);
    if (existingRows.length === 0)
      return res.json({
        status: false,
        message: "Employee not found",
      });

    const employee = existingRows[0];
    if (employee.profile_photo_public_id)
      await deleteFromCloudinary(employee.profile_photo_public_id);

    await query("DELETE FROM employees WHERE id = ?", [id]);

    res.json({
      status: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.log("Error in delete employee:", error);
    res.json({
      status: false,
      message: "Error in delete employee",
    });
  }
};

export { addEmployee, editEmployee, getEmployee, deleteEmployee };
