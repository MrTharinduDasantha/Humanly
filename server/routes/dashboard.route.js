import express from "express";
import {
  getEmployeesCount,
  getEmployersCount,
  getEmployeeCategoryCount,
} from "../controllers/dashboard.controller.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/employees-count", getEmployeesCount);
dashboardRouter.get("/employers-count", getEmployersCount);
dashboardRouter.get("/employee-category-count", getEmployeeCategoryCount);

export default dashboardRouter;
