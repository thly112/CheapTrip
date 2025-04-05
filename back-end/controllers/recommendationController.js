// controllers/recommendationController.js
const db = require('../config/db');

// Tạo gợi ý mới
const createRecommendation = async (req, res) => {
  const userId = req.user.id;
  const { type, content } = req.body;

  if (!type || !content) {
    return res.status(400).json({ message: 'Type and content are required' });
  }

  try {
    const [result] = await db.promise().query(
      'INSERT INTO recommendations (user_id, type, content) VALUES (?, ?, ?)',
      [userId, type, content]
    );
    res.status(201).json({ message: 'Recommendation created successfully', recommendationId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy danh sách gợi ý
const getRecommendations = async (req, res) => {
  const userId = req.user.id;

  try {
    const [recommendations] = await db.promise().query('SELECT * FROM recommendations WHERE user_id = ?', [userId]);
    res.status(200).json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Xóa gợi ý
const deleteRecommendation = async (req, res) => {
  const userId = req.user.id;
  const recommendationId = req.params.id;

  try {
    const [recommendation] = await db.promise().query('SELECT * FROM recommendations WHERE id = ? AND user_id = ?', [recommendationId, userId]);
    if (recommendation.length === 0) {
      return res.status(404).json({ message: 'Recommendation not found' });
    }

    await db.promise().query('DELETE FROM recommendations WHERE id = ? AND user_id = ?', [recommendationId, userId]);
    res.status(200).json({ message: 'Recommendation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createRecommendation,
  getRecommendations,
  deleteRecommendation,
};