// components/AuctionDetails.js - Detail view with bidding functionality
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

  // Mock data fetch - in a real app, this would be an API call
  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      const mockAuction = {
        id: parseInt(id),
        title: 'Vintage Watch',
        description: 'A rare vintage timepiece from the 1950s. Excellent condition with original leather strap and box.',
        startingBid: 200,
        currentBid: 250,
        endDate: new Date(Date.now() + 86400000),
        seller: 'JohnDoe',
        status: 'active'
      };
      
      const mockBids = [
        { id: 1, user: 'User123', amount: 250, date: new Date(Date.now() - 3600000) },
        { id: 2, user: 'Collector42', amount: 230, date: new Date(Date.now() - 7200000) },
      ];
      
      setAuction(mockAuction);
      setBids(mockBids);
      setBidAmount(mockAuction.currentBid + 10); // Set default bid to current + 10
    }, 500);
  }, [id]);

  const handleBid = (e) => {
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
    
    // In a real app, this would send the bid to the server
    const newBid = {
      id: bids.length + 1,
      user: 'You',
      amount: bidValue,
      date: new Date()
    };
    
    setBids([newBid, ...bids]);
    setAuction({
      ...auction,
      currentBid: bidValue
    });
    setError('');
    alert('Bid placed successfully!');
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
                        <p><strong>Auction ID:</strong> #{auction.id}</p>
                        <p><strong>Seller:</strong> {auction.seller}</p>
                        <p>
                          <strong>Status:</strong>{' '}
                          <span className="badge bg-success">
                            Active
                          </span>
                        </p>
                        </div>
                      <div className="col-md-6">
                        <p><strong>Starting Bid:</strong> ${auction.startingBid}</p>
                        <p><strong>Current Bid:</strong> ${auction.currentBid}</p>
                        <p>
                          <strong>Ends on:</strong>{' '}
                          {auction.endDate.toLocaleDateString()}
                        </p>
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
                          style={styles.input}
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          min={auction.currentBid + 0.01}
                          step="0.01"
                          required
                        />
                        <button 
                          type="submit" 
                          style={{...styles.button, width: 'auto', marginTop: 0}}
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
              
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Bid History</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    {bids.map(bid => (
                      <li key={bid.id} className="list-group-item">
                        <div className="d-flex justify-content-between">
                          <span><strong>${bid.amount}</strong> by {bid.user}</span>
                          <small className="text-muted">
                            {bid.date.toLocaleString()}
                          </small>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusing the same styles object as defined above
const styles = {
  /* Same styles as above */
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

};

export default AuctionDetails;

