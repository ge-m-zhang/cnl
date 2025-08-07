// packages/@react-ui/src/lib/tools/styleHelpers.ts

import React from 'react';

type ResizableType = 'horizontal' | 'vertical' | boolean | null;

/**
 * Consolidates resize style logic for TextArea components
 *
 * @param autoResize - Whether auto-resize is enabled
 * @param resizable - The resize configuration ('horizontal', 'vertical', true, false, or undefined)
 * @returns CSS properties object with appropriate resize styles
 */
export const getResizeStyle = (
  autoResize: boolean,
  resizable?: ResizableType,
): React.CSSProperties => {
  if (autoResize) {
    return {};
  }

  switch (resizable) {
    case 'horizontal':
      return { resize: 'horizontal' };
    case 'vertical':
      return { resize: 'vertical' };
    case true:
      return { resize: 'both' };
    case false:
      return { resize: 'none' };
    default:
      return {};
  }
};
