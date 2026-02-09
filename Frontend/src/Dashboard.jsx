import React from 'react';
import { 
  BarChart3, 
  Calendar, 
  CheckSquare, 
  Clock, 
  Home, 
  LayoutGrid, 
  LogOut, 
  Plus, 
  Search, 
  Settings, 
  TrendingUp, 
  Users, 
  AlertCircle, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

const Dashboard = ({ currentUser, onLogout }) => {
  // Mock data
  const projects = [
    { 
      id: 1, 
      name: 'Website Redesign', 
      status: 'on-track', 
      completion: 75, 
      team: 5, 
      deadline: '2026-03-15', 
      budget: 45000, 
      spent: 32000 
    },
    { 
      id: 2, 
      name: 'Mobile App Launch', 
      status: 'at-risk', 
      completion: 45, 
      team: 8, 
      deadline: '2026-02-28', 
      budget: 80000, 
      spent: 65000 
    },
    { 
      id: 3, 
      name: 'Marketing Campaign', 
      status: 'on-track', 
      completion: 90, 
      team: 4, 
      deadline: '2026-02-20', 
      budget: 25000, 
      spent: 22000 
    },
    { 
      id: 4, 
      name: 'API Integration', 
      status: 'delayed', 
      completion: 30, 
      team: 3, 
      deadline: '2026-03-01', 
      budget: 35000, 
      spent: 28000 
    },
  ];

  const myTasks = [
    { 
      id: 1, 
      title: 'Review design mockups', 
      project: 'Website Redesign', 
      priority: 'high', 
      due: '2026-02-10' 
    },
    { 
      id: 2, 
      title: 'Update API documentation', 
      project: 'API Integration', 
      priority: 'medium', 
      due: '2026-02-12' 
    },
    { 
      id: 3, 
      title: 'Prepare marketing materials', 
      project: 'Marketing Campaign', 
      priority: 'high', 
      due: '2026-02-11' 
    },
    { 
      id: 4, 
      title: 'Test mobile features', 
      project: 'Mobile App Launch', 
      priority: 'critical', 
      due: '2026-02-09' 
    },
    { 
      id: 5, 
      title: 'Schedule team meeting', 
      project: 'Website Redesign', 
      priority: 'low', 
      due: '2026-02-15' 
    },
  ];

  const recentActivity = [
    { 
      id: 1, 
      user: 'Sarah Chen', 
      action: 'completed task', 
      item: 'Homepage wireframe', 
      project: 'Website Redesign', 
      time: '2 hours ago' 
    },
    { 
      id: 2, 
      user: 'Mike Johnson', 
      action: 'commented on', 
      item: 'API endpoint specs', 
      project: 'API Integration', 
      time: '3 hours ago' 
    },
    { 
      id: 3, 
      user: 'Emma Davis', 
      action: 'uploaded file', 
      item: 'Campaign_Brief_v2.pdf', 
      project: 'Marketing Campaign', 
      time: '5 hours ago' 
    },
    { 
      id: 4, 
      user: 'Alex Kim', 
      action: 'updated status', 
      item: 'Mobile testing phase', 
      project: 'Mobile App Launch', 
      time: '1 day ago' 
    },
  ];

  const upcomingDeadlines = [
    { 
      id: 1, 
      task: 'Test mobile features', 
      project: 'Mobile App Launch', 
      date: '2026-02-09', 
      priority: 'critical' 
    },
    { 
      id: 2, 
      task: 'Review design mockups', 
      project: 'Website Redesign', 
      date: '2026-02-10', 
      priority: 'high' 
    },
    { 
      id: 3, 
      task: 'Prepare marketing materials', 
      project: 'Marketing Campaign', 
      date: '2026-02-11', 
      priority: 'high' 
    },
    { 
      id: 4, 
      task: 'Update API documentation', 
      project: 'API Integration', 
      date: '2026-02-12', 
      priority: 'medium' 
    },
  ];

  const teamWorkload = [
    { member: 'Sarah Chen', hours: 38, capacity: 40 },
    { member: 'Mike Johnson', hours: 42, capacity: 40 },
    { member: 'Emma Davis', hours: 35, capacity: 40 },
    { member: 'Alex Kim', hours: 40, capacity: 40 },
    { member: 'Chris Lee', hours: 28, capacity: 40 },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-track':
        return <CheckCircle className="status-icon status-success" />;
      case 'at-risk':
        return <AlertCircle className="status-icon status-warning" />;
      case 'delayed':
        return <XCircle className="status-icon status-danger" />;
      default:
        return null;
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'critical':
        return 'priority-critical';
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <LayoutGrid className="logo-icon" />
          <h2>ProjectManager</h2>
        </div>
        
        <nav className="sidebar-nav">
          <a href="#home" className="nav-item active">
            <Home size={20} />
            <span>Home</span>
          </a>
          <a href="#projects" className="nav-item">
            <LayoutGrid size={20} />
            <span>Projects</span>
          </a>
          <a href="#tasks" className="nav-item">
            <CheckSquare size={20} />
            <span>My Tasks</span>
          </a>
          <a href="#calendar" className="nav-item">
            <Calendar size={20} />
            <span>Calendar</span>
          </a>
          <a href="#team" className="nav-item">
            <Users size={20} />
            <span>Team</span>
          </a>
          <a href="#reports" className="nav-item">
            <BarChart3 size={20} />
            <span>Reports</span>
          </a>
        </nav>
        
        <div className="sidebar-footer">
          <a href="#settings" className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="top-header">
          <div className="header-left">
            <h1>Mission Control</h1>
            <p>Welcome back, {currentUser?.name}</p>
          </div>
          
          <div className="header-right">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search projects, tasks..." />
            </div>
            
            <button className="btn-icon">
              <Clock size={20} />
            </button>
            
            <div className="user-menu">
              <div className="user-avatar">
                {currentUser?.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button onClick={onLogout} className="btn-icon" title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard">
          {/* KPI Cards */}
          <div className="kpi-section">
            <div className="kpi-card">
              <div className="kpi-icon kpi-blue">
                <LayoutGrid size={24} />
              </div>
              <div className="kpi-content">
                <h3>Active Projects</h3>
                <p className="kpi-value">4</p>
                <span className="kpi-change positive">+2 this month</span>
              </div>
            </div>
            
            <div className="kpi-card">
              <div className="kpi-icon kpi-green">
                <CheckSquare size={24} />
              </div>
              <div className="kpi-content">
                <h3>Tasks Completed</h3>
                <p className="kpi-value">156</p>
                <span className="kpi-change positive">+12% vs last week</span>
              </div>
            </div>
            
            <div className="kpi-card">
              <div className="kpi-icon kpi-purple">
                <Users size={24} />
              </div>
              <div className="kpi-content">
                <h3>Team Members</h3>
                <p className="kpi-value">24</p>
                <span className="kpi-change neutral">Across all projects</span>
              </div>
            </div>
            
            <div className="kpi-card">
              <div className="kpi-icon kpi-orange">
                <TrendingUp size={24} />
              </div>
              <div className="kpi-content">
                <h3>Overall Health</h3>
                <p className="kpi-value">85%</p>
                <span className="kpi-change positive">+5% improvement</span>
              </div>
            </div>
          </div>

          {/* Project Overview */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Project Portfolio</h2>
              <button className="btn-secondary">
                <Plus size={18} />
                New Project
              </button>
            </div>
            
            <div className="projects-grid">
              {projects.map(project => (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <div>
                      <h3>{project.name}</h3>
                      <div className="project-meta">
                        {getStatusIcon(project.status)}
                        <span className={`status-text status-${project.status}`}>
                          {project.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Progress</span>
                      <span className="progress-value">{project.completion}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${project.completion}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="project-stats">
                    <div className="stat">
                      <Users size={16} />
                      <span>{project.team} members</span>
                    </div>
                    <div className="stat">
                      <Calendar size={16} />
                      <span>Due {new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="budget-section">
                    <div className="budget-bar">
                      <div 
                        className="budget-fill" 
                        style={{ width: `${(project.spent / project.budget) * 100}%` }}
                      ></div>
                    </div>
                    <div className="budget-text">
                      ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Two Column Section */}
          <div className="two-column-section">
            {/* My Tasks */}
            <section className="dashboard-section">
              <div className="section-header">
                <h2>My Tasks</h2>
                <button className="btn-text">View All</button>
              </div>
              
              <div className="tasks-list">
                {myTasks.map(task => (
                  <div key={task.id} className="task-item">
                    <input type="checkbox" className="task-checkbox" />
                    <div className="task-content">
                      <h4>{task.title}</h4>
                      <div className="task-meta">
                        <span className="task-project">{task.project}</span>
                        <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <div className="task-due">
                      <Calendar size={14} />
                      <span>{new Date(task.due).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section className="dashboard-section">
              <div className="section-header">
                <h2>Recent Activity</h2>
                <button className="btn-text">View All</button>
              </div>
              
              <div className="activity-feed">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-avatar">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="activity-content">
                      <p>
                        <strong>{activity.user}</strong> {activity.action}{' '}
                        <em>{activity.item}</em>
                      </p>
                      <div className="activity-meta">
                        <span className="activity-project">{activity.project}</span>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Two Column Section 2 */}
          <div className="two-column-section">
            {/* Upcoming Deadlines */}
            <section className="dashboard-section">
              <div className="section-header">
                <h2>Upcoming Deadlines</h2>
                <button className="btn-text">Calendar View</button>
              </div>
              
              <div className="deadlines-list">
                {upcomingDeadlines.map(deadline => (
                  <div key={deadline.id} className="deadline-item">
                    <div className="deadline-date">
                      <span className="date-day">
                        {new Date(deadline.date).getDate()}
                      </span>
                      <span className="date-month">
                        {new Date(deadline.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                    </div>
                    <div className="deadline-content">
                      <h4>{deadline.task}</h4>
                      <p>{deadline.project}</p>
                    </div>
                    <span className={`deadline-priority ${getPriorityClass(deadline.priority)}`}>
                      {deadline.priority}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Team Workload */}
            <section className="dashboard-section">
              <div className="section-header">
                <h2>Team Workload</h2>
                <button className="btn-text">Manage Resources</button>
              </div>
              
              <div className="workload-list">
                {teamWorkload.map((member, index) => (
                  <div key={index} className="workload-item">
                    <div className="workload-header">
                      <div className="member-info">
                        <div className="member-avatar">
                          {member.member.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span>{member.member}</span>
                      </div>
                      <span className="workload-hours">
                        {member.hours}h / {member.capacity}h
                      </span>
                    </div>
                    <div className="workload-bar">
                      <div 
                        className={`workload-fill ${member.hours > member.capacity ? 'overloaded' : ''}`}
                        style={{ width: `${Math.min((member.hours / member.capacity) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;