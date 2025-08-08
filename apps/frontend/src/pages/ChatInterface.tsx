import { Flex } from '@gmzh/react-ui';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { chatMessagesState, userProfileState } from '../recoil/Object.recoil';
import { useChatOperations } from '../services/chatService';
import { createBotMessage, createUserMessage, validateMessage } from '../utils/chatUtils';
import ChatHistory from '../components/chat/ChatHistory';
import InputField from '../components/chat/InputField';

const ChatInterface: React.FC = () => {
  const user = useRecoilValue(userProfileState);
  const [chatMessages, setChatMessages] = useRecoilState(chatMessagesState);

  // Use the chat operations hook for all API logic
  const { chatHistory, error, sendToGPT, saveMessage, isPending } = useChatOperations(
    user?.userId,
    setChatMessages,
  );

  // Set chat messages when history is loaded
  useEffect(() => {
    if (chatHistory) {
      setChatMessages(chatHistory);
    } else if (error) {
      console.error('Error fetching messages:', error);
    }
  }, [chatHistory, error]);

  const handleSendMessage = (message: string) => {
    if (!validateMessage(message) || !user?.userId) return;

    const userMessage = createUserMessage(user.userId, message);
    const placeholderBotMessage = createBotMessage(user.userId, 'Thinking...');

    setChatMessages((oldMessages) => [...oldMessages, userMessage, placeholderBotMessage]);
    sendToGPT(message);
    saveMessage(userMessage);
  };

  return (
    <Flex
      direction="column"
      className="bg-white rounded-lg shadow-lg pt-2"
      style={{ height: '100%' }}
    >
      <ChatHistory messages={chatMessages} isPending={isPending} />
      <InputField onSendMessage={handleSendMessage} disabled={isPending} />
    </Flex>
  );
};

export default ChatInterface;
