// controllers/projectController.js
const { z } = require('zod');
const { Project } = require('../models/project.model');
const { Task } = require('../models/task.model');
const { zodProjectSchema } = require('../utils/zodValidations');

// Create a new project
const createNewProject = async (req, res) => {
  try {
    const { name, description } = zodProjectSchema.parse(req.body);
    const project = new Project({ name, description, owner: req.user.id });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all projects for the authenticated user
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get project details including tasks for the authenticated user
const getProjectDetails = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.projectId, owner: req.user.id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const tasks = await Task.find({ project: project._id });
    res.status(200).json({ project, tasks });
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const { name, description } = zodProjectSchema.parse(req.body);
    const project = await Project.findOneAndUpdate(
      { _id: req.params.projectId, owner: req.user.id },
      { name, description },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors.map(e => e.message) });
    }

    console.error('Error updating project:', error);

    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.projectId, owner: req.user.id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    await Task.deleteMany({ project: project._id });
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createNewProject, getAllProjects, getProjectDetails, deleteProject, updateProject };
