// packages/@react-ui/src/lib/tools/textareaHelpers.ts

import { useCallback, useRef } from 'react';

/**
 * TextArea Helper Utilities
 *
 * Utilities for handling textarea-specific functionality like auto-resizing,
 * debouncing, and performance optimizations.
 */

/**
 * Performs auto-resize on a textarea element
 *
 * @param textarea - The textarea element to resize
 * @param scrollHeightRef - Ref to track previous scroll height for optimization
 * @returns void
 */
export const performTextareaResize = (
  textarea: HTMLTextAreaElement,
  scrollHeightRef: React.MutableRefObject<number | null>,
): void => {
  textarea.style.height = 'auto';
  const newScrollHeight = textarea.scrollHeight;

  // Only update if scrollHeight changed
  if (scrollHeightRef.current !== newScrollHeight) {
    textarea.style.height = `${newScrollHeight}px`;
    scrollHeightRef.current = newScrollHeight;
  }
};

/**
 * Creates a debounced function
 *
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function and cleanup function
 */
export const createDebouncedFunction = <T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): {
  debouncedFn: T;
  cleanup: () => void;
} => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debouncedFn = ((...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  }) as T;

  const cleanup = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return { debouncedFn, cleanup };
};

/**
 * Hook for creating optimized textarea resize handlers
 *
 * @returns Object with resize functions and cleanup
 */
export const useTextareaResize = (): {
  performResize: (textarea: HTMLTextAreaElement) => void;
  createDebouncedResize: (delay?: number) => (textarea: HTMLTextAreaElement) => void;
  cleanup: () => void;
} => {
  const scrollHeightRef = useRef<number | null>(null);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Memoized resize function to avoid recreations
  const performResize = useCallback((textarea: HTMLTextAreaElement) => {
    performTextareaResize(textarea, scrollHeightRef);
  }, []);

  // Create debounced resize function
  const createDebouncedResize = useCallback(
    (delay: number = 16) => {
      return (textarea: HTMLTextAreaElement) => {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }
        debounceTimeoutRef.current = setTimeout(() => {
          performResize(textarea);
        }, delay);
      };
    },
    [performResize],
  );

  // Cleanup function
  const cleanup = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  }, []);

  return {
    performResize,
    createDebouncedResize,
    cleanup,
  };
};
