const { getItineraryFromGPT } = require("../services/aiService");

const generateItinerary = async (req, res) => {
  const { location, days, preferences, budget } = req.body;

  const prompt = `Tạo lịch trình du lịch ${days} ngày ở ${location}, ưu tiên các hoạt động: ${preferences.join(
    ", "
  )}. Ngân sách: ${budget}.`;

  try {
    const itinerary = await getItineraryFromGPT(prompt);
    res.json({ itinerary });
  } catch (error) {
    res.status(500).json({ error: "Không thể tạo lịch trình." });
  }
};

module.exports = { generateItinerary };
