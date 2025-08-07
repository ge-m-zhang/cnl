import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, useRef, useState } from 'react';
import { cn } from '../../tools/classNames';

/**
 * Checkbox Component
 *
 * A customizable checkbox component with multiple sizes and colors.
 * Built with accessibility in mind and styled with Tailwind CSS.
 *
 * @features
 * - Multiple sizes: small, medium
 * - Multiple colors: primary, secondary, success, danger, warning
 * - Custom icon support
 * - Controlled and uncontrolled modes
 * - Indeterminate state support
 * - Accessible with proper ARIA attributes
 */

const checkboxVariants = cva(
  'relative inline-flex items-center justify-center border-2 rounded-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      size: {
        small: 'w-4 h-4',
        medium: 'w-5 h-5',
      },
      color: {
        primary: 'focus:ring-blue-500',
        secondary: 'focus:ring-gray-500',
        success: 'focus:ring-green-500',
        danger: 'focus:ring-red-500',
        warning: 'focus:ring-yellow-500',
      },
      checked: {
        true: '',
        false: '',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: 'hover:border-opacity-80',
      },
    },
    compoundVariants: [
      // Unchecked states
      {
        checked: false,
        color: 'primary',
        className: 'border-gray-400 bg-white',
      },
      {
        checked: false,
        color: 'secondary',
        className: 'border-gray-400 bg-white',
      },
      {
        checked: false,
        color: 'success',
        className: 'border-gray-400 bg-white',
      },
      {
        checked: false,
        color: 'danger',
        className: 'border-gray-400 bg-white',
      },
      {
        checked: false,
        color: 'warning',
        className: 'border-gray-400 bg-white',
      },
      // Checked states
      {
        checked: true,
        color: 'primary',
        className: 'border-blue-500 bg-blue-500',
      },
      {
        checked: true,
        color: 'secondary',
        className: 'border-gray-500 bg-gray-500',
      },
      {
        checked: true,
        color: 'success',
        className: 'border-green-500 bg-green-500',
      },
      {
        checked: true,
        color: 'danger',
        className: 'border-red-500 bg-red-500',
      },
      {
        checked: true,
        color: 'warning',
        className: 'border-yellow-500 bg-yellow-500',
      },
    ],
    defaultVariants: {
      size: 'medium',
      color: 'primary',
      checked: false,
      disabled: false,
    },
  },
);

const checkboxIconVariants = cva('transition-all duration-200', {
  variants: {
    size: {
      small: 'w-2.5 h-2.5',
      medium: 'w-3 h-3',
    },
    visible: {
      true: 'opacity-100 scale-100',
      false: 'opacity-0 scale-75',
    },
  },
  defaultVariants: {
    size: 'medium',
    visible: false,
  },
});

type CheckboxBaseProps = VariantProps<typeof checkboxVariants>;

export interface CheckboxProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'size' | 'color' | 'checked' | 'disabled'
    >,
    CheckboxBaseProps {
  icon?: React.ReactNode;
  indeterminate?: boolean;
}

// Default check icon
const DefaultCheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

// Indeterminate icon
const IndeterminateIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size,
      color,
      checked: checkedProp,
      disabled,
      icon,
      indeterminate = false,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [internalChecked, setInternalChecked] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Use controlled or uncontrolled state - pure derived state handles prop changes automatically
    const checked = checkedProp !== undefined ? checkedProp : internalChecked;

    const handleCheckboxClick = (event: React.SyntheticEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (!disabled && inputRef.current) {
        // Trigger the actual input click which will handle state updates and onChange callback
        inputRef.current.click();
      }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;

      // Update internal state only in uncontrolled mode
      if (checkedProp === undefined) {
        setInternalChecked(newChecked);
      }

      // Call onChange callback once with the real event
      onChange?.(event);
    };

    // Helper function to determine which icon to show - clearer than nested ternary
    const getIconToShow = () => {
      if (indeterminate) {
        return <IndeterminateIcon className="text-white" />;
      } else if (icon) {
        return React.cloneElement(icon as React.ReactElement, { className: 'text-white' });
      } else {
        return <DefaultCheckIcon className="text-white" />;
      }
    };

    return (
      <div className="inline-flex items-center">
        <div
          className={cn(
            checkboxVariants({
              size,
              color,
              checked: checked || indeterminate,
              disabled,
            }),
            className,
          )}
          onClick={handleCheckboxClick}
          role="checkbox"
          aria-checked={indeterminate ? 'mixed' : checked ? 'true' : 'false'}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === ' ') {
              e.preventDefault();
              handleCheckboxClick(e);
            }
          }}
        >
          <input
            ref={(node) => {
              (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            type="checkbox"
            className="sr-only"
            checked={!!checked}
            disabled={!!disabled}
            onChange={handleInputChange}
            aria-hidden="true"
            tabIndex={-1}
            {...props}
          />
          <span
            className={cn(
              checkboxIconVariants({
                size,
                visible: checked || indeterminate,
              }),
            )}
          >
            {getIconToShow()}
          </span>
        </div>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
