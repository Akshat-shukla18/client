// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'; // Make sure the file name matches exactly (case-sensitive on some systems)

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Excel Analyzer</div>
      <div className="navbar-links">
        {token ? (
          <>
            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            <Link to="/upload" className="navbar-link">Upload</Link>
            <Link to="/data">View Data</Link>

            <button onClick={handleLogout} className="navbar-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
