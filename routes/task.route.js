const express = require('express');
const { createNewTask, updateTask, deleteTask, getAllTasks } = require('../controllers/task.controller');

const router = express.Router();

// Create a new task
router.post('/', createNewTask);

// Get all tasks
router.get('/', getAllTasks);

// Update a task
router.put('/:taskId', updateTask);

// Delete a task
router.delete('/:taskId', deleteTask);

module.exports = router;
