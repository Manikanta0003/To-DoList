import React, { useEffect, useState } from 'react';
import { tasksAPI, projectsAPI } from './api';
import './Styles.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    priority: 'medium', 
    dueDate: '',
    projectId: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tasksData, projectsData] = await Promise.all([
        tasksAPI.getAll(),
        projectsAPI.getAll(),
      ]);
      setTasks(tasksData);
      setProjects(projectsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const newTask = await tasksAPI.create(formData.projectId, {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        dueDate: formData.dueDate,
      });
      setTasks([...tasks, newTask]);
      setFormData({ title: '', description: '', priority: 'medium', dueDate: '', projectId: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTaskStatus = async (id, status) => {
    try {
      const newStatus = status === 'todo' ? 'in-progress' : status === 'in-progress' ? 'completed' : 'todo';
      const updatedTask = await tasksAPI.update(id, { status: newStatus });
      setTasks(tasks.map(t => t._id === id ? updatedTask : t));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await tasksAPI.delete(id);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const getPriorityColor = (priority) => {
    return priority === 'high' ? '#f56565' : priority === 'medium' ? '#ed8936' : '#48bb78';
  };

  const getStatusColor = (status) => {
    return status === 'completed' ? '#48bb78' : status === 'in-progress' ? '#4299e1' : '#cbd5e0';
  };

  if (loading) return <div className="loading-container"><p>Loading tasks...</p></div>;

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="tasks-container">
      <h1 className="page-title">Tasks</h1>
      
      <button 
        className="btn-primary" 
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : '+ Create Task'}
      </button>

      {showForm && (
        <form onSubmit={handleCreateTask} className="form-card">
          <div className="form-group">
            <label>Task Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              placeholder="Enter task title"
            />
          </div>
          <div className="form-group">
            <label>Project</label>
            <select
              value={formData.projectId}
              onChange={(e) => setFormData({...formData, projectId: e.target.value})}
              required
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project._id} value={project._id}>{project.name}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Enter task description"
              rows="3"
            />
          </div>
          <button type="submit" className="btn-primary">Create Task</button>
        </form>
      )}

      <div className="tasks-board">
        <div className="task-column">
          <h2>To Do ({todoTasks.length})</h2>
          {todoTasks.map(task => (
            <div key={task._id} className="task-card">
              <div className="task-header">
                <h4>{task.title}</h4>
                <span className="priority-badge" style={{ backgroundColor: getPriorityColor(task.priority) }}>
                  {task.priority}
                </span>
              </div>
              <p className="task-description">{task.description}</p>
              {task.dueDate && (
                <p className="task-duedate">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              )}
              <div className="task-actions">
                <button 
                  className="btn-small"
                  onClick={() => handleUpdateTaskStatus(task._id, task.status)}
                >
                  Move
                </button>
                <button 
                  className="btn-delete-small"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="task-column">
          <h2>In Progress ({inProgressTasks.length})</h2>
          {inProgressTasks.map(task => (
            <div key={task._id} className="task-card in-progress">
              <div className="task-header">
                <h4>{task.title}</h4>
                <span className="priority-badge" style={{ backgroundColor: getPriorityColor(task.priority) }}>
                  {task.priority}
                </span>
              </div>
              <p className="task-description">{task.description}</p>
              {task.dueDate && (
                <p className="task-duedate">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              )}
              <div className="task-actions">
                <button 
                  className="btn-small"
                  onClick={() => handleUpdateTaskStatus(task._id, task.status)}
                >
                  Move
                </button>
                <button 
                  className="btn-delete-small"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="task-column">
          <h2>Completed ({completedTasks.length})</h2>
          {completedTasks.map(task => (
            <div key={task._id} className="task-card completed">
              <div className="task-header">
                <h4>{task.title}</h4>
                <span className="priority-badge" style={{ backgroundColor: getPriorityColor(task.priority) }}>
                  {task.priority}
                </span>
              </div>
              <p className="task-description">{task.description}</p>
              {task.dueDate && (
                <p className="task-duedate">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              )}
              <div className="task-actions">
                <button 
                  className="btn-small"
                  onClick={() => handleUpdateTaskStatus(task._id, task.status)}
                >
                  Move
                </button>
                <button 
                  className="btn-delete-small"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
