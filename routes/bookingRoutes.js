const express = require("express");
// Importing the controllers for booking
const bookingController = require("../controllers/bookingController.js");

const router = express.Router();

// Route to get all bookings.

router.get("/bookings", bookingController.getAllBookings);

//  Route to create a new booking.
router.post("/bookings", bookingController.createBooking);

//  Route to cancel a booking.
router.delete("/bookings/:id", bookingController.cancelBooking);

// Export the router as a module
module.exports = router;
