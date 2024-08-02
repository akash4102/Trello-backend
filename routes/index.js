const { Router } = require('express');

// Import other routes
const authRoutes = require('./auth.route');
const taskRoutes = require('./task.route');
const projectRoutes = require('./project.route');
const { authenticate } = require('../middleware/auth.middleware');

const router = Router();

// Check if the server is running
router.get('/', (req, res) => {
    res.status(200).send('server is running');
});

// Use authentication routes
router.use('/auth', authRoutes);

// Add authentication middleware for all routes below this line
router.use(authenticate);

// Use other routes for main logic
router.use('/project', projectRoutes);
router.use('/task', taskRoutes);

module.exports = router;
