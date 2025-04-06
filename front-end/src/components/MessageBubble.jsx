export default function MessageBubble({ text, isUser }) {
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
        <div className={`p-3 rounded-2xl max-w-[70%] text-white ${isUser ? 'bg-blue-500' : 'bg-gray-600'}`}>
          {text}
        </div>
      </div>
    );
  }
  