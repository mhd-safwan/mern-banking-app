import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axiosInstance";
import Navbar from "../../components/Navbar/Navbar";
import "./RegisterPage.css";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/users/register", { username, email, password });
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="register-page">
        <div className="register-container">
          <h2>Register your account</h2>
          <form onSubmit={handleRegister}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Register</button>
          </form>
          <p>
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
