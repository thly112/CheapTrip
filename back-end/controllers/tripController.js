// controllers/tripController.js
const db = require('../config/db');

// Tạo chuyến đi mới
const createTrip = async (req, res) => {
  const userId = req.user.id; // Lấy từ token qua middleware
  const { name, start_date, end_date, location } = req.body;

  if (!name || !start_date || !end_date || !location) {
    return res.status(400).json({ message: 'Name, start_date, end_date, and location are required' });
  }

  try {
    const [result] = await db.promise().query(
      'INSERT INTO trips (user_id, name, start_date, end_date, location) VALUES (?, ?, ?, ?, ?)',
      [userId, name, start_date, end_date, location]
    );
    res.status(201).json({ message: 'Trip created successfully', tripId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy danh sách chuyến đi của người dùng
const getTrips = async (req, res) => {
  const userId = req.user.id;

  try {
    const [trips] = await db.promise().query('SELECT * FROM trips WHERE user_id = ?', [userId]);
    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy thông tin chi tiết của một chuyến đi
const getTripById = async (req, res) => {
  const userId = req.user.id;
  const tripId = req.params.id;

  try {
    const [trip] = await db.promise().query('SELECT * FROM trips WHERE id = ? AND user_id = ?', [tripId, userId]);
    if (trip.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cập nhật chuyến đi
const updateTrip = async (req, res) => {
  const userId = req.user.id;
  const tripId = req.params.id;
  const { name, start_date, end_date, location, total_cost } = req.body;

  try {
    const [trip] = await db.promise().query('SELECT * FROM trips WHERE id = ? AND user_id = ?', [tripId, userId]);
    if (trip.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const updates = {};
    if (name) updates.name = name;
    if (start_date) updates.start_date = start_date;
    if (end_date) updates.end_date = end_date;
    if (location) updates.location = location;
    if (total_cost) updates.total_cost = total_cost;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    await db.promise().query('UPDATE trips SET ? WHERE id = ? AND user_id = ?', [updates, tripId, userId]);
    res.status(200).json({ message: 'Trip updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Xóa chuyến đi
const deleteTrip = async (req, res) => {
  const userId = req.user.id;
  const tripId = req.params.id;

  try {
    const [trip] = await db.promise().query('SELECT * FROM trips WHERE id = ? AND user_id = ?', [tripId, userId]);
    if (trip.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    await db.promise().query('DELETE FROM trips WHERE id = ? AND user_id = ?', [tripId, userId]);
    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
};