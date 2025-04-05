const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const generateTravelPlan = async (messages) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: messages,
    }),
  });

  const data = await response.json();

  if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  } else {
    console.error('Gemini response:', data);
    throw new Error('Gemini API Error: ' + JSON.stringify(data));
  }
};

module.exports = { generateTravelPlan };
