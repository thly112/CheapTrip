const express = require('express');
const app = express();
const aiRoutes = require('./routes/ai');

require('dotenv').config();

app.use(express.json());
app.use('/api/ai', aiRoutes);

module.exports = app;
