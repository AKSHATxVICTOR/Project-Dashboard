import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getCurrentUser,
} from '../services/api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }
    fetchProjects();
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
      setError('');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to fetch projects.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const newProject = await createProject(formData);
      setProjects([newProject, ...projects]);
      setFormData({ title: '', description: '', status: 'pending' });
      setShowForm(false);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to create project.'
      );
    }
  };

  const handleUpdate = async (id, updateData) => {
    try {
      const updated = await updateProject(id, updateData);
      setProjects(projects.map((p) => (p._id === id ? updated : p)));
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to update project.'
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to delete project.'
      );
    }
  };

  const getProjectStats = () => {
    return {
      total: projects.length,
      pending: projects.filter((p) => p.status === 'pending').length,
      inProgress: projects.filter((p) => p.status === 'in-progress').length,
      completed: projects.filter((p) => p.status === 'completed').length,
    };
  };

  const stats = getProjectStats();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Projects</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={styles.addButton}
        >
          {showForm ? 'Cancel' : '+ New Project'}
        </button>
      </div>

      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>{stats.total}</h3>
          <p style={styles.statLabel}>Total</p>
        </div>
        <div style={{ ...styles.statCard, borderTop: '4px solid #f39c12' }}>
          <h3 style={styles.statNumber}>{stats.pending}</h3>
          <p style={styles.statLabel}>Pending</p>
        </div>
        <div style={{ ...styles.statCard, borderTop: '4px solid #3498db' }}>
          <h3 style={styles.statNumber}>{stats.inProgress}</h3>
          <p style={styles.statLabel}>In Progress</p>
        </div>
        <div style={{ ...styles.statCard, borderTop: '4px solid #27ae60' }}>
          <h3 style={styles.statNumber}>{stats.completed}</h3>
          <p style={styles.statLabel}>Completed</p>
        </div>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {showForm && (
        <div style={styles.formCard}>
          <h3 style={styles.formTitle}>Create New Project</h3>
          <form onSubmit={handleCreate}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Title</label>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder='Enter project title'
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                required
                style={styles.textarea}
                placeholder='Enter project description'
                rows='4'
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Status</label>
              <select
                name='status'
                value={formData.status}
                onChange={handleChange}
                style={styles.select}
              >
                <option value='pending'>Pending</option>
                <option value='in-progress'>In Progress</option>
                <option value='completed'>Completed</option>
              </select>
            </div>
            <button type='submit' style={styles.submitButton}>
              Create Project
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div style={styles.loading}>Loading projects...</div>
      ) : projects.length === 0 ? (
        <div style={styles.empty}>
          <p>No projects yet. Create your first project!</p>
        </div>
      ) : (
        <div style={styles.projectsList}>
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    color: '#2c3e50',
    margin: 0,
  },
  addButton: {
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  statCard: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    borderTop: '4px solid #2c3e50',
  },
  statNumber: {
    fontSize: '2rem',
    margin: '0 0 0.25rem 0',
    color: '#2c3e50',
  },
  statLabel: {
    margin: 0,
    color: '#7f8c8d',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
  },
  formCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  },
  formTitle: {
    color: '#2c3e50',
    marginTop: 0,
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
  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  select: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    color: '#7f8c8d',
    fontSize: '1.1rem',
  },
  empty: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    color: '#7f8c8d',
  },
  projectsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem',
  },
  error: {
    backgroundColor: '#fee',
    color: '#c0392b',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
};

export default Dashboard;
