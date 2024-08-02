const express = require('express');
const { createNewProject, getAllProjects, getProjectDetails, updateProject, deleteProject } = require('../controllers/project.controller');

const router = express.Router();

// Create a new project
router.post('/',createNewProject);

// get all projects
router.get('/',getAllProjects);

// get project details including tasks
router.get('/:projectId', getProjectDetails);

// Update a project
router.put('/:projectId', updateProject);

// Delete a project
router.delete('/:projectId',deleteProject);

module.exports = router;
