import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    getLists,
    createList,
    getListById,
    updateList,
    deleteList,
    addStatusCode,
    removeStatusCode,
} from '../controllers/listController.js';

const router = express.Router();

// @desc    Get all lists for a user
// @route   GET /api/lists
// @access  Private
router.get('/', protect, getLists);

// @desc    Create a new list
// @route   POST /api/lists
// @access  Private
router.post('/', protect, createList);

// @desc    Get list by ID
// @route   GET /api/lists/:id
// @access  Private
router.get('/:id', protect, getListById);

// @desc    Update a list
// @route   PUT /api/lists/:id
// @access  Private
router.put('/:id', protect, updateList);

// @desc    Delete a list
// @route   DELETE /api/lists/:id
// @access  Private
router.delete('/:id', protect, deleteList);

// @desc    Add status code to list
// @route   POST /api/lists/:id/status
// @access  Private
router.post('/:id/status', protect, addStatusCode);

// @desc    Remove status code from list
// @route   DELETE /api/lists/:id/status/:code
// @access  Private
router.delete('/:id/status/:code', protect, removeStatusCode);

export default router;
