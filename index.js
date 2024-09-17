//import all required modules
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

//add routes
const routes = require('./routes');

const { connectDB } = require('./utils/dbConnection');
const { CONFIG } = require('./utils/config');
const { mainMiddleware } = require('./middleware/main.middleware');
const { errorHandler } = require('./utils/errorHandler');
const { apiLimiter } = require('./utils/rateLimiter');



//initialize app
const app = express();



//add environment variables
const port = CONFIG.PORT;
const base_url = CONFIG.BASE_URL;

//connect with the database
connectDB();

//add middlewares in the app
mainMiddleware(app);

//add rate limiter to avoid so many request at same time or improve server security
app.use(apiLimiter);

//api routes
app.use('/api/v1', routes);

//handling all error happen in server
app.use(errorHandler)

//run application
app.listen(port, () => {
    console.log(`server is running on ${base_url}:${port}`);
})


//this is a simple comment


module.exports = app;