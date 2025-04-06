// server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const tripPlaceRoutes = require('./routes/tripPlaceRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const weatherForecastRoutes = require('./routes/weatherForecastRoutes');
const aiRoutes = require('./routes/ai');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/trips', tripPlaceRoutes);
app.use('/api/trips', expenseRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/trips', weatherForecastRoutes);
app.use('/api/ai', aiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
