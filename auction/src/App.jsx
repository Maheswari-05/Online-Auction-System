import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import NewAuction from './pages/NewAuction'; // Import the missing component
import AuctionDetails from './pages/AuctionDetails'; // Import the missing component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = (credentials) => {
    // Mock authentication - in a real app, this would validate against a backend
    if (credentials.email && credentials.password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
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
