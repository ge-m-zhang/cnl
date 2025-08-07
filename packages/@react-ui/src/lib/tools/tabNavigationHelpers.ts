// packages/@react-ui/src/lib/tools/tabNavigationHelpers.ts

import React from 'react';

/**
 * Tab Navigation Helpers
 *
 * Utilities for handling keyboard navigation in tab components.
 * These functions provide consistent navigation behavior across tab implementations.
 */

export interface TabInfo {
  value: string;
  disabled: boolean;
}

/**
 * Extracts tab information from React children elements
 *
 * @param children - React children containing tab elements
 * @returns Array of tab information objects
 */
export const getTabInfo = (children: React.ReactNode): TabInfo[] => {
  const tabInfo: TabInfo[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.props.value) {
      tabInfo.push({
        value: child.props.value,
        disabled: Boolean(child.props.disabled),
      });
    }
  });
  return tabInfo;
};

/**
 * Finds the next enabled tab in the specified direction
 *
 * @param tabInfo - Array of tab information
 * @param startIndex - Starting index to search from
 * @param direction - Direction to search ('forward' or 'backward')
 * @returns Index of the next enabled tab, or startIndex if none found
 */
export const findNextEnabledTab = (
  tabInfo: TabInfo[],
  startIndex: number,
  direction: 'forward' | 'backward',
): number => {
  let idx = startIndex;
  for (let i = 0; i < tabInfo.length; i++) {
    if (direction === 'forward') {
      idx = (idx + 1) % tabInfo.length;
    } else {
      idx = (idx - 1 + tabInfo.length) % tabInfo.length;
    }
    if (!tabInfo[idx].disabled) {
      return idx;
    }
  }
  return startIndex;
};

/**
 * Finds the first or last enabled tab
 *
 * @param tabInfo - Array of tab information
 * @param fromStart - If true, finds first enabled tab; if false, finds last enabled tab
 * @param currentIndex - Current tab index (fallback if all tabs are disabled)
 * @returns Index of the enabled tab at the specified end
 */
export const findEnabledTabAtEnd = (
  tabInfo: TabInfo[],
  fromStart: boolean,
  currentIndex: number,
): number => {
  const enabledIndex = fromStart
    ? tabInfo.findIndex((tab) => !tab.disabled)
    : tabInfo
        .slice()
        .reverse()
        .findIndex((tab) => !tab.disabled);

  if (enabledIndex === -1) return currentIndex; // Fallback if all disabled

  // For reversed search, convert back to original index
  return fromStart ? enabledIndex : tabInfo.length - 1 - enabledIndex;
};

/**
 * Handles keyboard navigation for tab components
 *
 * @param event - Keyboard event
 * @param tabInfo - Array of tab information
 * @param currentValue - Current active tab value
 * @param orientation - Tab orientation ('horizontal' or 'vertical')
 * @param onNavigate - Callback when navigation occurs
 */
export const handleTabKeyboardNavigation = (
  event: React.KeyboardEvent,
  tabInfo: TabInfo[],
  currentValue: string,
  orientation: 'horizontal' | 'vertical',
  onNavigate: (newValue: string) => void,
): void => {
  const currentIndex = tabInfo.findIndex((tab) => tab.value === currentValue);

  if (currentIndex === -1) return;

  let nextIndex = currentIndex;
  let shouldPreventDefault = false;

  switch (event.key) {
    case 'ArrowRight':
      if (orientation === 'horizontal') {
        nextIndex = findNextEnabledTab(tabInfo, currentIndex, 'forward');
        shouldPreventDefault = true;
      }
      break;
    case 'ArrowLeft':
      if (orientation === 'horizontal') {
        nextIndex = findNextEnabledTab(tabInfo, currentIndex, 'backward');
        shouldPreventDefault = true;
      }
      break;
    case 'ArrowDown':
      if (orientation === 'vertical') {
        nextIndex = findNextEnabledTab(tabInfo, currentIndex, 'forward');
        shouldPreventDefault = true;
      }
      break;
    case 'ArrowUp':
      if (orientation === 'vertical') {
        nextIndex = findNextEnabledTab(tabInfo, currentIndex, 'backward');
        shouldPreventDefault = true;
      }
      break;
    case 'Home':
      nextIndex = findEnabledTabAtEnd(tabInfo, true, currentIndex);
      shouldPreventDefault = true;
      break;
    case 'End':
      nextIndex = findEnabledTabAtEnd(tabInfo, false, currentIndex);
      shouldPreventDefault = true;
      break;
  }

  if (shouldPreventDefault && nextIndex !== currentIndex) {
    event.preventDefault();
    const newValue = tabInfo[nextIndex].value;
    onNavigate(newValue);

    // Focus the new tab
    setTimeout(() => {
      // Sanitize newValue before using it in DOM queries to prevent XSS attacks
      const safeValue = CSS.escape(newValue);
      const newTab = document.getElementById(`tab-${safeValue}`);
      newTab?.focus();
    }, 0);
  }
};
