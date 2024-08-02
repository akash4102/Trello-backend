const express = require('express');
const { createNewTask, getAllTask, updateTask, deleteTask } = require('../controllers/task.controller');

const router = express.Router();

// Create a new task
router.post('/', createNewTask);

// Get all tasks
router.get('/', getAllTask);

// Update a task
router.put('/:taskId', updateTask);

// Delete a task
router.delete('/:taskId', deleteTask);

module.exports = router;
