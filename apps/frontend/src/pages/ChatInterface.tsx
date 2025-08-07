import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import { apiClient } from '../api/api';
import { chatMessagesState, userProfileState } from '../recoil/Object.recoil';
import { ChatMessage } from '../types/types';
import { Box, Button, Flex, Typography } from '@gmzh/react-ui';

const ChatInterface: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const user = useRecoilValue(userProfileState);
  const [chatMessages, setChatMessages] = useRecoilState(chatMessagesState);

  const { data: chatHistory, error } = useQuery({
    queryKey: ['messages', user?.userId],
    queryFn: async () => {
      if (!user?.userId) {
        throw new Error('User ID is undefined');
      }
      return apiClient.getMessagesByUserId(user.userId);
    },
    enabled: !!user?.userId,
  });

  useEffect(() => {
    if (chatHistory) {
      const sortedChatHistory = [...chatHistory].sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      );
      setChatMessages(sortedChatHistory);
    } else if (error) {
      console.error('Error fetching messages:', error);
    }
  }, [chatHistory, error, setChatMessages]);

  const sendMessageMutation = useMutation({
    mutationFn: (message: string) => apiClient.sendMessageToGPT(JSON.stringify({ message })),
    onSuccess: (data) => {
      if (!user?.userId) return;

      const botMessage: ChatMessage = {
        msgId: `msg-${uuidv4()}`,
        userId: user.userId,
        sender: 'bot',
        message: data.response,
        timestamp: new Date().toISOString(),
      };

      setChatMessages((oldMessages) => [...oldMessages, botMessage]);
      saveMessageMutation.mutate(botMessage);
    },
    onError: (err) => {
      console.error('Error sending message to GPT:', err);
    },
  });

  const { mutate: sendToGPT, isPending } = sendMessageMutation;

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !user?.userId) return;

    const userMessage: ChatMessage = {
      msgId: `msg-${uuidv4()}`,
      userId: user?.userId,
      sender: 'user',
      message: inputValue,
      timestamp: new Date().toISOString(),
    };

    setChatMessages((oldMessages) => [...oldMessages, userMessage]);
    sendToGPT(inputValue);
    setInputValue('');
    saveMessageMutation.mutate(userMessage);
  };

  const saveMessageMutation = useMutation({
    mutationFn: async (message: ChatMessage) => {
      await apiClient.saveMessage(message);
    },
    onError: (err) => {
      console.error('Error saving message:', err);
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowScrollButton(false);
  };

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
  };

  useEffect(() => {
    if (chatMessages.length > 0) {
      const lastMessage = chatMessages[chatMessages.length - 1];
      if (lastMessage.sender === 'user') {
        scrollToBottom();
      }
    }
  }, [chatMessages]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;
    chatContainer.addEventListener('scroll', handleScroll);
    return () => {
      chatContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Flex
      direction="column"
      className="bg-white rounded-md shadow-lg h-full"
      style={{ maxHeight: '90vh' }}
    >
      <Box
        ref={chatContainerRef}
        background="gray"
        padding="sm"
        className="overflow-y-auto space-y-4 overflow-x-hidden rounded-t-md"
        style={{ flex: 1 }}
      >
        {chatMessages.map((msg) => (
          <Flex key={msg.msgId} justify={msg.sender === 'user' ? 'end' : 'start'}>
            <Box
              background={msg.sender === 'user' ? 'primary' : 'success'}
              padding="sm"
              rounded="md"
              className={`max-w-xs break-words ${
                msg.sender === 'user' ? 'text-white' : 'text-gray-700'
              }`}
            >
              <ReactMarkdown>{msg.message}</ReactMarkdown>
            </Box>
          </Flex>
        ))}

        {isPending && (
          <Flex justify="start">
            <Box background="success" padding="sm" rounded="md" className="max-w-xs">
              <Typography>Thinking...</Typography>
            </Box>
          </Flex>
        )}
        <div ref={messagesEndRef} />

        {showScrollButton && (
          <Button
            onClick={scrollToBottom}
            className="absolute bg-blue-300 text-white rounded-full shadow-lg hover:bg-blue-600"
            style={{
              top: '80%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '12px',
              zIndex: 10,
            }}
          >
            ↓
          </Button>
        )}
      </Box>

      <Box
        display="flex"
        background="gray"
        padding="sm"
        className="w-full items-center"
        style={{ height: '72px' }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white hover:bg-blue-600"
        >
          Send
        </Button>
      </Box>
    </Flex>
  );
};

export default ChatInterface;
