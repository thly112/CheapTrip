const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const generateTravelPlan = async (messages) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const response = await axios.post(url, {
    contents: messages
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = response.data;

  if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  } else {
    console.error('Gemini response:', data);
    throw new Error('Gemini API Error: ' + JSON.stringify(data));
  }
};

module.exports = { generateTravelPlan };
