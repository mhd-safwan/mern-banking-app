import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { auth } = useAuth();

  if (adminOnly && !auth.isAdminLoggedIn) {
    return <Navigate to="/admin/login" />;
  }

  if (!adminOnly && !auth.isUserLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
