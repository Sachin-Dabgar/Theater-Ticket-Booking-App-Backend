const Show = require("../models/Show.js");

/**
 * Get all shows
 */
const getAllShows = async (req, res) => {
    try {
        // Retrieve all shows from the database
        const shows = await Show.find();
        return res.json(shows);
    } catch (err) {
        // If an error occurs, log it and return a 500 error response
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
};

/**
 * Create a new show
 */
const createShow = async (req, res) => {
    // Extract name, screen, totalSeats, showTime, and userId from the request body
    const { name, screen, totalSeats, showTime, userId } = req.body;

    if (!name || !screen || !totalSeats || !showTime || !userId) {
        return res.status(404).json({
            success: false,
            message:
                "Provide proper name, screen, totalSeats, showTime, and userId",
        });
    }

    try {
        // Check if the show already exists
        const show = await Show.findOne({ screen });
        if (show) {
            // If the show already exists, return a 400 error response
            const shows = await Show.find();
            const screens = shows.map((singleShow) => singleShow.screen);
            return res.status(400).json({
                error: "screen already exists",
                message:
                    "We already have this screens assigned, try other screen.",
                data: screens,
            });
        }

        // Create a new show with the provided details
        const newShow = new Show({
            name,
            screen,
            totalSeats,
            showTime,
            userId,
        });

        // Save the new show to the database
        await newShow.save();

        // Return a success response
        return res.status(200).json({
            message: "Show created successfully",
        });
    } catch (err) {
        // If an error occurs, log it and return a 500 error response
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

// Export the functions as modules
module.exports = {
    getAllShows,
    createShow,
};
