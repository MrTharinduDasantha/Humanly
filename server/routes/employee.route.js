import express from "express";
import upload from "../configs/multer.config.js";
import {
  addEmployee,
  editEmployee,
  getEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";

const employeeRouter = express.Router();

employeeRouter.post("/add", upload.single("profilePhoto"), addEmployee);
employeeRouter.put("/edit/:id", upload.single("profilePhoto"), editEmployee);
employeeRouter.get("/get", getEmployee);
employeeRouter.delete("/delete/:id", deleteEmployee);

export default employeeRouter;
