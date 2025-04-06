// src/pages/Chat.tsx
import React, { useState, useRef, useEffect } from 'react';
import '../styles/chat.css'; // Create this CSS file to style like ChatGPT
import { askGemini } from '../services/aiService';

interface Message {
  role: 'user' | 'model';
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const reply = await askGemini([
        {
          role: 'user',
          parts: [
            {
              text:
                'Bạn là trợ lý du lịch tên ChipChip. Chỉ trả lời câu hỏi liên quan đến hành trình du lịch, ngân sách, địa điểm, trải nghiệm. Nếu không liên quan, từ chối nhẹ nhàng. Trả lời một câu, kèm icon ở cuối câu.',
            },
          ],
        },
        ...messages.map((msg) => ({ role: msg.role, parts: [{ text: msg.content }] })),
        { role: 'user', parts: [{ text: input }] },
      ]);

      setMessages((prev) => [...prev, { role: 'model', content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: '❌ Đã xảy ra lỗi khi kết nối tới AI' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Trợ lý du lịch ChipChip 🧳</div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            <div className="bubble">{msg.content}</div>
          </div>
        ))}
        {loading && <div className="chat-message model"><div className="bubble">ChipChip đang suy nghĩ...</div></div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Hỏi ChipChip về chuyến đi..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>
          <span>➤</span>
        </button>
      </div>
    </div>
  );
};

export default Chat;
