const express = require("express");
const bookingRoutes = require("./routes/bookingRoutes.js");
const showRoutes = require("./routes/showRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const connectDB = require("./db/connect.js");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1", bookingRoutes);
app.use("/api/v1", showRoutes);
app.use("/api/v1", userRoutes);

// Start the server
const PORT = process.env.PORT || 8080;

// Default route
app.get("/", (req, res) => {
    res.send("<h1>Welcome to Theater Ticket Booking App</h1>");
});

const start = async () => {
    try {
        // Connect to the database
        await connectDB(process.env.MONGODB_URL);
        console.log("Database connection established");
        app.listen(PORT, () => {
            console.log("Server listening on port " + PORT);
        });
    } catch (error) {
        console.log(error);
    }
};

start();

// Export the app as a module
module.exports = app;
