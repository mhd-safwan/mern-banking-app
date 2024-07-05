import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AdminAuth = ({ children }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAdminLoggedIn) {
      navigate("/admin/login");
    }
  }, [auth, navigate]);

  return children;
};

export default AdminAuth;
