import { useState } from 'react';

export default function ChatInput({ onSend, disabled }) {
  const [message, setMessage] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-[#f0f0e6] dark:bg-[#242b38] text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1db954]"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="px-4 py-2 bg-[#1db954] text-white rounded-lg hover:bg-[#1db954]/80 disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}