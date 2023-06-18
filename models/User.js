const mongoose = require("mongoose");

/**
 * Schema for a user in the database.
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: true,
    },
});

/**
 * The User model.
 * @type {mongoose.Model<User>}
 */
const User = mongoose.model("User", userSchema);

// Export the model as a module
module.exports = User;
