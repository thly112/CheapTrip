// routes/reminderRoutes.js
const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');
const {authenticateToken} = require('../middleware/auth');

// Protected routes
router.post('/', authenticateToken, reminderController.createReminder);
router.get('/', authenticateToken, reminderController.getReminders);
router.delete('/:id', authenticateToken, reminderController.deleteReminder);

module.exports = router;