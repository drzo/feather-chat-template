import ReactMarkdown from 'react-markdown';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-3xl rounded-lg px-4 py-2 shadow-sm ${
        isUser 
          ? 'bg-[#1db954] text-white' 
          : 'bg-[#242b38] border border-gray-700 text-white'
      }`}>
        <ReactMarkdown className={`prose prose-invert max-w-none`}>
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}