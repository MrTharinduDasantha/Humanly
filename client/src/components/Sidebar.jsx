import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import api from "../configs/api";
import toast from "react-hot-toast";
import "./styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const [pendingCount, setPendingCount] = useState(0);

  const fetchPendingCount = () => {
    api
      .get("/api/leave/admin")
      .then((response) => {
        if (response.data.status) {
          const count = response.data.leaveRequests.filter(
            (r) => r.status === "pending",
          ).length;
          setPendingCount(count);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchPendingCount();

    // Re-fetch count whenever admin makes a decision
    window.addEventListener("leaveRequestUpdated", fetchPendingCount);
    return () => {
      window.removeEventListener("leaveRequestUpdated", fetchPendingCount);
    };
  }, []);

  const handleLogout = async () => {
    api
      .post("/api/admin/logout")
      .then((response) => {
        if (response.data.status) {
          localStorage.removeItem("valid");
          localStorage.removeItem("role");
          toast.success(response.data.message);
          navigate("/login");
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark sidebar-wrapper">
      <div className="d-flex flex-column text-white min-vh-100 sidebar-inner">
        <div className="pt-3 pb-2 text-center">
          <NavLink
            to="/dashboard"
            className="d-flex justify-content-center align-items-center text-white text-decoration-none"
          >
            <span className="fs-4 fw-bolder">Humanly</span>
          </NavLink>
          <hr className="sidebar-line my-2" />
        </div>

        <ul
          className="nav nav-pills flex-column align-items-center align-items-sm-start px-2 sidebar-menu"
          id="menu"
        >
          <li className="w-100 mb-2">
            <NavLink
              to="/dashboard"
              end
              className="nav-link sidebar-link text-white px-3 py-2"
            >
              <i className="fs-5 bi-speedometer2 sidebar-icon" />
              <span className="ms-2 d-none d-sm-inline">Dashboard</span>
            </NavLink>
          </li>

          <li className="w-100 mb-2">
            <NavLink
              to="/dashboard/manage-employees"
              className="nav-link sidebar-link text-white px-3 py-2"
            >
              <i className="fs-5 bi-people sidebar-icon" />
              <span className="ms-2 d-none d-sm-inline">Manage Employees</span>
            </NavLink>
          </li>

          <li className="w-100 mb-2">
            <NavLink
              to="/dashboard/employee-categories"
              className="nav-link sidebar-link text-white px-3 py-2"
            >
              <i className="fs-5 bi-columns sidebar-icon" />
              <span className="ms-2 d-none d-sm-inline">Category</span>
            </NavLink>
          </li>

          <li className="w-100 mb-2">
            <NavLink
              to="/dashboard/leave-requests"
              className="nav-link sidebar-link text-white px-3 py-2"
            >
              <i className="fs-5 bi-bell sidebar-icon" />
              <span className="ms-2 d-none d-sm-inline">Leave Requests</span>
              {pendingCount > 0 && (
                <span className="badge bg-danger rounded-pill ms-2 sidebar-badge">
                  {pendingCount}
                </span>
              )}
            </NavLink>
          </li>

          <li className="w-100 mb-2">
            <NavLink
              to="/dashboard/profile"
              className="nav-link sidebar-link text-white px-3 py-2"
            >
              <i className="fs-5 bi-person sidebar-icon" />
              <span className="ms-2 d-none d-sm-inline">Profile</span>
            </NavLink>
          </li>
        </ul>

        <div className="mt-auto px-2 pb-3">
          <button
            onClick={handleLogout}
            className="btn nav-link sidebar-link text-white px-3 py-2 w-100 text-start"
          >
            <i className="fs-5 bi-power sidebar-icon" />
            <span className="ms-2 d-none d-sm-inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
