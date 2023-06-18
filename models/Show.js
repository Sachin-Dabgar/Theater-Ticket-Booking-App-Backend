const mongoose = require("mongoose");

/**
 * Schema for a show in the database.
 */
const showSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    screen: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return value > 0; // Validate that screen number is a positive number
            },
            message: "Screen number must be a positive number",
        },
    },
    totalSeats: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value > 0; // Validate that totalSeats is a positive number
            },
            message: "Total seats must be a positive number",
        },
    },
    showTime: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    alreadyBookedSeats: {
        type: Array,
        required: true,
    },
});

/**
 * The Show model.
 * @type {mongoose.Model<Show>}
 */
const Show = mongoose.model("Show", showSchema);

// Export the model as a module
module.exports = Show;
