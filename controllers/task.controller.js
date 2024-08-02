const { Task } = require('../models/task.model');
const { Project } = require('../models/project.model');
const { zodTaskSchema } = require('../utils/zodValidations');
const { z } = require('zod');

// Create a new task
const createNewTask = async (req, res) => {
  try {
    const taskData = zodTaskSchema.parse(req.body);

    const project = await Project.findOne({ _id: taskData.project, owner: req.user.id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found or access denied' });
    }

    const task = new Task({ ...taskData, owner: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all tasks for the authenticated user's projects
const getAllTasks = async (req, res) => {
  try {
    const userProjects = await Project.find({ owner: req.user.id }).select('_id');
    const projectIds = userProjects.map((project) => project._id);

    const tasks = await Task.find({ project: { $in: projectIds }, owner: req.user.id }).populate('project');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const taskData = zodTaskSchema.partial().parse(req.body);

    const task = await Task.findOneAndUpdate(
      { _id: req.params.taskId, owner: req.user.id },
      taskData,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found or access denied' });
    }

    res.status(200).json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      owner: req.user.id,
    });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or access denied' });
    }
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createNewTask, getAllTasks, updateTask, deleteTask };
