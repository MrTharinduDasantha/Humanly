import { useEffect, useState } from "react";
import api from "../configs/api";
import toast from "react-hot-toast";
import AdminLeaveRequestsTable from "../components/AdminLeaveRequestsTable";
import "./styles/AdminLeaveRequests.css";

const AdminLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaveRequests = () => {
    setLoading(true);

    api
      .get("/api/leave/admin")
      .then((response) => {
        if (response.data.status) {
          setLeaveRequests(response.data.leaveRequests);
        } else toast.error(response.data.message);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleDecision = (id, status) => {
    let rejectionReason = "";

    if (status === "rejected") {
      rejectionReason = window.prompt("Enter rejection reason:");
      if (!rejectionReason || rejectionReason.trim() === "") return;
    }

    api
      .put(`/api/leave/admin/${id}`, {
        status,
        rejectionReason,
      })
      .then((response) => {
        if (response.data.status) {
          toast.success(response.data.message);
          fetchLeaveRequests();
          window.dispatchEvent(new Event("leaveRequestUpdated"));
        } else toast.error(response.data.message);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="leave-page p-4">
      <div className="container-fluid">
        <AdminLeaveRequestsTable
          leaveRequests={leaveRequests}
          loading={loading}
          handleDecision={handleDecision}
        />
      </div>
    </div>
  );
};

export default AdminLeaveRequests;
