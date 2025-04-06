// controllers/weatherForecastController.js
const db = require('../config/db');

// Tạo dự báo thời tiết mới
const createWeatherForecast = async (req, res) => {
  const userId = req.user.id;
  const tripId = req.params.tripId;
  const { forecast_date, temperature, weather_condition } = req.body;

  if (!forecast_date) {
    return res.status(400).json({ message: 'Forecast date is required' });
  }

  try {
    const [trip] = await db.promise().query('SELECT * FROM trips WHERE id = ? AND user_id = ?', [tripId, userId]);
    if (trip.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const [result] = await db.promise().query(
      'INSERT INTO weather_forecasts (trip_id, forecast_date, temperature, weather_condition) VALUES (?, ?, ?, ?)',
      [tripId, forecast_date, temperature || null, weather_condition || null]
    );
    res.status(201).json({ message: 'Weather forecast created successfully', forecastId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy danh sách dự báo thời tiết của một chuyến đi
const getWeatherForecasts = async (req, res) => {
  const userId = req.user.id;
  const tripId = req.params.tripId;

  try {
    const [trip] = await db.promise().query('SELECT * FROM trips WHERE id = ? AND user_id = ?', [tripId, userId]);
    if (trip.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const [forecasts] = await db.promise().query('SELECT * FROM weather_forecasts WHERE trip_id = ?', [tripId]);
    res.status(200).json(forecasts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Xóa dự báo thời tiết
const deleteWeatherForecast = async (req, res) => {
  const userId = req.user.id;
  const tripId = req.params.tripId;
  const forecastId = req.params.forecastId;

  try {
    const [trip] = await db.promise().query('SELECT * FROM trips WHERE id = ? AND user_id = ?', [tripId, userId]);
    if (trip.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const [forecast] = await db.promise().query('SELECT * FROM weather_forecasts WHERE id = ? AND trip_id = ?', [forecastId, tripId]);
    if (forecast.length === 0) {
      return res.status(404).json({ message: 'Weather forecast not found' });
    }

    await db.promise().query('DELETE FROM weather_forecasts WHERE id = ? AND trip_id = ?', [forecastId, tripId]);
    res.status(200).json({ message: 'Weather forecast deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createWeatherForecast,
  getWeatherForecasts,
  deleteWeatherForecast,
};