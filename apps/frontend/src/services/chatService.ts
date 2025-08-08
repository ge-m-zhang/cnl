import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { apiClient } from '../api/api';
import { ChatMessage } from '../types/types';
import { createBotMessage, sortMessagesByTimestamp } from '../utils/chatUtils';

/**
 * Custom hook for fetching chat messages by user ID
 */
export const useChatHistory = (userId: string | undefined) =>
  useQuery({
    queryKey: ['messages', userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error('User ID is undefined');
      }
      return apiClient.getMessagesByUserId(userId);
    },
    enabled: !!userId,
  });

/**
 * Custom hook for sending messages to GPT
 */
export const useSendMessageToGPT = (
  userId: string | undefined,
  onSuccess: (botMessage: ChatMessage) => void,
) =>
  useMutation({
    mutationFn: (message: string) => apiClient.sendMessageToGPT(JSON.stringify({ message })),
    onSuccess: (data) => {
      if (!userId) return;

      const botMessage = createBotMessage(userId, data.response);
      onSuccess(botMessage);
    },
    onError: (err) => {
      console.error('Error sending message to GPT:', err);
    },
  });

/**
 * Custom hook for saving messages to the database
 */
export const useSaveMessage = () =>
  useMutation({
    mutationFn: async (message: ChatMessage) => {
      await apiClient.saveMessage(message);
    },
    onError: (err) => {
      console.error('Error saving message:', err);
    },
  });

/**
 * Custom hook that combines all chat-related mutations and queries
 */
export const useChatOperations = (
  userId: string | undefined,
  setChatMessages: (updater: (prev: ChatMessage[]) => ChatMessage[]) => void,
) => {
  // Fetch chat history
  const { data: chatHistory, error, isFetching } = useChatHistory(userId);

  // Save message mutation
  const saveMessageMutation = useSaveMessage();

  // Send to GPT mutation
  const sendMessageMutation = useSendMessageToGPT(userId, (botMessage: ChatMessage) => {
    setChatMessages((oldMessages) => {
      const lastMessage = oldMessages[oldMessages.length - 1];
      if (lastMessage && lastMessage.sender === 'bot' && lastMessage.message === 'Thinking...') {
        const updatedMessages = oldMessages.slice(0, -1);
        return [...updatedMessages, botMessage];
      }
      return [...oldMessages, botMessage];
    });
    saveMessageMutation.mutate(botMessage);
  });

  // Process chat history when it's loaded - memoized to prevent infinite loops
  const processedChatHistory = useMemo(
    () => (chatHistory ? sortMessagesByTimestamp(chatHistory) : []),
    [chatHistory],
  );

  return {
    chatHistory: processedChatHistory,
    error,
    isFetching,
    sendToGPT: sendMessageMutation.mutate,
    saveMessage: saveMessageMutation.mutate,
    isPending: sendMessageMutation.isPending,
  };
};
