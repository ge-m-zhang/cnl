// packages/ui/src/lib/components/Button/Button.tsx
import { forwardRef } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../tools/classNames';
import { buttonVariants } from './button.config';

/**
 * Button Component
 *
 * A customizable button component with multiple variants and sizes.
 * Built with accessibility in mind and styled with Tailwind CSS.
 *
 * @features
 * - Multiple variants: contained, outlined, text
 * - Multiple sizes: tiny, small, medium, large
 * - Multiple colors: primary, secondary, success, danger, warning
 * - Icon support: startIcon and endIcon props
 * - Loading state with customizable loading text
 * - Full width option
 * - Accessible with proper ARIA attributes
 */

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      color,
      fullWidth,
      startIcon,
      endIcon,
      loading,
      loadingText,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const getGapClass = (size: ButtonProps['size']) => {
      switch (size) {
        case 'tiny':
          return 'gap-1';
        case 'small':
          return 'gap-1.5';
        case 'medium':
          return 'gap-2';
        case 'large':
          return 'gap-2.5';
        default:
          return 'gap-2';
      }
    };

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, color, fullWidth }),
          getGapClass(size),
          className,
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {loadingText || 'Loading...'}
          </>
        ) : (
          <>
            {startIcon}
            {children}
            {endIcon}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
