import express from 'express';
const router = express.Router();
import { protect } from './authMiddleware.js';
import {
  createTask,
  getProjectTasks,
  getUserTasks,
  getTask,
  updateTask,
  deleteTask,
} from './taskController.js';

// Debug: Log all task requests
router.use((req, res, next) => {
  console.log(`📋 TASK ROUTE: ${req.method} ${req.path}`);
  next();
});

// IMPORTANT: Specific routes MUST come before parameterized routes
// /user/all must be matched BEFORE /:id
router.get('/user/all', protect, getUserTasks);
router.post('/project/:projectId', protect, createTask);
router.get('/project/:projectId', protect, getProjectTasks);
router.get('/:id', protect, getTask);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

export default router;
