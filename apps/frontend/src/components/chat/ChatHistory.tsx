import { Box, Flex } from '@gmzh/react-ui';
import { forwardRef, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

import { ChatMessage } from '../../types/types';
import { useChatScrollBehavior } from '../../utils/scrollUtils';
import ScrollToBottomButton from './ScrollToBottomButton';

interface ChatHistoryProps {
  messages: ChatMessage[];
  isPending: boolean;
}

const ChatHistory = forwardRef<HTMLDivElement, ChatHistoryProps>(
  ({ messages, isPending: _isPending }, _ref) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Use the scroll behavior hook
    const { showScrollButton, scrollToBottom } = useChatScrollBehavior(
      messages,
      chatContainerRef,
      messagesEndRef,
    );

    return (
      <Box background="gray" rounded="lg" className="relative flex-1" style={{ minHeight: 0 }}>
        <Box
          ref={chatContainerRef}
          padding="md"
          className="space-y-4 mt-4"
          style={{
            overflowY: 'auto',
            overflowX: 'hidden',
            height: 'calc(100% - 16px)', // Complex calculation - keep as inline
          }}
        >
          {messages.map((msg) => (
            <Flex key={msg.msgId} justify={msg.sender === 'user' ? 'end' : 'start'}>
              <Box
                background={
                  msg.sender === 'user'
                    ? 'primary'
                    : msg.message === 'Thinking...'
                    ? 'gray'
                    : 'success'
                }
                color={msg.sender === 'user' ? 'white' : 'black'}
                padding="sm"
                rounded="md"
                style={{
                  maxWidth: '70%',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                }}
              >
                <div
                  className="break-words"
                  style={{
                    color: msg.sender === 'user' ? 'white' : 'black',
                  }}
                >
                  <ReactMarkdown>{msg.message}</ReactMarkdown>
                </div>
              </Box>
            </Flex>
          ))}

          {/* Pending UI removed; "Thinking..." is inserted as a placeholder bot message */}

          <Box ref={messagesEndRef} />
        </Box>

        {/* Scroll to Bottom Button - positioned outside scrolling container */}
        <ScrollToBottomButton show={showScrollButton} onClick={scrollToBottom} />
      </Box>
    );
  },
);

ChatHistory.displayName = 'ChatHistory';

export default ChatHistory;
