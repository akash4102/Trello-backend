//import modules
const express = require('express');

//import controllers
const { register, login, verify } = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();


// Registration api
router.post('/register',register);

// Login api
router.post('/login', login);
//verify user api
router.get('/verify',authenticate,verify);

module.exports = router;
