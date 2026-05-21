import React, { useEffect, useState } from 'react';
import { authAPI, teamsAPI } from './api';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    teams: 0,
    projects: 0,
    tasks: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authAPI.me();
        setUser(userData);
        
        const teamsData = await teamsAPI.getAll();
        setStats(prev => ({
          ...prev,
          teams: teamsData.length,
        }));
      } catch (error) {
        console.error('Failed to fetch data', error);
        authAPI.logout();
        navigate('/login');
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    authAPI.logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back to your account</p>
        </div>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>

      <nav className="dashboard-nav">
        <Link to="/" className="nav-link active">Dashboard</Link>
        <Link to="/teams" className="nav-link">Teams</Link>
        <Link to="/projects" className="nav-link">Projects</Link>
        <Link to="/tasks" className="nav-link">Tasks</Link>
      </nav>
      
      {user ? (
        <div className="dashboard-content">
          <div className="user-card">
            <div className="card-header">
              <h2 className="card-title">User Profile</h2>
              <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
            </div>
            <div className="card-body">
              <div className="info-row">
                <span className="info-label">Name</span>
                <span className="info-value">{user.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">User ID</span>
                <span className="info-value user-id">{user._id}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Account Status</span>
                <span className="info-value status-badge">Active</span>
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <Link to="/teams" className="stat-card">
              <div className="stat-number">{stats.teams}</div>
              <div className="stat-label">Teams</div>
            </Link>
            <Link to="/projects" className="stat-card">
              <div className="stat-number">-</div>
              <div className="stat-label">Projects</div>
            </Link>
            <Link to="/tasks" className="stat-card">
              <div className="stat-number">-</div>
              <div className="stat-label">Tasks</div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="loading-container">
          <p className="loading-text">Loading user details...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;