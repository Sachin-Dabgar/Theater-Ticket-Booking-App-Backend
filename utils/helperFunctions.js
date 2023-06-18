const Show = require("../models/Show.js");

// method to find the current show based on the showId provided
const findCurrentShow = async (showId) => {
    return await Show.findOne({ _id: showId });
};

// method to find all the show present in the database
const findAllShows = async () => {
    return await Show.find();
};

// method to find the availabe seats for the currentShow show based on the showId and seatNumber provided
const findAvailableSeats = async (showId) => {
    const currentShow = await findCurrentShow(showId);
    const currentShowAlreadyBookedSeats = currentShow.alreadyBookedSeats;
    const totalSeats = [...Array(currentShow.totalSeats).keys()].map(
        (_, index) => index + 1
    );
    const availableSeats = totalSeats.filter(
        (seat) => !currentShowAlreadyBookedSeats.includes(seat)
    );
    return { currentShow, availableSeats };
};

module.exports = { findAvailableSeats, findAllShows, findCurrentShow };
