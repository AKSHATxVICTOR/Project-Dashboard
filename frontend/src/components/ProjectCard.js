import React, { useState } from 'react';

const ProjectCard = ({ project, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: project.title,
    description: project.description,
    status: project.status,
  });

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onUpdate(project._id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: project.title,
      description: project.description,
      status: project.status,
    });
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#f39c12';
      case 'in-progress':
        return '#3498db';
      case 'completed':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  if (isEditing) {
    return (
      <div style={styles.card}>
        <input
          type='text'
          name='title'
          value={editData.title}
          onChange={handleChange}
          style={styles.input}
          placeholder='Title'
        />
        <textarea
          name='description'
          value={editData.description}
          onChange={handleChange}
          style={styles.textarea}
          placeholder='Description'
          rows='3'
        />
        <select
          name='status'
          value={editData.status}
          onChange={handleChange}
          style={styles.select}
        >
          <option value='pending'>Pending</option>
          <option value='in-progress'>In Progress</option>
          <option value='completed'>Completed</option>
        </select>
        <div style={styles.buttonGroup}>
          <button onClick={handleUpdate} style={styles.saveBtn}>
            Save
          </button>
          <button onClick={handleCancel} style={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{project.title}</h3>
        <span
          style={{
            ...styles.status,
            backgroundColor: getStatusColor(project.status),
          }}
        >
          {project.status}
        </span>
      </div>
      <p style={styles.description}>{project.description}</p>
      <p style={styles.date}>
        Created: {new Date(project.createdAt).toLocaleDateString()}
      </p>
      <div style={styles.buttonGroup}>
        <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
          Edit
        </button>
        <button onClick={() => onDelete(project._id)} style={styles.deleteBtn}>
          Delete
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  title: {
    margin: 0,
    color: '#2c3e50',
    fontSize: '1.25rem',
  },
  status: {
    color: '#fff',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  description: {
    color: '#555',
    lineHeight: '1.5',
    marginBottom: '0.5rem',
  },
  date: {
    color: '#888',
    fontSize: '0.85rem',
    marginBottom: '1rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  select: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  editBtn: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  saveBtn: {
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  cancelBtn: {
    backgroundColor: '#95a5a6',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};

export default ProjectCard;
