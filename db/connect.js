const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

/**
 * Connects to the MongoDB database.
 */
const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

// Export the function as a module
module.exports = connectDB;
