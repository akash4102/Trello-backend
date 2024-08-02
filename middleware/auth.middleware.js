// Import required modules
const jwt = require('jsonwebtoken');
const { CONFIG } = require('../utils/config');
const { User } = require('../models/user.model');

// Add jwt secret
const jwtSecret = CONFIG.JWT_SECRET;

const authenticate = async (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];

    // Check the Authorization header
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, jwtSecret);

        // Fetch the user from the database using the user ID from the token
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = {
            id: user._id,
            name: user.name,
            email: user.email,
        };

        // Continue to the next middleware
        next();
    } catch (err) {
        console.error(err);
        res.status(403).json({ message: 'Token is not valid or user fetch failed' });
    }
};

module.exports = { authenticate };
