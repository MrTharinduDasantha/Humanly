import query from "../utils/query.util.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.utils.js";

const getCurrentAdminId = (req) => {
  const token = req.cookies?.token;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") return null;
    return decoded.id;
  } catch (error) {
    console.log("Error in get current admin id:", error);
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

    const sql = "SELECT * FROM admin WHERE email = ?";
    const response = await query(sql, [email]);

    if (response.length > 0) {
      const admin = response[0];
      let isPasswordValid = false;

      try {
        isPasswordValid = await bcrypt.compare(password, admin.password);
      } catch (error) {
        isPasswordValid = false;
      }

      if (!isPasswordValid && password === admin.password)
        isPasswordValid = true;

      if (!isPasswordValid)
        return res.json({
          status: false,
          message: "Invalid email or password",
        });

      const token = jwt.sign(
        { role: "admin", email: admin.email, id: admin.id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      res.json({ status: true, message: "Login successfully" });
    } else res.json({ status: false, message: "Invalid email or password" });
  } catch (error) {
    console.log("Error in admin login:", error);
    res.json({ status: false, message: "Error in admin login" });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    const adminId = getCurrentAdminId(req);
    if (!adminId) return res.json({ status: false, message: "Unauthorized" });

    const sql = `
      SELECT
        id,
        email,
        name,
        bio,
        profile_pic AS profilePic,
        profile_pic_public_id AS profilePicPublicId
      FROM admin
      WHERE id = ?;
    `;

    const response = await query(sql, [adminId]);
    if (response.length === 0)
      return res.json({ status: false, message: "Admin not found" });

    res.json({
      status: true,
      admin: response[0],
    });
  } catch (error) {
    console.log("Error in get admin profile:", error);
    res.json({ status: false, message: "Error in get admin profile" });
  }
};

const updateAdminProfile = async (req, res) => {
  try {
    const adminId = getCurrentAdminId(req);
    if (!adminId) return res.json({ status: false, message: "Unauthorized" });

    const { name, bio, email, password } = req.body;
    if (!name || !email || name.trim() === "" || email.trim() === "")
      return res.json({
        status: false,
        message: "Name and email are required",
      });

    const existingRows = await query("SELECT * FROM admin WHERE id = ?", [
      adminId,
    ]);
    if (existingRows.length === 0)
      return res.json({ status: false, message: "Admin not found" });

    const existingAdmin = existingRows[0];
    let profilePic = existingAdmin.profile_pic;
    let profilePicPublicId = existingAdmin.profile_pic_public_id;

    if (req.file) {
      const uploadResponse = await uploadToCloudinary(req.file.buffer);
      profilePic = uploadResponse.secure_url;
      profilePicPublicId = uploadResponse.public_id;

      if (existingAdmin.profile_pic_public_id)
        await deleteFromCloudinary(existingAdmin.profile_pic_public_id);
    }

    let finalPassword = existingAdmin.password;
    if (password && password.trim() !== "")
      finalPassword = await bcrypt.hash(password.trim(), 10);

    const sql = `
      UPDATE admin
      SET name = ?, bio = ?, email = ?, password = ?, profile_pic = ?, profile_pic_public_id = ?
      WHERE id = ?
    `;

    await query(sql, [
      name.trim(),
      bio ? bio.trim() : "",
      email.trim(),
      finalPassword,
      profilePic,
      profilePicPublicId,
      adminId,
    ]);

    res.json({
      status: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log("Error in update admin profile:", error);
    res.json({ status: false, message: "Error in update admin profile" });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || email.trim() === "" || password.trim() === "")
      return res.json({
        status: false,
        message: "Email and password are required",
      });

    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    const sql = "INSERT INTO admin (email, password) VALUES (?, ?)";
    await query(sql, [email.trim(), hashedPassword]);

    res.json({
      status: true,
      message: "Admin added successfully",
    });
  } catch (error) {
    console.log("Error in add admin:", error);
    res.json({ status: false, message: "Error in add admin" });
  }
};

const editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio, email, password } = req.body;

    const existingRows = await query("SELECT * FROM admin WHERE id = ?", [id]);
    if (existingRows.length === 0)
      return res.json({ status: false, message: "Admin not found" });

    const existingAdmin = existingRows[0];
    let profilePic = existingAdmin.profile_pic;
    let profilePicPublicId = existingAdmin.profile_pic_public_id;

    if (req.file) {
      const uploadResponse = await uploadToCloudinary(req.file.buffer);
      profilePic = uploadResponse.secure_url;
      profilePicPublicId = uploadResponse.public_id;

      if (existingAdmin.profile_pic_public_id)
        await deleteFromCloudinary(existingAdmin.profile_pic_public_id);
    }

    let finalPassword = existingAdmin.password;
    if (password && password.trim() !== "")
      finalPassword = await bcrypt.hash(password.trim(), 10);

    const sql = `
      UPDATE admin
      SET name = ?, bio = ?,  email = ?, password = ?, profile_pic = ?, profile_pic_public_id = ?
      WHERE id = ?
    `;

    await query(sql, [
      name ? name.trim() : existingAdmin.name || "",
      bio ? bio.trim() : existingAdmin.bio || "",
      email ? email.trim() : existingAdmin.email,
      finalPassword,
      profilePic,
      profilePicPublicId,
      id,
    ]);

    res.json({
      status: true,
      message: "Admin updated successfully",
    });
  } catch (error) {
    console.log("Error in edit admin:", error);
    res.json({ status: false, message: "Error in edit admin" });
  }
};

const getAdmins = async (req, res) => {
  try {
    const sql = `
      SELECT
        id,
        email,
        name,
        bio,
        profile_pic AS profilePic,
        profile_pic_public_id AS profilePicPublicId
      FROM admin
    `;

    const response = await query(sql);

    res.json({
      status: true,
      admins: response,
    });
  } catch (error) {
    console.log("Error in get admins:", error);
    res.json({ status: false, message: "Error in get admins" });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const currentAdminId = getCurrentAdminId(req);

    if (String(currentAdminId) === String(id))
      return res.json({
        status: false,
        message: "You cannot delete your own account",
      });

    const existingRows = await query("SELECT * FROM admin WHERE id = ?", [id]);
    if (existingRows.length === 0)
      return res.json({ status: false, message: "Admin not found" });

    const admin = existingRows[0];
    if (admin.profile_pic_public_id)
      await deleteFromCloudinary(admin.profile_pic_public_id);

    await query("DELETE FROM admin WHERE id = ?", [id]);

    res.json({
      status: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.log("Error in delete admin:", error);
    res.json({ status: false, message: "Error in delete admin" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({
    status: true,
    message: "Loged out successfully",
  });
};

export {
  login,
  getAdminProfile,
  updateAdminProfile,
  addAdmin,
  editAdmin,
  getAdmins,
  deleteAdmin,
  logout,
};
