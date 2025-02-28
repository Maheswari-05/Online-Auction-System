import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
  return (
    <div style={styles.container}>
      {/* Gradient Border Wrapper */}
      <div style={styles.gradientBorder}>
        {/* Sign-Up Box */}
        <div style={styles.box}>
          <h2 style={styles.heading}>Sign Up</h2>
          <form style={styles.form}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                style={styles.input}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                style={styles.input}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>
              <span>Sign Up</span>
            </button>
          </form>
          <p style={styles.signUpText}>
            Already have an account? <a href="/signin" style={styles.signUpLink}>Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

// Reuse the same styles from SignIn
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa', // Light background for the page
  },
  gradientBorder: {
    background: 'linear-gradient(45deg, #0ce39a, #69007f, #fc0987)',
    padding: '2px', // Border width
    borderRadius: '12px', // Rounded corners for the border
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  box: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px', // Slightly smaller radius to fit inside the border
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