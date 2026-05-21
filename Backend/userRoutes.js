import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  getMe,
} from './usercontroller.js';
import { protect } from './authMiddleware.js';

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;