// routes/auth.js
const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../../digital-portfolio-backend/controllers/authController');

// Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', authUser);

module.exports = router;
