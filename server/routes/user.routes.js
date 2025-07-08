const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/me', authenticateToken, userController.getUser);

module.exports = router; 