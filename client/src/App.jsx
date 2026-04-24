import { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ManageEmployees from "./pages/ManageEmployees";
import EmployeeCategories from "./pages/EmployeeCategories";
import Profile from "./pages/Profile";
import AdminLeaveRequests from "./pages/AdminLeaveRequests";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeHome from "./pages/EmployeeHome";

const App = () => {
  return (
    <Fragment>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="manage-employees" element={<ManageEmployees />} />
          <Route path="employee-categories" element={<EmployeeCategories />} />
          <Route path="leave-requests" element={<AdminLeaveRequests />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route
          path="/employee"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmployeeHome />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default App;
