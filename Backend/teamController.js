import Team from './teamModel.js';

// Create Team
export const createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;
    const team = await Team.create({
      name,
      description,
      owner: req.user.id,
      members: [req.user.id],
    });
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Teams for User
export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find({
      $or: [{ owner: req.user.id }, { members: req.user.id }],
    }).populate('owner members');
    res.json(teams);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Single Team
export const getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('owner members');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Team
export const updateTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    if (team.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const updated = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Team
export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    if (team.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add Member to Team
export const addTeamMember = async (req, res) => {
  try {
    const { memberId } = req.body;
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    if (team.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    if (!team.members.includes(memberId)) {
      team.members.push(memberId);
      await team.save();
    }
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove Member from Team
export const removeTeamMember = async (req, res) => {
  try {
    const { memberId } = req.body;
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    if (team.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    team.members = team.members.filter(id => id.toString() !== memberId);
    await team.save();
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
