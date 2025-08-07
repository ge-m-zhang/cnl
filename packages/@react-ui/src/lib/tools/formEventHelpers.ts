import React from 'react';

/**
 * Form Event Helpers
 *
 * Utilities for creating synthetic form events in custom components.
 * These helpers ensure consistent event handling across form components
 * like Switch, Checkbox, Radio, etc.
 */

/**
 * Creates a synthetic ChangeEvent for form inputs.
 * This is useful when programmatically triggering change events
 * from custom UI components that wrap native inputs.
 *
 * @param originalEvent - The original DOM event (MouseEvent, KeyboardEvent, etc.)
 * @param inputElement - The input element reference
 * @param newValue - The new value for the input
 * @returns A synthetic React ChangeEvent
 *
 * @example
 * ```tsx
 * const handleClick = (event: React.MouseEvent) => {
 *   const syntheticEvent = createSyntheticChangeEvent(
 *     event,
 *     inputRef.current,
 *     { checked: !checked }
 *   );
 *   onChange?.(syntheticEvent);
 * };
 * ```
 */
export const createSyntheticChangeEvent = <T extends HTMLInputElement>(
  originalEvent: React.SyntheticEvent,
  inputElement: T | null,
  newValue: Partial<Pick<T, 'value' | 'checked'>>,
): React.ChangeEvent<T> => {
  if (!inputElement) {
    throw new Error(
      'Cannot create synthetic change event: input element reference is not available',
    );
  }

  // Create a synthetic event that mimics a real ChangeEvent
  const syntheticEvent = {
    ...originalEvent,
    target: {
      ...inputElement,
      ...newValue,
    },
    currentTarget: inputElement,
  } as React.ChangeEvent<T>;

  return syntheticEvent;
};

/**
 * Creates a synthetic ChangeEvent specifically for checkbox/switch inputs.
 * This is a convenience wrapper around createSyntheticChangeEvent for boolean inputs.
 *
 * @param originalEvent - The original DOM event
 * @param inputElement - The input element reference
 * @param checked - The new checked state
 * @returns A synthetic React ChangeEvent
 */
export const createSyntheticCheckboxChangeEvent = (
  originalEvent: React.SyntheticEvent,
  inputElement: HTMLInputElement | null,
  checked: boolean,
): React.ChangeEvent<HTMLInputElement> => {
  return createSyntheticChangeEvent(originalEvent, inputElement, { checked });
};

/**
 * Creates a synthetic ChangeEvent specifically for text/value inputs.
 * This is a convenience wrapper around createSyntheticChangeEvent for value-based inputs.
 *
 * @param originalEvent - The original DOM event
 * @param inputElement - The input element reference
 * @param value - The new value
 * @returns A synthetic React ChangeEvent
 */
export const createSyntheticValueChangeEvent = (
  originalEvent: React.SyntheticEvent,
  inputElement: HTMLInputElement | null,
  value: string,
): React.ChangeEvent<HTMLInputElement> => {
  return createSyntheticChangeEvent(originalEvent, inputElement, { value });
};

/**
 * Creates a wheel event handler for number inputs that prevents accidental value changes.
 *
 * When users scroll over a number input, browsers by default increment/decrement the value.
 * This helper prevents that behavior while allowing normal page scrolling and preserving focus.
 *
 * @param onWheel - Optional original wheel event handler to call after preventing default
 * @returns A wheel event handler that prevents number input value changes
 *
 * @example
 * ```tsx
 * <input
 *   type="number"
 *   onWheel={createNumberInputWheelHandler(originalOnWheel)}
 * />
 * ```
 */
export const createNumberInputWheelHandler = (
  onWheel?: React.WheelEventHandler<HTMLInputElement>,
): React.WheelEventHandler<HTMLInputElement> => {
  return (e: React.WheelEvent<HTMLInputElement>) => {
    // Prevent the number value from changing, but don't blur the input
    // This allows users to scroll past the input without losing focus or changing values
    e.preventDefault();
    onWheel?.(e);
  };
};
