import { PlusIcon } from '@heroicons/react/24/outline';

export default function ConversationSidebar({ 
  conversations, 
  currentConversationId, 
  onConversationSelect, 
  onNewChat 
}) {
  return (
    <div className="w-64 bg-[#f0f0e6] dark:bg-[#242b38] p-4 border-r border-gray-200 dark:border-gray-700 h-[calc(100vh-200px)]">
      <button
        onClick={onNewChat}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 mb-4 bg-[#1db954] text-white rounded-lg hover:bg-[#1db954]/80 transition-colors"
      >
        <PlusIcon className="w-5 h-5" />
        New Chat
      </button>
      
      <div className="space-y-2 overflow-y-auto h-[calc(100%-60px)]">
        {conversations.map(conversation => (
          <button
            key={conversation.id}
            onClick={() => onConversationSelect(conversation.id)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-gray-800 dark:text-white ${
              conversation.id === currentConversationId
                ? 'bg-[#1db954]/20'
                : 'hover:bg-[#e6e6dc] dark:hover:bg-[#1b1b1b]'
            }`}
          >
            <p className="text-sm font-medium truncate">
              {conversation.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
} 