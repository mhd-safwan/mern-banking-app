import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isUserLoggedIn: false,
    isAdminLoggedIn: false,
    token: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");
    if (token) {
      setAuth({ isUserLoggedIn: true, isAdminLoggedIn: false, token });
    } else if (adminToken) {
      setAuth({
        isUserLoggedIn: false,
        isAdminLoggedIn: true,
        token: adminToken,
      });
    }
  }, []);

  const loginUser = (token) => {
    localStorage.setItem("token", token);
    setAuth({ isUserLoggedIn: true, isAdminLoggedIn: false, token });
    navigate("/dashboard");
  };

  const loginAdmin = (token) => {
    localStorage.setItem("adminToken", token);
    setAuth({ isUserLoggedIn: false, isAdminLoggedIn: true, token });
    navigate("/admin/dashboard");
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setAuth({ isUserLoggedIn: false, isAdminLoggedIn: false, token: null });
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    setAuth({ isUserLoggedIn: false, isAdminLoggedIn: false, token: null });
  };

  return (
    <AuthContext.Provider
      value={{ auth, loginUser, loginAdmin, logoutUser, logoutAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
