import express from "express";
import {
  getLeaveRequests,
  updateLeaveRequest,
} from "../controllers/leave.controller.js";

const leaveRouter = express.Router();

leaveRouter.get("/admin", getLeaveRequests);
leaveRouter.put("/admin/:id", updateLeaveRequest);

export default leaveRouter;
