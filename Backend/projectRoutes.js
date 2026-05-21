import express from 'express';
const router = express.Router();
import { protect } from './authMiddleware.js';
import {
  createProject,
  getTeamProjects,
  getUserProjects,
  getProject,
  updateProject,
  deleteProject,
} from './projectController.js';

// Debug: Log all project requests
router.use((req, res, next) => {
  console.log(`📦 PROJECT ROUTE: ${req.method} ${req.path}`);
  next();
});

// IMPORTANT: Specific routes MUST come before parameterized routes
// /user/all must be matched BEFORE /:id
router.get('/user/all', protect, getUserProjects);
router.post('/team/:teamId', protect, createProject);
router.get('/team/:teamId', protect, getTeamProjects);
router.get('/:id', protect, getProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
