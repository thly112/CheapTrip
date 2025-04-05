import { useState } from 'react';

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="flex p-3 border-t bg-white">
      <input
        className="flex-grow border rounded-2xl px-4 py-2 mr-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Nhập tin nhắn..."
      />
      <button onClick={handleSend} className="bg-blue-500 text-white px-4 rounded-2xl">Gửi</button>
    </div>
  );
}
