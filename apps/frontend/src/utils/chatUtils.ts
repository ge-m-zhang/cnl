import { v4 as uuidv4 } from 'uuid';

import { ChatMessage } from '../types/types';

/**
 * Creates a user message object
 */
export const createUserMessage = (userId: string, message: string): ChatMessage => ({
    msgId: `msg-${uuidv4()}`,
    userId,
    sender: 'user',
    message,
    timestamp: new Date().toISOString(),
  });

/**
 * Creates a bot message object
 */
export const createBotMessage = (userId: string, response: string): ChatMessage => ({
    msgId: `msg-${uuidv4()}`,
    userId,
    sender: 'bot',
    message: response,
    timestamp: new Date().toISOString(),
  });

/**
 * Validates if a message is not empty after trimming
 */
export const validateMessage = (message: string): boolean => message.trim().length > 0;

/**
 * Sorts messages by timestamp in ascending order
 */
export const sortMessagesByTimestamp = (messages: ChatMessage[]): ChatMessage[] => [...messages].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

/**
 * Checks if a message is from the user
 */
export const isUserMessage = (message: ChatMessage): boolean => message.sender === 'user';

/**
 * Checks if a message is from the bot
 */
export const isBotMessage = (message: ChatMessage): boolean => message.sender === 'bot';

/**
 * Gets the last message from an array of messages
 */
export const getLastMessage = (messages: ChatMessage[]): ChatMessage | undefined => messages[messages.length - 1];