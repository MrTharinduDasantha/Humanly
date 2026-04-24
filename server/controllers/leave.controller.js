import query from "../utils/query.util.js";
import jwt from "jsonwebtoken";

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

const getLeaveRequests = async (req, res) => {
  try {
    const sql = `
      SELECT
        lr.id,
        lr.employee_id AS employeeId,
        e.name AS employeeName,
        e.email AS employeeEmail,
        e.profile_photo AS employeePhoto,
        lr.reason,
        lr.leave_date AS leaveDate,
        lr.return_date AS returnDate,
        lr.status,
        lr.rejection_reason AS rejectionReason,
        lr.reviewed_at AS reviewedAt,
        lr.created_at AS createdAt
      FROM leave_requests lr
      INNER JOIN employees e ON lr.employee_id = e.id
      ORDER BY lr.id DESC
    `;
    const response = await query(sql);

    res.json({
      status: true,
      leaveRequests: response,
    });
  } catch (error) {
    console.log("Error in get leave requests:", error);
    res.json({ status: false, message: "Error in get leave requests" });
  }
};

const updateLeaveRequest = async (req, res) => {
  try {
    const adminId = getCurrentAdminId(req);
    if (!adminId) return res.json({ status: false, message: "Unauthorized" });

    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    if (!["accepted", "rejected"].includes(status))
      return res.json({
        status: false,
        message: "Invalid leave status",
      });

    if (
      status === "rejected" &&
      (!rejectionReason || rejectionReason.trim() === "")
    )
      return res.json({
        status: false,
        message: "Rejection reason is required",
      });

    const sql = `
      UPDATE leave_requests
      SET status = ?, rejection_reason = ?, reviewed_by = ?, reviewed_at = NOW()
      WHERE id = ?
    `;
    await query(sql, [
      status,
      status === "rejected" ? rejectionReason.trim() : null,
      adminId,
      id,
    ]);

    res.json({
      status: true,
      message: `Leave request ${status} successfully`,
    });
  } catch (error) {
    console.log("Error in update leave request:", error);
    res.json({ status: false, message: "Error in update leave request" });
  }
};

export { getLeaveRequests, updateLeaveRequest };
