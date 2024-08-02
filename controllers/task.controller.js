const { Task } = require("../models/task.model");
const { zodTaskSchema } = require("../utils/zodValidations");

// Create a new task
const createNewTask =  async (req, res) => {
  try {
    const taskData = zodTaskSchema.parse(req.body);
    const task = new Task(taskData);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all tasks
const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find().populate('project');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a task
const updateTask =  async (req, res) => {
  try {
    const taskData = zodTaskSchema.partial().parse(req.body); 
    const task = await Task.findByIdAndUpdate(req.params.taskId, taskData, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
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
const deleteTask =  async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {createNewTask, getAllTask, updateTask, deleteTask};
