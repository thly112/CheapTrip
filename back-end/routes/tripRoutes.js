// routes/tripRoutes.js
const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const { authenticateToken } = require('../middleware/auth');
// Protected routes
router.post('/', authenticateToken, tripController.createTrip);
router.get('/', authenticateToken, tripController.getTrips);
router.get('/:id', authenticateToken, tripController.getTripById);
router.put('/:id', authenticateToken, tripController.updateTrip);
router.delete('/:id', authenticateToken, tripController.deleteTrip);

module.exports = router;