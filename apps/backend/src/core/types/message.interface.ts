export interface ChatMessage {
  msgId: string;
  userId: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: string;
}

// optional for MVP

export interface ChatPartition {
  partitionKey: string;
  messages: ChatMessage[];
}

export interface RateLimit {
  userId: string;
  messagesSent: number;
  windowStartTime: string;
}
