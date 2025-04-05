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
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
// Cấu hình CORS
app.use(cors({
    origin: 'http://localhost:3000', // Chỉ cho phép frontend từ localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức cho phép
    allowedHeaders: ['Content-Type', 'Authorization'], // Các header được phép
  }));
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