const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const { authenticate } = require('../middlewares/auth');

// Protected routes
router.get('/', authenticate, userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, userController.deleteUser);

module.exports = router;