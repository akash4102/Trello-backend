const mongoose = require("mongoose");
const { CONFIG } = require("./config");

const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(CONFIG.MONGODB_URL);
        console.log(`Connected to MongoDB as ${connection.host}`);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { connectDB };
