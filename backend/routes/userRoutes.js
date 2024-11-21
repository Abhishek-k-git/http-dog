import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
} from '../controllers/userController.js';

const router = express.Router();

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
router.post('/register', registerUser);

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', loginUser);

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, updateUserProfile);

export default router;
