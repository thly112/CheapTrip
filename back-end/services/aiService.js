require("dotenv").config();
const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getItineraryFromGemini(prompt) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || "Không có nội dung trả về.";
  } catch (error) {
    console.error("❌ Lỗi khi gọi Gemini API:", error.response?.data || error.message);
    throw new Error("Gemini API call failed");
  }
}

module.exports = { getItineraryFromGemini };
