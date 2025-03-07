import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import NewAuction from './pages/NewAuction';
import AuctionDetails from './pages/AuctionDetails';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for a valid token on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignIn = (success) => {
    setIsAuthenticated(success);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={
          isAuthenticated ? 
            <Navigate to="/dashboard" /> : 
            <SignIn onSignIn={handleSignIn} />
        } />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={
          isAuthenticated ? 
            <Dashboard /> : 
            <Navigate to="/signin" />
        } />
        <Route path="/new-auction" element={
          isAuthenticated ? 
            <NewAuction /> : 
            <Navigate to="/signin" />
        } />
        <Route path="/auction/:id" element={
          isAuthenticated ? 
            <AuctionDetails /> : 
            <Navigate to="/signin" />
        } />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;