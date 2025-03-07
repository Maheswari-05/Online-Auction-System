import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const NewAuction = () => {
  const [auction, setAuction] = useState({
    title: '',
    description: '',
    startingBid: '',
    endDate: '',
    image: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuction(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate all fields
    if (!auction.title || !auction.description || !auction.startingBid || !auction.endDate) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/auctions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(auction),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/dashboard'); // Redirect to dashboard after successful creation
      } else {
        setError(data.message || 'Failed to create auction');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Navbar />
      <div className="container py-4">
        <div>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={styles.heading}>Create New Auction</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label" style={styles.label}>Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  style={styles.input}
                  value={auction.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label" style={styles.label}>Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  style={{ ...styles.input, height: '120px' }}
                  rows="3"
                  value={auction.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="startingBid" className="form-label" style={styles.label}>Starting Bid ($)</label>
                <input
                  type="number"
                  className="form-control"
                  id="startingBid"
                  name="startingBid"
                  style={styles.input}
                  value={auction.startingBid}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="endDate" className="form-label" style={styles.label}>End Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="endDate"
                  name="endDate"
                  style={styles.input}
                  value={auction.endDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="image" className="form-label" style={styles.label}>Image URL (Optional)</label>
                <input
                  type="url"
                  className="form-control"
                  id="image"
                  name="image"
                  style={styles.input}
                  value={auction.image}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  style={{ ...styles.button, ...styles.cancelButton }}
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ ...styles.button, ...styles.submitButton }}
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Auction'}
                </button>
              </div>
              {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
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
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#333',
    marginBottom: '0.5rem',
  },
  input: {
    borderRadius: '8px',
    border: '1px solid #ddd',
    padding: '10px',
    fontSize: '1rem',
    width: '100%',
    transition: 'border-color 0.3s ease',
  },
  inputFocus: {
    borderColor: '#0ce39a',
    outline: 'none',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
  },
  submitButton: {
    background: 'linear-gradient(45deg, #0ce39a, #69007f, #fc0987)',
    color: '#fff',
  },
};

export default NewAuction;