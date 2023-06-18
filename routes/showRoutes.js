const express = require("express");
const showController = require("../controllers/showController.js");

const router = express.Router();

// Route to get all shows
router.get("/shows", showController.getAllShows);

// Route to create a new show
router.post("/shows", showController.createShow);

// Export the router as a module
module.exports = router;
