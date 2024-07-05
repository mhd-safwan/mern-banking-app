import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance';
import Navbar from "../../components/Navbar/Navbar";
import './AdminLoginPage.css';
import { useAuth } from '../../contexts/AuthContext';

function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loginAdmin } = useAuth();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/admin/login', { username, password });
      loginAdmin(response.data.token);
      toast.success('Admin login successful');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Admin login failed');
    }
  };

  return (
    <div>
      <Navbar />
    <div className="login-page">
      <div className="login-container">
        <h2>Please sign in</h2>
        <form onSubmit={handleAdminLogin}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
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
      </div>
    </div>
    </div>
  );
}

export default AdminLoginPage;
