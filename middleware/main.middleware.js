//import all the modules
const express = require('express');
const cors = require('cors');
const { CONFIG } = require('../utils/config');


const mainMiddleware = (app) => {
    //add all the necessary middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
        cors({
            origin: CONFIG.ALLOWED_ORIGINS?.split(',').map(origin => origin.trim()) || [],
            methods: ["POST", "GET", "PUT", "DELETE"],
        })
    );
}

module.exports = { mainMiddleware };
