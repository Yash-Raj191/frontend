import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onLogout }) => {
  const { user } = useAuth();
  return (
    <nav style={{background: '#eee', padding: '10px 20px', display: 'flex', justifyContent: 'space-between'}}>
      <div>
        <b>Excel Analytics</b>
        <Link to="/dashboard" style={{marginLeft: 20}}>Dashboard</Link>
        <Link to="/upload" style={{marginLeft: 20}}>Upload Excel</Link>
        <Link to="/history" style={{marginLeft: 20}}>History</Link>
      </div>
      <div>
        <span style={{marginRight: 20}}>Hello, {user?.name || 'User'}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
