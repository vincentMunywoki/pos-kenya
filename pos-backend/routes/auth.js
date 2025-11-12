const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Register & login
router.post("/register", authController.register);
router.post("/login", authController.login);

// Update profile
router.put("/update-profile", authController.updateProfile);

module.exports = router;
