const express = require('express');
const router = express.Router();
const { askAI } = require('../controllers/aiController');

router.post('/', async (req, res) => {
    const { messages } = req.body;
  
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Missing or invalid "messages"' });
    }
  
    try {
      const reply = await generateTravelPlan(messages);
      res.json({ reply });
    } catch (err) {
      console.error('Gemini API error:', err.message);
      res.status(500).json({ error: 'Gemini API error', details: err.message });
    }
  });
  

module.exports = router;
