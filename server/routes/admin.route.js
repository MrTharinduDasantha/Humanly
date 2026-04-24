import express from "express";
import upload from "../configs/multer.config.js";
import {
  login,
  getAdminProfile,
  updateAdminProfile,
  addAdmin,
  editAdmin,
  getAdmins,
  deleteAdmin,
  logout,
} from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.post("/login", login);
adminRouter.get("/profile", getAdminProfile);
adminRouter.put(
  "/update-profile",
  upload.single("profilePic"),
  updateAdminProfile,
);
adminRouter.post("/add", addAdmin);
adminRouter.put("/edit/:id", upload.single("profilePic"), editAdmin);
adminRouter.get("/get", getAdmins);
adminRouter.delete("/delete/:id", deleteAdmin);
adminRouter.post("/logout", logout);

export default adminRouter;
