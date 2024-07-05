import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        <h1>Welcome to Banking App</h1>
        <p>This is a basic banking operation website.</p>
        <div className="home-buttons">
          <button className="btn-primary" onClick={() => navigate('/register')}>Sign Up</button>
          <button className="btn-secondary" onClick={() => navigate('/login')}>Sign In</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
