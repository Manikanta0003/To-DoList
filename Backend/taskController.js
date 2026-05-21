import Task from './taskModel.js';
import Project from './projectModel.js';

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const { projectId } = req.params;
    
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      project: projectId,
      assignee: req.user.id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Tasks in Project
export const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ project: projectId }).populate('assignee');
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Tasks for User
export const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignee: req.user.id }).populate('project assignee');
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Single Task
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project assignee');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
