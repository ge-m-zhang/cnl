import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef } from 'react';
import { cn } from '../../tools/classNames';

/**
 * Spinner Component
 *
 * A loading spinner component with multiple sizes and colors.
 * Built with accessibility in mind and styled with Tailwind CSS.
 *
 * @features
 * - Multiple sizes: small, medium, large
 * - Multiple colors: primary, secondary, success, danger, warning
 * - Custom empty color for contrast
 * - Accessible with proper ARIA attributes
 * - Smooth rotation animation
 */

const spinnerVariants = cva(
  'inline-block animate-spin rounded-full border-solid border-t-transparent border-l-transparent',
  {
    variants: {
      size: {
        small: 'w-4 h-4 border-2',
        medium: 'w-8 h-8 border-2',
        large: 'w-12 h-12 border-4',
      },
      color: {
        primary: 'border-blue-500',
        secondary: 'border-gray-500',
        success: 'border-green-500',
        danger: 'border-red-500',
        warning: 'border-yellow-500',
        white: 'border-white',
      },
      emptyColor: {
        primary: 'border-t-blue-200 border-l-blue-200',
        secondary: 'border-t-gray-200 border-l-gray-200',
        success: 'border-t-green-200 border-l-green-200',
        danger: 'border-t-red-200 border-l-red-200',
        warning: 'border-t-yellow-200 border-l-yellow-200',
        white: 'border-t-white/30 border-l-white/30',
        transparent: 'border-t-transparent border-l-transparent',
      },
    },
    defaultVariants: {
      size: 'medium',
      color: 'primary',
      emptyColor: 'transparent',
    },
  },
);

type SpinnerBaseProps = VariantProps<typeof spinnerVariants>;

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    SpinnerBaseProps {
  /**
   * Custom label for screen readers
   */
  label?: string;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, color, emptyColor, label = 'Loading...', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(spinnerVariants({ size, color, emptyColor }), className)}
        role="status"
        aria-label={label}
        {...props}
      >
        <span className="sr-only">{label}</span>
      </div>
    );
  },
);

Spinner.displayName = 'Spinner';

// Predefined spinner variants for common use cases
export const SpinnerWithText = ({
  text = 'Loading...',
  position = 'right',
  ...spinnerProps
}: SpinnerProps & {
  text?: string;
  position?: 'left' | 'right' | 'top' | 'bottom';
}) => {
  const flexDirection = {
    left: 'flex-row-reverse',
    right: 'flex-row',
    top: 'flex-col-reverse',
    bottom: 'flex-col',
  };

  const gap = {
    left: 'gap-3',
    right: 'gap-3',
    top: 'gap-2',
    bottom: 'gap-2',
  };

  return (
    <div className={cn('inline-flex items-center', flexDirection[position], gap[position])}>
      <Spinner {...spinnerProps} />
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  );
};

// Button spinner for loading states
export const ButtonSpinner = ({ className, ...props }: Omit<SpinnerProps, 'size'>) => {
  return <Spinner size="small" className={cn('mr-2', className)} label="Loading" {...props} />;
};
