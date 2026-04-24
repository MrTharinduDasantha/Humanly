import express from "express";
import {
  addEmployeeCategory,
  editEmployeeCategory,
  getEmployeeCategories,
  deleteEmployeeCategory,
} from "../controllers/category.controller.js";

const categoryRouter = express.Router();

categoryRouter.post("/add", addEmployeeCategory);
categoryRouter.put("/edit/:id", editEmployeeCategory);
categoryRouter.get("/get", getEmployeeCategories);
categoryRouter.delete("/delete/:id", deleteEmployeeCategory);

export default categoryRouter;
