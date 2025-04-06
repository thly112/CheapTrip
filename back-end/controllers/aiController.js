const { getGeminiReply } = require('../services/aiService');

async function askAI(req, res) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Thiếu nội dung yêu cầu' });
  }

  try {
    const reply = await getGeminiReply(message);
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi gọi Gemini API' });
  }
}

module.exports = { askAI };
