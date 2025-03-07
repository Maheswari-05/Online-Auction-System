import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const AuctionDetails = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bids, setBids] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch auction details
  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await fetch(`http://localhost:5001/auctions/${id}`);
        const data = await response.json();
        if (response.ok) {
          setAuction(data);
          setBidAmount(data.currentBid + 10); // Set default bid to current + 10
        } else {
          setError(data.message || 'Failed to fetch auction');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };

    fetchAuction();
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();

    const bidValue = parseFloat(bidAmount);
    if (isNaN(bidValue)) {
      setError('Please enter a valid bid amount');
      return;
    }

    if (bidValue <= auction.currentBid) {
      setError(`Your bid must be higher than the current bid ($${auction.currentBid})`);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/auctions/${id}/bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ bidAmount: bidValue }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Failed to place bid');
        return;
      }

      const updatedAuction = await response.json();
      setAuction(updatedAuction);
      setBids([...bids, { id: bids.length + 1, user: 'You', amount: bidValue, date: new Date() }]);
      setError('');
      alert('Bid placed successfully!');

      // Navigate back to the dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  if (!auction) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <Navbar />
        <div className="container py-5 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Navbar />
      <div className="container py-4">
        <div style={styles.gradientBorder}>
          <div style={{ ...styles.box, maxWidth: '100%' }}>
            <div className="mb-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="btn btn-outline-secondary mb-3"
              >
                &larr; Back to Dashboard
              </button>
            </div>

            <div className="row">
              <div className="col-lg-8">
                <h2 style={styles.heading}>{auction.title}</h2>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Description</h5>
                    <p className="card-text">{auction.description}</p>
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <p><strong>Current Bid:</strong> ${auction.currentBid}</p>
                        <p><strong>Ends on:</strong> {new Date(auction.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Place Your Bid</h5>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleBid}>
                      <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          className="form-control"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          min={auction.currentBid + 0.01}
                          step="0.01"
                          required
                        />
                        <button
                          type="submit"
                          style={{ ...styles.button, width: 'auto', marginTop: 0 }}
                          className="px-4"
                        >
                          <span>Place Bid</span>
                        </button>
                      </div>
                      <small className="text-muted">
                        Enter an amount higher than ${auction.currentBid}
                      </small>
                    </form>
                  </div>
                </div>
              </div>
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

export default AuctionDetails;