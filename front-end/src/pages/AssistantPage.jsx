import React, { useState } from 'react';
import { askGemini } from '../services/aiService';

const AssistantPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', parts: [{ text: input }] };

    // System prompt: bot chỉ nói về du lịch
    const systemPrompt = {
      role: 'user',
      parts: [{
        text: 'Bạn là một trợ lý ảo chuyên về du lịch tên là chipchip. Chỉ trả lời các câu hỏi liên quan đến thông tin khách hàng và du lịch như gợi ý hành trình, địa điểm tham quan, ngân sách, phương tiện di chuyển, trải nghiệm. Nếu câu hỏi không liên quan, hãy từ chối một cách lịch sự. Không hỏi nhiều hơn 1 câu. Thêm icon cuối câu'
      }]
    };

    const conversation = [systemPrompt, ...messages, userMessage];

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const reply = await askGemini(conversation);
      const botMessage = { role: 'model', parts: [{ text: reply }] };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, {
        role: 'model',
        parts: [{ text: '❌ Lỗi kết nối đến AI' }]
      }]);
    } finally {
      setLoading(false);
    }
  };

  const renderText = (msg) =>
    msg.parts?.[0]?.text || msg.text || '';

  return (
    <div className="p-4">
      <div className="h-[70vh] overflow-y-auto bg-gray-100 p-2 rounded">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 ${m.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <span className="inline-block bg-white shadow p-2 rounded">
              {renderText(m)}
            </span>
          </div>
        ))}
        {loading && (
          <div className="text-left mb-2">
            <span className="inline-block bg-white shadow p-2 rounded">
              Đang nghĩ...
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex">
        <input
          className="flex-grow p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={loading}
          placeholder="Hỏi trợ lý về chuyến đi của bạn..."
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default AssistantPage;
