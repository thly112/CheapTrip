// routes/weatherForecastRoutes.js
const express = require('express');
const router = express.Router();
const weatherForecastController = require('../controllers/weatherForecastController');
const { authenticateToken } = require('../middleware/auth');

router.post('/:tripId/weather', authenticateToken, weatherForecastController.createWeatherForecast);
router.get('/:tripId/weather', authenticateToken, weatherForecastController.getWeatherForecasts);
router.delete('/:tripId/weather/:forecastId', authenticateToken, weatherForecastController.deleteWeatherForecast);

module.exports = router;