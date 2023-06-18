const mongoose = require("mongoose");

/**
 * Schema for a booking in the database.
 */
const bookingSchema = new mongoose.Schema({
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Show",
        required: true,
    },
    seatNumber: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value > 0; // Validate that seatNumber is a positive number
            },
            message: "Seat number must be a positive number",
        },
    },
    isCancelled: {
        type: Boolean,
        default: false,
    },
    bookingTime: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

/**
 * The Booking model.
 * @type {mongoose.Model<Booking>}
 */
const Booking = mongoose.model("Booking", bookingSchema);

// Export the model as a module
module.exports = Booking;
