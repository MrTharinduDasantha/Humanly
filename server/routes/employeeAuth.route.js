import express from "express";
import upload from "../configs/multer.config.js";
import {
  login,
  getEmployeeProfile,
  updateEmployeeProfile,
  requestLeave,
  getMyLeaves,
  logout,
} from "../controllers/employeeAuth.controller.js";

const employeeAuthRouter = express.Router();

employeeAuthRouter.post("/login", login);
employeeAuthRouter.get("/profile", getEmployeeProfile);
employeeAuthRouter.put(
  "/update-profile",
  upload.single("profilePic"),
  updateEmployeeProfile,
);
employeeAuthRouter.post("/leave-request", requestLeave);
employeeAuthRouter.get("/leaves", getMyLeaves);
employeeAuthRouter.post("/logout", logout);

export default employeeAuthRouter;
