// server.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const tripPlaceRoutes = require('./routes/tripPlaceRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const weatherForecastRoutes = require('./routes/weatherForecastRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/trips', tripPlaceRoutes);
app.use('/api/trips', expenseRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/trips', weatherForecastRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});