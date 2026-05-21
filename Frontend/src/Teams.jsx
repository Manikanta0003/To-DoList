import React, { useEffect, useState } from 'react';
import { teamsAPI } from './api';
import './Styles.css';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const data = await teamsAPI.getAll();
      setTeams(data);
    } catch (error) {
      console.error('Failed to fetch teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const newTeam = await teamsAPI.create(formData);
      setTeams([...teams, newTeam]);
      setFormData({ name: '', description: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create team:', error);
    }
  };

  const handleDeleteTeam = async (id) => {
    try {
      await teamsAPI.delete(id);
      setTeams(teams.filter(t => t._id !== id));
    } catch (error) {
      console.error('Failed to delete team:', error);
    }
  };

  if (loading) return <div className="loading-container"><p>Loading teams...</p></div>;

  return (
    <div className="teams-container">
      <h1 className="page-title">Teams</h1>
      
      <button 
        className="btn-primary" 
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : '+ Create Team'}
      </button>

      {showForm && (
        <form onSubmit={handleCreateTeam} className="form-card">
          <div className="form-group">
            <label>Team Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              placeholder="Enter team name"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Enter team description"
              rows="3"
            />
          </div>
          <button type="submit" className="btn-primary">Create Team</button>
        </form>
      )}

      <div className="teams-grid">
        {teams.map(team => (
          <div key={team._id} className="team-card">
            <h3>{team.name}</h3>
            <p>{team.description}</p>
            <div className="team-info">
              <span className="team-members">Members: {team.members.length}</span>
            </div>
            <button 
              className="btn-delete"
              onClick={() => handleDeleteTeam(team._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
