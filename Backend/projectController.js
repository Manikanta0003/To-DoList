import Project from './projectModel.js';
import Team from './teamModel.js';

// Create Project
export const createProject = async (req, res) => {
  try {
    const { name, description, dueDate } = req.body;
    const { teamId } = req.params;
    
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    
    const project = await Project.create({
      name,
      description,
      dueDate,
      team: teamId,
      owner: req.user.id,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Projects in Team
export const getTeamProjects = async (req, res) => {
  try {
    const { teamId } = req.params;
    const projects = await Project.find({ team: teamId }).populate('owner');
    res.json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Projects for User
export const getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).populate('team owner');
    res.json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Single Project
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('team owner');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
