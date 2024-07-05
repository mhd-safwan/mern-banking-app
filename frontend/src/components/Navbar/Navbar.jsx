import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, logoutUser, logoutAdmin } = useAuth();

  const handleLogout = () => {
    if (auth.isUserLoggedIn) {
      logoutUser();
    } else if (auth.isAdminLoggedIn) {
      logoutAdmin();
    }
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('/')}>BankingApp</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        {auth.isUserLoggedIn && (
          <>
            <li><button className="nav-button" onClick={() => navigate('/admin/dashboard')}>Admin Dashboard</button></li>
            <li><button className="nav-button" onClick={handleLogout}>Logout </button></li>
          </>
        )}
        {auth.isAdminLoggedIn && (
          <>
            <li><button className="nav-button" onClick={() => navigate('/dashboard')}>User Dashboard</button></li>
            <li><button className="nav-button" onClick={handleLogout}>Admin Logout</button></li>
          </>
        )}
        {!auth.isUserLoggedIn && !auth.isAdminLoggedIn && (
          <>
            <li><button className="nav-button" onClick={() => navigate('/login')}>Sign In</button></li>
            <li><button className="nav-button" onClick={() => navigate('/register')}>Sign Up</button></li>
            <li><button className="nav-button" onClick={() => navigate('/admin/login')}>Admin Login</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
