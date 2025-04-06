const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post('/generate', async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid message format' });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: messages.map((m) => ({
      role: m.role,
      parts: m.parts
    }))
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      res.json({ reply: data.candidates[0].content.parts[0].text });
    } else {
      console.error('Gemini response:', data);
      res.status(500).json({ error: 'Gemini API error', details: data });
    }
  } catch (err) {
    console.error('Gemini API error:', err.message);
    res.status(500).json({ error: 'Gemini API error', details: err.message });
  }
});

module.exports = router;
