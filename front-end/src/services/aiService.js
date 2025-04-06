export const askGemini = async (messages) => {
    const response = await fetch('http://localhost:5000/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });
  
    const data = await response.json();
    if (data.reply) return data.reply;
    throw new Error(data.error || 'Lỗi từ AI');
    // Giả sử AI trả: "Ngày 1: Đà Nẵng → Hội An. Ngày 2: Bà Nà Hills."
    const extractPlaces = (text) => {
        const regex = /Đà Nẵng|Hội An|Huế|Bà Nà Hills|Sapa|Ninh Bình|Hà Nội|TPHCM|.../gi;
        const matches = text.match(regex);
        return [...new Set(matches)];
    };
  
  };
  