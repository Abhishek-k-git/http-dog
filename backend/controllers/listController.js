import asyncHandler from 'express-async-handler';
import listService from '../services/listService.js';

// @desc    Get all lists for a user
// @route   GET /api/lists
// @access  Private
const getLists = asyncHandler(async (req, res) => {
    const lists = await listService.getLists(req.user._id);
    res.json(lists);
});

// @desc    Create a new list
// @route   POST /api/lists
// @access  Private
const createList = asyncHandler(async (req, res) => {
    const list = await listService.createList(req.user._id, req.body);
    res.status(201).json(list);
});

// @desc    Get list by ID
// @route   GET /api/lists/:id
// @access  Private
const getListById = asyncHandler(async (req, res) => {
    const list = await listService.getListById(req.params.id, req.user._id);
    res.json(list);
});

// @desc    Update a list
// @route   PUT /api/lists/:id
// @access  Private
const updateList = asyncHandler(async (req, res) => {
    const list = await listService.updateList(req.params.id, req.user._id, req.body);
    res.json(list);
});

// @desc    Delete a list
// @route   DELETE /api/lists/:id
// @access  Private
const deleteList = asyncHandler(async (req, res) => {
    const result = await listService.deleteList(req.params.id, req.user._id);
    res.json(result);
});

// @desc    Add status code to list
// @route   POST /api/lists/:id/status
// @access  Private
const addStatusCode = asyncHandler(async (req, res) => {
    const { statusCode } = req.body;
    const list = await listService.addStatusCode(req.params.id, req.user._id, statusCode);
    res.json(list);
});

// @desc    Remove status code from list
// @route   DELETE /api/lists/:id/status/:code
// @access  Private
const removeStatusCode = asyncHandler(async (req, res) => {
    const list = await listService.removeStatusCode(
        req.params.id,
        req.user._id,
        req.params.code
    );
    res.json(list);
});

export {
    getLists,
    createList,
    getListById,
    updateList,
    deleteList,
    addStatusCode,
    removeStatusCode,
};
