import ChatContainer from './components/Chat/ChatContainer';
import ConversationSidebar from './components/Chat/ConversationSidebar';
import ModelSelector from './components/ModelSelector';
import { useChat } from './hooks/useChat';
import featherlessLogo from './assets/featherless.png';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const {
    selectedModel,
    setSelectedModel,
    messages,
    sendMessage,
    isLoading,
    conversations,
    currentConversationId,
    setCurrentConversationId,
    createNewConversation
  } = useChat();

  return (
    <div className="min-h-screen bg-[#f5f5f0] dark:bg-[#1b1b1b] transition-colors">
      <header className="bg-[#f0f0e6] dark:bg-[#242b38] shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <img 
                src={featherlessLogo} 
                alt="Featherless Logo" 
                className="h-10 w-auto object-contain" 
              />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Featherless Chat Template
              </h1>
            </div>
            <div className="absolute top-4 right-6">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          <div className="w-80 shrink-0">
            <div className="sticky top-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Choose a model
              </label>
              <ModelSelector 
                selectedModel={selectedModel}
                onModelSelect={setSelectedModel}
              />
            </div>
          </div>
          
          <div className="flex-1 flex gap-6">
            <ConversationSidebar
              conversations={conversations}
              currentConversationId={currentConversationId}
              onConversationSelect={setCurrentConversationId}
              onNewChat={createNewConversation}
            />
            
            <div className="flex-1">
              <ChatContainer 
                messages={messages}
                sendMessage={sendMessage}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}