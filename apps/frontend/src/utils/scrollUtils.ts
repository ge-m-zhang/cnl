import { RefObject, useCallback, useEffect, useState } from "react";

import { ChatMessage } from "../types/types";
import { getLastMessage, isUserMessage } from "./chatUtils";

/**
 * Scrolls an element to the bottom smoothly
 */
export const scrollToBottom = (ref: RefObject<HTMLElement>) => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
};

/**
 * Scrolls to show the latest user message at the top with proper gap
 */
export const scrollToShowUserMessage = (
  containerRef: RefObject<HTMLElement>,
  userMessageRef: RefObject<HTMLElement>
) => {
  if (!containerRef.current || !userMessageRef.current) return;

  const container = containerRef.current;
  const userMessage = userMessageRef.current;

  // Calculate position to show user message at top with gap
  const gap = 20; // 20px gap from top
  const targetScrollTop = userMessage.offsetTop - gap;

  container.scrollTo({
    top: targetScrollTop,
    behavior: "smooth",
  });
};

/**
 * Determines if the scroll button should be shown based on scroll position
 */
export const shouldShowScrollButton = (
  element: HTMLElement,
  threshold = 100
): boolean => {
  const { scrollTop, scrollHeight, clientHeight } = element;
  return scrollHeight - scrollTop - clientHeight > threshold;
};

/**
 * Custom hook for managing scroll behavior in chat
 */
export const useChatScroll = (messages: ChatMessage[]) => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);

  const scrollToBottomWithButton = useCallback(
    (messagesEndRef: RefObject<HTMLElement>) => {
      scrollToBottom(messagesEndRef);
      setShowScrollButton(false);
    },
    []
  );

  const handleScroll = useCallback((element: HTMLElement) => {
    const shouldShow = shouldShowScrollButton(element);
    setShowScrollButton(shouldShow);
  }, []);

  // Enhanced auto-scroll logic for user messages
  const shouldAutoScroll = useCallback(
    (
      containerRef: RefObject<HTMLElement>,
      messagesEndRef: RefObject<HTMLElement>
    ) => {
      if (messages.length === 0) return;

      const lastMessage = getLastMessage(messages);
      if (!lastMessage) return;

      // Check if this is a new message
      const isNewMessage = lastMessage.msgId !== lastMessageId; // Use msgId instead of id
      if (!isNewMessage) return;

      setLastMessageId(lastMessage.msgId);

      if (isUserMessage(lastMessage)) {
        // For user messages: scroll to show the message at top with gap
        setTimeout(() => {
          const userMessageElement = document.querySelector(
            `[data-message-id="${lastMessage.msgId}"]`
          ) as HTMLElement;
          if (userMessageElement) {
            scrollToShowUserMessage(containerRef, {
              current: userMessageElement,
            });
          }
        }, 100); // Small delay to ensure DOM is updated
      } else {
        // For bot messages: scroll to bottom to show the complete response
        setTimeout(() => {
          scrollToBottom(messagesEndRef);
        }, 100);
      }
    },
    [messages, lastMessageId]
  );

  return {
    showScrollButton,
    scrollToBottomWithButton,
    handleScroll,
    shouldAutoScroll,
  };
};

/**
 * Custom hook for setting up scroll event listeners
 */
export const useScrollListener = (
  containerRef: RefObject<HTMLElement>,
  onScroll: (element: HTMLElement) => void
) => {
  useEffect(() => {
    const container = containerRef.current;
    // cleanup
    if (!container) return () => {};

    const handleScrollEvent = () => onScroll(container);

    container.addEventListener("scroll", handleScrollEvent);
    return () => {
      container.removeEventListener("scroll", handleScrollEvent);
    };
  }, [containerRef, onScroll]);
};

/**
 * Custom hook that combines all scroll functionality for chat
 */
export const useChatScrollBehavior = (
  messages: ChatMessage[],
  containerRef: RefObject<HTMLElement>,
  messagesEndRef: RefObject<HTMLElement>
) => {
  const {
    showScrollButton,
    scrollToBottomWithButton,
    handleScroll,
    shouldAutoScroll,
  } = useChatScroll(messages);

  // Set up scroll listener
  useScrollListener(containerRef, handleScroll);

  // Auto-scroll effect for new messages
  useEffect(() => {
    shouldAutoScroll(containerRef, messagesEndRef);
  }, [messages, containerRef, messagesEndRef, shouldAutoScroll]);

  return {
    showScrollButton,
    scrollToBottom: () => scrollToBottomWithButton(messagesEndRef),
  };
};
