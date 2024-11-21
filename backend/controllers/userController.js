import asyncHandler from 'express-async-handler';
import userService from '../services/userService.js';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await userService.registerUser(name, email, password);
    res.status(201).json(user);
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    res.json(user);
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await userService.getUserProfile(req.user._id);
    res.json(user);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await userService.updateUserProfile(req.user._id, req.body);
    res.json(user);
});

export {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
};
