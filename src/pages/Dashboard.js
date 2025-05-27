import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <div style={{padding: '30px'}}>
        <h2>Welcome to your Dashboard!</h2>
        <p>
          Use the navigation above to upload Excel files, view your analysis history, or manage your profile.
        </p>
        {/* You can add dashboard widgets, stats, or quick links here */}
      </div>
    </div>
  );
};

export default Dashboard;
