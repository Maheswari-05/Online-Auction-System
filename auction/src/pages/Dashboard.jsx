import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Dashboard = () => {
  const [auctions, setAuctions] = useState([]);
  const [activeTab, setActiveTab] = useState('current');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch auctions from the backend
  const fetchAuctions = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/auctions');
      const data = await response.json();
      if (response.ok) {
        setAuctions(data);
      } else {
        setError(data.message || 'Failed to fetch auctions');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  // Filter live and closed auctions
  const currentAuctions = auctions.filter(auction => !auction.isClosed);
  const closedAuctions = auctions.filter(auction => auction.isClosed);

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
                style={{ ...styles.button, width: 'auto', marginTop: 0 }}
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
                <div key={auction._id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{auction.title}</h5>
                      <p className="card-text">{auction.description}</p>
                      <p className="card-text">
                        <strong>Current Bid:</strong> ${auction.currentBid}
                      </p>
                      <p className="card-text">
                        <strong>{auction.isClosed ? 'Closed on:' : 'Ends on:'}</strong>{' '}
                        {new Date(auction.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="card-footer bg-white border-top-0">
                      <Link
                        to={`/auction/${auction._id}`}
                        style={{
                          ...styles.button,
                          display: 'block',
                          textAlign: 'center',
                          textDecoration: 'none',
                          width: '100%',
                          marginTop: 0,
                        }}
                      >
                        <span>{auction.isClosed ? 'View Details' : 'Place Bid'}</span>
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

const styles = {
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
};

export default Dashboard;