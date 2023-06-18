const express = require("express");
const userController = require("../controllers/userController.js");

const router = express.Router();

// Route to create a new user
router.post("/user", userController.createUser);

// Export the router as a module
module.exports = router;
