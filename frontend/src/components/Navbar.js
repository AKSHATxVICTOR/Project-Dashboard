import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser, getCurrentUser } from '../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to='/' style={styles.logo}>
          Project Dashboard
        </Link>
        <div style={styles.links}>
          {user ? (
            <>
              <span style={styles.welcome}>Welcome, {user.name}</span>
              <Link to='/dashboard' style={styles.link}>
                Dashboard
              </Link>
              <button onClick={handleLogout} style={styles.button}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/login' style={styles.link}>
                Login
              </Link>
              <Link to='/register' style={styles.link}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#2c3e50',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  welcome: {
    color: '#ecf0f1',
    marginRight: '1rem',
  },
  button: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default Navbar;
