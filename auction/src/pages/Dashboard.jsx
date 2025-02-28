import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import Navbar

const Dashboard = () => {
  const [auctions, setAuctions] = useState([]);
  const [activeTab, setActiveTab] = useState('current');
  const navigate = useNavigate();

  // Mock data
  useEffect(() => {
    const mockAuctions = [
      { id: 1, title: 'Vintage Watch', description: 'A rare vintage timepiece', currentBid: 250, endDate: new Date(Date.now() + 86400000), status: 'active' },
      { id: 2, title: 'Art Collection', description: 'Modern art paintings set', currentBid: 1200, endDate: new Date(Date.now() + 172800000), status: 'active' },
      { id: 3, title: 'Gaming Console', description: 'Latest gaming system', currentBid: 350, endDate: new Date(Date.now() - 86400000), status: 'closed' },
      { id: 4, title: 'Antique Furniture', description: '19th century cabinet', currentBid: 800, endDate: new Date(Date.now() - 172800000), status: 'closed' },
    ];
    setAuctions(mockAuctions);
  }, []);

  const currentAuctions = auctions.filter(auction => auction.status === 'active');
  const closedAuctions = auctions.filter(auction => auction.status === 'closed');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Navbar />
      <div className="container py-4">
        <div style={styles.gradientBorder} className="mb-4">
          <div style={{ ...styles.box, maxWidth: '100%' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 style={styles.heading}>Auction Dashboard</h2>
              <button 
                onClick={() => navigate('/new-auction')}
                style={{...styles.button, width: 'auto', marginTop: 0}}
                className="px-4"
              >
                <span>Post New Auction</span>
              </button>
            </div>
            
            {/* Tabs */}
            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'current' ? 'active' : ''}`}
                  onClick={() => setActiveTab('current')}
                >
                  Current Auctions
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'closed' ? 'active' : ''}`}
                  onClick={() => setActiveTab('closed')}
                >
                  Recently Closed
                </button>
              </li>
            </ul>
            
            {/* Auctions Grid */}
            <div className="row">
              {(activeTab === 'current' ? currentAuctions : closedAuctions).map(auction => (
                <div key={auction.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{auction.title}</h5>
                      <p className="card-text">{auction.description}</p>
                      <p className="card-text">
                        <strong>Current Bid:</strong> ${auction.currentBid}
                      </p>
                      <p className="card-text">
                        <strong>{auction.status === 'active' ? 'Ends on:' : 'Closed on:'}</strong>{' '}
                        {auction.endDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="card-footer bg-white border-top-0">
                      <Link 
                        to={`/auction/${auction.id}`}
                        style={{
                          ...styles.button, 
                          display: 'block', 
                          textAlign: 'center', 
                          textDecoration: 'none',
                          width: '100%',
                          marginTop: 0
                        }}
                      >
                        <span>{auction.status === 'active' ? 'Place Bid' : 'View Details'}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              
              {(activeTab === 'current' ? currentAuctions.length === 0 : closedAuctions.length === 0) && (
                <div className="col-12 text-center py-5">
                  <p className="text-muted">No auctions to display</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// Reusing the same styles for consistency
const styles = {
container: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
},
gradientBorder: {
  background: 'linear-gradient(45deg, #0ce39a, #69007f, #fc0987)',
  padding: '2px',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
},
box: {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '10px',
  width: '100%',
},
heading: {
  textAlign: 'center',
  marginBottom: '1.5rem',
  color: '#333',
},
form: {
  width: '100%',
},
input: {
  borderRadius: '5px',
  border: '1px solid #ddd',
  padding: '10px',
  fontSize: '16px',
},
button: {
  position: 'relative',
  textDecoration: 'none',
  color: '#fff',
  background: 'linear-gradient(45deg, #0ce39a, #69007f, #fc0987)',
  padding: '14px 25px',
  borderRadius: '10px',
  fontSize: '1.25em',
  cursor: 'pointer',
  border: 'none',
  width: '100%',
  marginTop: '1rem',
},
signUpText: {
  textAlign: 'center',
  marginTop: '1rem',
  color: '#666',
},
signUpLink: {
  color: '#007bff',
  textDecoration: 'none',
},
};

export default Dashboard;
