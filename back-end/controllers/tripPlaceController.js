// controllers/tripPlaceController.js
const db = require('../config/db');

// Tạo địa điểm mới trong chuyến đi
const createTripPlace = async (req, res) => {
  const userId = req.user.id;
  const tripId = req.params.tripId;
  const { name, lat, lng } = req.body;

  if (!name || !lat || !lng) {
    return res.status(400).json({ message: 'Name, lat, and lng are required' });
  }

  try {
    // Kiểm tra xem chuyến đi có thuộc về người dùng không
    const [trip] = await db.promise().query('SELECT * FROM trips WHERE id = ? AND user_id = ?', [tripId, userId]);
    if (trip.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const [result] = await db.promise().query(
      'INSERT INTO trip_places (trip_id, name, lat, lng) VALUES (?, ?, ?, ?)',
      [tripId, name, lat, lng]
    );
    res.status(201).json({ message: 'Trip place created successfully', placeId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy danh sách địa điểm của một chuyến đi
const getTripPlaces = async (req, res) => {
  const userId = req.user.id;
  const tripId = req.params.tripId;

  try {
    const [trip] = await db.promise().query('SELECT * FROM trips WHERE id = ? AND user_id = ?', [tripId, userId]);
    if (trip.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const [places] = await db.promise().query('SELECT * FROM trip_places WHERE trip_id = ?', [tripId]);
    res.status(200).json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Xóa địa điểm
const deleteTripPlace = async (req, res) => {
  const userId = req.user.id;
  const tripId = req.params.tripId;
  const placeId = req.params.placeId;

  try {
    const [trip] = await db.promise().query('SELECT * FROM trips WHERE id = ? AND user_id = ?', [tripId, userId]);
    if (trip.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const [place] = await db.promise().query('SELECT * FROM trip_places WHERE id = ? AND trip_id = ?', [placeId, tripId]);
    if (place.length === 0) {
      return res.status(404).json({ message: 'Trip place not found' });
    }

    await db.promise().query('DELETE FROM trip_places WHERE id = ? AND trip_id = ?', [placeId, tripId]);
    res.status(200).json({ message: 'Trip place deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createTripPlace,
  getTripPlaces,
  deleteTripPlace,
};