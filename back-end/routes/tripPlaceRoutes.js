// routes/tripPlaceRoutes.js
const express = require('express');
const router = express.Router();
const tripPlaceController = require('../controllers/tripPlaceController');
const {authenticateToken} = require('../middleware/auth');

// Protected routes
router.post('/:tripId/places', authenticateToken, tripPlaceController.createTripPlace);
router.get('/:tripId/places', authenticateToken, tripPlaceController.getTripPlaces);
router.delete('/:tripId/places/:placeId', authenticateToken, tripPlaceController.deleteTripPlace);

module.exports = router;