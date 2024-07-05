import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage/AdminDashboardPage";
import { AuthProvider } from "./contexts/AuthContext"; // Update the import
import Auth from "./components/Auth/Auth";
import AdminAuth from "./components/Auth/AdminAuth";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <Auth>
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              </Auth>
            }
          />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminAuth>
                <ProtectedRoute adminOnly>
                  <AdminDashboardPage />
                </ProtectedRoute>
              </AdminAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
