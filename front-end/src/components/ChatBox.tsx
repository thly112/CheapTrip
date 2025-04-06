import React, { useState } from 'react';
import './ChatBox.css';

const ChatBox: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, input]);
    setInput('');
  };

  return (
    <div className={`chat-wrapper ${expanded ? 'expanded' : ''}`}>
      {expanded && (
        <div className="chat-history">
          {messages.map((msg, i) => (
            <div key={i} className="chat-message user">{msg}</div>
          ))}
        </div>
      )}
      <div className="chat-input-container">
        <input
          className="chat-input"
          placeholder="Ask anything..."
          value={input}
          onFocus={() => setExpanded(true)}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="send-btn">↑</button>
      </div>
    </div>
  );
};

export default ChatBox;
