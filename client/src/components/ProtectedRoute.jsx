import { Navigate } from "react-router";

const ProtectedRoute = ({ children, role }) => {
  const valid = localStorage.getItem("valid");
  const storedRole = localStorage.getItem("role");

  if (!valid || storedRole !== role) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
