import express from 'express';
const router = express.Router();
import { protect } from './authMiddleware.js';
import {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
  addTeamMember,
  removeTeamMember,
} from './teamController.js';

router.post('/', protect, createTeam);
router.get('/', protect, getTeams);
router.get('/:id', protect, getTeam);
router.put('/:id', protect, updateTeam);
router.delete('/:id', protect, deleteTeam);
router.post('/:id/members', protect, addTeamMember);
router.delete('/:id/members', protect, removeTeamMember);

export default router;
