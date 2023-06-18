const User = require("../models/User.js");

/**
 * Create a new user
 */
const createUser = async (req, res) => {
    // Extract name, email, and role from the request body
    const { name, email, role } = req.body;

    try {
        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            // If the user already exists, return a 400 error response
            return res.status(400).json({
                error: "User already exists",
            });
        }

        // Create a new user with the provided details
        const newUser = new User({ name, email, role });

        // Save the new user to the database
        newUser.save();

        // Return a success response
        return res.status(200).json({
            success: true,
            message: "User created successfully",
        });
    } catch (err) {
        // If an error occurs, log it and return a 500 error response
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Export the function as a module
module.exports = {
    createUser,
};
