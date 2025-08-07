import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, useId, useMemo } from 'react';
import { cn } from '../../tools/classNames';
import { createNumberInputWheelHandler } from '../../tools/formEventHelpers';

/**
 * TextField Component
 *
 * A customizable text input field with validation and helper text support.
 * Built with accessibility in mind and styled with Tailwind CSS.
 *
 * @features
 * - Multiple sizes: small, medium, large
 * - Error and success states
 * - Helper text support
 * - Symbol/icon support
 * - Full width option
 * - Accessible with proper ARIA attributes
 * - Disabled state styling
 */

const textFieldVariants = cva(
  'border rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 placeholder:text-gray-400',
  {
    variants: {
      size: {
        small: 'px-3 py-1.5 text-sm',
        medium: 'px-3 py-2 text-base',
        large: 'px-4 py-3 text-lg',
      },
      state: {
        default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
        success: 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      disabled: {
        true: 'bg-gray-50 text-gray-500 cursor-not-allowed',
        false: 'bg-white hover:border-gray-400',
      },
      hasSymbol: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        hasSymbol: true,
        size: 'small',
        className: 'pl-8',
      },
      {
        hasSymbol: true,
        size: 'medium',
        className: 'pl-9',
      },
      {
        hasSymbol: true,
        size: 'large',
        className: 'pl-11',
      },
    ],
    defaultVariants: {
      size: 'medium',
      state: 'default',
      fullWidth: false,
      disabled: false,
      hasSymbol: false,
    },
  },
);

const symbolVariants = cva(
  'absolute left-0 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500',
  {
    variants: {
      size: {
        small: 'left-2.5 text-sm',
        medium: 'left-3 text-base',
        large: 'left-3.5 text-lg',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

const helperTextVariants = cva('text-sm mt-1', {
  variants: {
    state: {
      default: 'text-gray-600',
      error: 'text-red-600',
      success: 'text-green-600',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

type TextFieldBaseProps = VariantProps<typeof textFieldVariants>;

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'disabled'>,
    Omit<TextFieldBaseProps, 'hasSymbol'> {
  error?: string;
  helperText?: string;
  symbol?: string | React.ReactNode;
  label?: string;
  hiddenLabel?: boolean;
  wrapperClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      wrapperClassName,
      size,
      state: stateProp,
      fullWidth,
      disabled,
      error,
      helperText,
      symbol,
      label,
      hiddenLabel = false,
      id,
      onWheel,
      type,
      ...props
    },
    ref,
  ) => {
    // Determine state based on error prop
    const state = error ? 'error' : stateProp || 'default';
    const hasSymbol = Boolean(symbol);

    // Generate ID if not provided
    const generatedId = useId();
    const inputId = id || `textfield-${generatedId}`;
    const helperId = useMemo(() => `${inputId}-helper`, [inputId]);
    const errorId = useMemo(() => `${inputId}-error`, [inputId]);

    // Create wheel handler for number inputs to prevent accidental value changes
    const wheelHandler = type === 'number' ? createNumberInputWheelHandler(onWheel) : onWheel;

    return (
      <div className={cn('relative', fullWidth && 'w-full', wrapperClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn('block text-sm font-medium text-gray-700 mb-1', hiddenLabel && 'sr-only')}
          >
            {label}
          </label>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Symbol */}
          {symbol && (
            <div className={symbolVariants({ size })}>
              {typeof symbol === 'string' ? <span>{symbol}</span> : symbol}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              textFieldVariants({
                size,
                state,
                fullWidth,
                disabled,
                hasSymbol,
              }),
              className,
            )}
            disabled={!!disabled}
            onWheel={wheelHandler}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              [error && errorId, helperText && !error && helperId].filter(Boolean).join(' ') ||
              undefined
            }
            {...props}
          />
        </div>

        {/* Error message */}
        {error && (
          <div id={errorId} className={helperTextVariants({ state: 'error' })}>
            {error}
          </div>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <div id={helperId} className={helperTextVariants({ state })}>
            {helperText}
          </div>
        )}
      </div>
    );
  },
);

TextField.displayName = 'TextField';

// Predefined TextField variants for common use cases
export const EmailField = forwardRef<HTMLInputElement, Omit<TextFieldProps, 'type'>>(
  (props, ref) => <TextField ref={ref} type="email" autoComplete="email" {...props} />,
);

EmailField.displayName = 'EmailField';

export const PasswordField = forwardRef<HTMLInputElement, Omit<TextFieldProps, 'type'>>(
  (props, ref) => (
    <TextField ref={ref} type="password" autoComplete="current-password" {...props} />
  ),
);

PasswordField.displayName = 'PasswordField';

export const NumberField = forwardRef<HTMLInputElement, Omit<TextFieldProps, 'type'>>(
  (props, ref) => <TextField ref={ref} type="number" {...props} />,
);

NumberField.displayName = 'NumberField';

export const SearchField = forwardRef<HTMLInputElement, Omit<TextFieldProps, 'type'>>(
  ({ symbol = '🔍', ...props }, ref) => (
    <TextField ref={ref} type="search" symbol={symbol} {...props} />
  ),
);

SearchField.displayName = 'SearchField';
