import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axiosInstance";
import Navbar from "../../components/Navbar/Navbar";
import "./LoginPage.css";
import { useAuth } from "../../contexts/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/users/login", { email, password });
      loginUser(response.data.token);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("User account was suspended by admin");
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-page">
        <div className="login-container">
          <h2>Please sign in</h2>
          <form onSubmit={handleLogin}>
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <button type="submit">Sign In</button>
          </form>
          <p>
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
