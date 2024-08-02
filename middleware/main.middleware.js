//import all the modules
const express = require('express');
const cors = require('cors');
const { CONFIG } = require('../utils/config');


const mainMiddleware = (app) => {
    //add all the necessary middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        origin: CONFIG.ALLOWED_ORIGINS?.split(',').map(origin => origin.trim()) || [],  // Set to the exact origin of the client
        credentials: true,                // Allows cookies and credentials to be sent
        methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
}

module.exports = { mainMiddleware };
