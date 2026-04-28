import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...userData } = formData;
      await registerUser(userData);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.title}>Create an Account</h2>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder='Enter your name'
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder='Enter your email'
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder='Enter a password'
              minLength='6'
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder='Confirm your password'
              minLength='6'
            />
          </div>
          <button type='submit' style={styles.button} disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p style={styles.linkText}>
          Already have an account?{' '}
          <Link to='/login' style={styles.link}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 80px)',
    padding: '2rem',
    backgroundColor: '#ecf0f1',
  },
  formWrapper: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#34495e',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  error: {
    backgroundColor: '#fee',
    color: '#c0392b',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  linkText: {
    textAlign: 'center',
    marginTop: '1rem',
    color: '#555',
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: '500',
  },
};

export default Register;
