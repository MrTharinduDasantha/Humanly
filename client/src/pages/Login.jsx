import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../configs/api";
import toast from "react-hot-toast";
import "./styles/Login.css";

const Login = () => {
  const [role, setRole] = useState("admin");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const endpoint =
      role === "employee" ? "/api/employee-auth/login" : "/api/admin/login";

    api
      .post(endpoint, values)
      .then((response) => {
        if (response.data.status) {
          localStorage.setItem("valid", "true");
          localStorage.setItem("role", role);
          toast.success(response.data.message);

          if (role === "employee") navigate("/employee");
          else navigate("/dashboard");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="login-page vh-100 d-flex justify-content-center align-items-center">
      <div className="login-card shadow-sm">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1">Welcome to Humanly</h2>
          <p className="text-muted mb-0">Sign in as employee or admin</p>
        </div>

        <div className="login-tabs mb-4">
          <button
            type="button"
            className={role === "employee" ? "login-tab active" : "login-tab"}
            onClick={() => setRole("employee")}
          >
            Employee
          </button>
          <button
            type="button"
            className={role === "admin" ? "login-tab active" : "login-tab"}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control form-control-lg rounded-3"
              placeholder="Enter your email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg rounded-3"
              placeholder="Enter your password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 btn-lg rounded-3"
          >
            Login as {role === "employee" ? "Employee" : "Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
