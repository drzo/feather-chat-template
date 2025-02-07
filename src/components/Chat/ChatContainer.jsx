import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

export default function ChatContainer({ messages, sendMessage, isLoading }) {
  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-[#f0f0e6] dark:bg-[#242b38] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex-1 overflow-y-auto space-y-4 p-6">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-[#e6e6dc] dark:bg-[#1b1b1b]">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
