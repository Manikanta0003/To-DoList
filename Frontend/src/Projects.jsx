import React, { useEffect, useState } from 'react';
import { projectsAPI, teamsAPI } from './api';
import './Styles.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', dueDate: '', teamId: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsData, teamsData] = await Promise.all([
        projectsAPI.getAll(),
        teamsAPI.getAll(),
      ]);
      setProjects(projectsData);
      setTeams(teamsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const newProject = await projectsAPI.create(formData.teamId, {
        name: formData.name,
        description: formData.description,
        dueDate: formData.dueDate,
      });
      setProjects([...projects, newProject]);
      setFormData({ name: '', description: '', dueDate: '', teamId: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await projectsAPI.delete(id);
      setProjects(projects.filter(p => p._id !== id));
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const getStatusColor = (status) => {
    return status === 'completed' ? '#48bb78' : status === 'archived' ? '#a0aec0' : '#667eea';
  };

  if (loading) return <div className="loading-container"><p>Loading projects...</p></div>;

  return (
    <div className="projects-container">
      <h1 className="page-title">Projects</h1>
      
      <button 
        className="btn-primary" 
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : '+ Create Project'}
      </button>

      {showForm && (
        <form onSubmit={handleCreateProject} className="form-card">
          <div className="form-group">
            <label>Project Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              placeholder="Enter project name"
            />
          </div>
          <div className="form-group">
            <label>Team</label>
            <select
              value={formData.teamId}
              onChange={(e) => setFormData({...formData, teamId: e.target.value})}
              required
            >
              <option value="">Select a team</option>
              {teams.map(team => (
                <option key={team._id} value={team._id}>{team.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Enter project description"
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
            />
          </div>
          <button type="submit" className="btn-primary">Create Project</button>
        </form>
      )}

      <div className="projects-grid">
        {projects.map(project => (
          <div key={project._id} className="project-card">
            <div className="project-header">
              <h3>{project.name}</h3>
              <span 
                className="status-badge" 
                style={{ backgroundColor: getStatusColor(project.status) }}
              >
                {project.status}
              </span>
            </div>
            <p className="project-description">{project.description}</p>
            {project.dueDate && (
              <p className="project-duedate">Due: {new Date(project.dueDate).toLocaleDateString()}</p>
            )}
            <button 
              className="btn-delete"
              onClick={() => handleDeleteProject(project._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
