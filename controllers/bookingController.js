// importing the models for the booking and show
const Booking = require("../models/Booking.js");
const Show = require("../models/Show.js");
const {
    findAvailableSeats,
    findAllShows,
} = require("../utils/helperFunctions.js");

/**
 * Create a booking for a show
 */
const createBooking = async (req, res) => {
    // Extract showId, seatNumber, and userId from the request body
    const { showId, seatNumber, userId } = req.body;

    if (!showId || !seatNumber || !userId) {
        return res.status(400).json({
            success: false,
            error: "Incomplete request body",
            message: "Please pass valid showId, seatNumber and userId",
        });
    }

    try {
        // check if the show exists
        const show = await Show.findById(showId);
        if (!show) {
            // If the show doesn't exist, return a 404 error response
            return res.status(404).json({
                error: "Show not found",
            });
        }

        // check if the seats for the show is full
        if (show.alreadyBookedSeats.length === show.totalSeats) {
            // Get all shows from the database
            const allShows = await findAllShows();
            const availableShows = [];

            // Iterate through all shows to find available shows with seats
            allShows.forEach((singleShow) => {
                if (
                    singleShow.alreadyBookedSeats.length !==
                    singleShow.totalSeats
                ) {
                    // Construct an object with the name of the available show and the total number of available seats
                    const totalSeatsAvailableForTheShow =
                        singleShow.totalSeats -
                        singleShow.alreadyBookedSeats.length;
                    const currentAvailableShowObj = {
                        showId: singleShow._id,
                        nameOfTheShow: singleShow.name,
                        totalSeats: singleShow.totalSeats,
                        availableForTheShow: totalSeatsAvailableForTheShow,
                    };
                    availableShows.push(currentAvailableShowObj);
                }
            });

            // Return a response with available shows and a message indicating the show is full
            return res.json({
                message: "show is full but here are the suggested shows",
                data: availableShows,
            });
        }

        // Check if the seat number is valid for the show's screen
        if (seatNumber <= 0 || seatNumber > show.totalSeats) {
            // If the seat number is invalid, return a 400 error response
            const { currentShow, availableSeats } = await findAvailableSeats(
                showId
            );

            // Return a response with available seats and an error message
            return res.status(409).json({
                error: "Invalid Seat Number",
                message:
                    "Here are the available seatNumbers for the show: " +
                    currentShow.name,
                data: availableSeats,
            });
        }

        // Check if the seat is already booked
        const existingBooking = await Booking.findOne({
            show: showId,
            seatNumber,
            isCancelled: false,
        });

        if (existingBooking) {
            // If the seat is already booked, retrieve the current show and available seats
            const { currentShow, availableSeats } = await findAvailableSeats(
                showId
            );

            // Return a response with available seats and an error message
            return res.status(409).json({
                error: "Seat is already booked",
                message:
                    "Here are the available seats for the show: " +
                    currentShow.name,
                data: availableSeats,
            });
        }

        // create the booking
        const newBooking = new Booking({ show: showId, seatNumber, userId });
        show.alreadyBookedSeats.push(seatNumber);
        await show.save();
        await newBooking.save();

        // Return a success response
        return res.status(201).json({
            message: "Booking created successfully",
        });
    } catch (err) {
        // If an error occurs, log it and return a 500 error response
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            data: err,
        });
    }
};

/**
 * Cancel a booking
 */
const cancelBooking = async (req, res) => {
    // Extract the booking ID from the request params
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            error: "Invalid booking ID",
            message: "Please provide booking id in the request param",
        });
    }

    try {
        // Check if the booking exists
        const booking = await Booking.findById(id);
        if (!booking) {
            // If the booking doesn't exist, return a 400 error response
            return res.status(404).json({
                error: "Booking not found",
            });
        }

        // Get the show ID for the particular booking
        const showId = booking.show;

        // Fetch the show based on the show ID
        const show = await Show.findById(showId);
        // Cancel the booking by setting isCancelled to true
        if (booking.isCancelled) {
            return res.status(409).json({
                success: false,
                message: "Booking is already canceled",
            });
        }
        booking.isCancelled = true;

        // Remove the seat number from the alredyBookedSeats array of the show
        show.alreadyBookedSeats = show.alreadyBookedSeats.filter(
            (singleSeat) => singleSeat !== booking.seatNumber
        );

        // Save the updated booking and show
        await booking.save();
        await show.save();

        // Return a success response
        return res.status(200).json({
            message: "Booking canceled successfully",
        });
    } catch (err) {
        // If an error occurs, log it and return a 500 error response
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            data: err,
        });
    }
};

/**
 * Get all bookings
 */
const getAllBookings = async (req, res) => {
    try {
        // Retrieve all bookings from the database
        const bookings = await Booking.find();

        if (bookings.length > 0) {
            // If bookings are found, return them in the response
            return res.json(bookings);
        } else {
            // If no bookings are found, return a message in the response
            return res.json({
                message: "No bookings found",
            });
        }
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
    createBooking,
    cancelBooking,
    getAllBookings,
};
