

// components/Navbar.js - Navigation bar component
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // In a real app, this would clear authentication state
    // For now, just redirect to sign-in
    navigate('/signin');
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{
      background: 'linear-gradient(45deg, #0ce39a, #69007f, #fc0987)',
      padding: '12px 0',
    }}>
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          <strong>BidVerse</strong>
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/new-auction">New Auction</Link>
            </li>
          </ul>
          
          <button 
            onClick={handleLogout}
            className="btn btn-light"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
