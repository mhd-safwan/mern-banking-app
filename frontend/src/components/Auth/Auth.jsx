import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Auth = ({ children }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isUserLoggedIn) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return children;
};

export default Auth;
