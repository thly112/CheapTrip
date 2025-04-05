const express = require("express");
const cors = require("cors");
const itineraryRoutes = require("./routes/itineraryRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/itinerary", itineraryRoutes);

module.exports = app;
