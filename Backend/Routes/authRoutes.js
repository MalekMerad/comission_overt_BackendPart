const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

// Public routes : hado li rahom fi file authController.js
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;