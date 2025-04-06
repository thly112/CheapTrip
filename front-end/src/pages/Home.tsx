// Home.tsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/home.css';
import logo from '../assets/logo.png';
import { askGemini } from '../services/aiService';

const Home: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatHistoryRef = useRef<HTMLDivElement>(null);
  
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', parts: [{ text: input }] };
    const systemPrompt = {
      role: 'user',
      parts: [
        {
          text: `
    Bạn là một trợ lý ảo du lịch tên là **Chipchip** 🐣. Nhiệm vụ của bạn là giúp người dùng lên kế hoạch cho chuyến đi du lịch một cách thông minh và cá nhân hóa.
    
    Chỉ trả lời các câu hỏi liên quan đến **du lịch**, ví dụ như: gợi ý lịch trình, địa điểm tham quan, ngân sách, phương tiện di chuyển, chỗ ở, món ăn ngon, trải nghiệm độc đáo, v.v. Nếu người dùng hỏi gì không liên quan đến du lịch, bạn hãy từ chối một cách lịch sự nhé. 🙏
    
    Mục tiêu của bạn là **thu thập thông tin chi tiết** từ người dùng để tạo ra lịch trình phù hợp. Tuy nhiên, **chỉ được hỏi từng câu một**, và **ưu tiên việc tạo lịch trình trước**, **phải tạo được lịch trình cho khách hàng**.
    
    Bạn có thể hỏi các thông tin như:
    - Điểm đến (ví dụ: Hà Nội)
    - Ngày bắt đầu chuyến đi
    - Ngân sách cho chuyến đi
    - Sở thích cá nhân (thích biển, núi, văn hóa, ẩm thực...)
    - Các loại hoạt động yêu thích (di chuyển, nghỉ ngơi, ăn uống, tham quan, mua sắm...)
    - Ghi chú mong muốn thêm (ví dụ: thích chụp ảnh sống ảo, thích tham quan nhiều)
    - Tên địa điểm cụ thể (ví dụ: Lăng Bác)
    - Các loại chi phí (ăn uống, đi lại, vé vào cổng...) và số tiền tương ứng
    
    Hãy hỏi từng thông tin một cách tự nhiên, thân thiện, có emoji ở cuối mỗi câu để tạo cảm giác gần gũi nhé! 😊
          `
        }
      ]
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
      setMessages((prev) => [
        ...prev,
        { role: 'model', parts: [{ text: '❌ Lỗi kết nối đến AI' }] }
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const renderText = (msg: any) => msg.parts?.[0]?.text || msg.text || '';

  useEffect(() => {
    if (chatEndRef.current && chatHistoryRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, loading]);

  return (
    <div className="home">
      <img src={logo} alt="CheapTrip Background Logo" className="background-logo" />


      <div className="chat-wrapper">
        <div className={`chat-box beautiful ${messages.length > 0 ? 'visible' : 'start-only'}`}>
          <div className="chat-history" ref={chatHistoryRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-message ${m.role === 'user' ? 'user' : 'bot'}`}>
                <div className="message-content">{renderText(m)}</div>
              </div>
            ))}
            {loading && (
              <div className="chat-message bot">
                <div className="message-content">Đợi ChipChip xíuuu...</div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-input-container beautiful">
            <textarea
              ref={inputRef}
              className="chat-input beautiful"
              placeholder="ChipChip nghe nè..."
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={loading}
            />
            <button className="send-button beautiful" onClick={handleSend} disabled={loading}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 4L20 12L12 20L10.5 18.5L16 13H4V11H16L10.5 5.5L12 4Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <svg width="24" height="24" fill="#fff">
          <path
            d="M12 5V19M12 19L5 12M12 19L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Home;
