import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignIn = ({ onSignIn }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await onSignIn(credentials);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Gradient Border Wrapper */}
      <div style={styles.gradientBorder}>
        {/* Sign-In Box */}
        <div style={styles.box}>
          <h2 style={styles.heading}>Sign In</h2>
          <form style={styles.form} onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                style={styles.input}
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                style={styles.input}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
          </form>
          <p style={styles.signUpText}>
            Don't have an account? <Link to="/signup" style={styles.signUpLink}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
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
    maxWidth: '400px',
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
    transition: 'opacity 0.3s ease',
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

export default SignIn;