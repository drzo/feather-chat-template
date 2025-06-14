import { useState } from 'react';
import { chatCompletion } from '../services/api';

export function useChat() {
  const [conversations, setConversations] = useState([
    { id: 'default', messages: [], title: 'New Chat' }
  ]);
  const [currentConversationId, setCurrentConversationId] = useState('default');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('deepseek-ai/DeepSeek-R1');

  const getCurrentConversation = () => {
    return conversations.find(conv => conv.id === currentConversationId);
  };

  const createNewConversation = () => {
    const newId = `conv-${Date.now()}`;
    const newConversation = {
      id: newId,
      messages: [],
      title: 'New Chat'
    };
    setConversations(prev => [...prev, newConversation]);
    setCurrentConversationId(newId);
  };

  const updateConversationTitle = async (conversationId, firstMessage) => {
    try {
      // Generate a title based on the first message
      const response = await chatCompletion([
        { role: 'system', content: 'Generate a very brief title (max 6 words) for a conversation that starts with this message. Response should be just the title, nothing else.' },
        { role: 'user', content: firstMessage }
      ], selectedModel);

      setConversations(prev => prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, title: response }
          : conv
      ));
    } catch (error) {
      console.error('Failed to generate conversation title:', error);
      // Set a default title if API call fails
      setConversations(prev => prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, title: 'Untitled Chat' }
          : conv
      ));
    }
  };

  const sendMessage = async (content) => {
    try {
      setIsLoading(true);
      const currentConversation = getCurrentConversation();
      const userMessage = { role: 'user', content };

      // Update messages in the current conversation
      setConversations(prev => prev.map(conv =>
        conv.id === currentConversationId
          ? { ...conv, messages: [...conv.messages, userMessage] }
          : conv
      ));

      // Generate title for new conversations
      if (currentConversation.messages.length === 0) {
        updateConversationTitle(currentConversationId, content);
      }

      // Get API response
      const response = await chatCompletion([...currentConversation.messages, userMessage], selectedModel);

      // Update this part to only add the assistant message
      setConversations(prev => prev.map(conv =>
        conv.id === currentConversationId
          ? { 
              ...conv, 
              messages: [...conv.messages, { role: 'assistant', content: response }]
            }
          : conv
      ));
    } catch (error) {
      console.error('Error in chat:', error);
      // Add error message
      setConversations(prev => prev.map(conv =>
        conv.id === currentConversationId
          ? {
              ...conv,
              messages: [...conv.messages, { role: 'assistant', content: 'Sorry, there was an error processing your message.' }]
            }
          : conv
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    createNewConversation,
    messages: getCurrentConversation()?.messages || [],
    sendMessage,
    isLoading,
    selectedModel,
    setSelectedModel,
  };
}