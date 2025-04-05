import { useState } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { text: "Xin chào! Mình là trợ lý du lịch AI. Bạn muốn đi đâu chơi nè?", isUser: false },
  ]);

  const handleSend = (text) => {
    const newMessages = [...messages, { text, isUser: true }];
    setMessages(newMessages);

    // Mô phỏng trả lời của trợ lý AI
    setTimeout(() => {
      setMessages([...newMessages, {
        text: "Bạn thích trải nghiệm thiên nhiên, thành phố, hay thư giãn yên tĩnh hơn?", isUser: false
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[90vh] max-w-xl mx-auto border rounded-xl shadow-lg overflow-hidden bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} text={msg.text} isUser={msg.isUser} />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}
