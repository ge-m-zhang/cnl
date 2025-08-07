import { cva, type VariantProps } from 'class-variance-authority';
import React, { createContext, forwardRef, useContext, useRef, useState } from 'react';
import { cn } from '../../tools/classNames';

/**
 * Switch Component
 *
 * A toggle switch component with multiple sizes and colors.
 * Built with accessibility in mind and styled with Tailwind CSS.
 *
 * @features
 * - Multiple sizes: small, medium
 * - Multiple colors: primary, secondary, success, danger, warning
 * - Controlled and uncontrolled modes
 * - Smooth transition animations
 * - Accessible with proper ARIA attributes
 */

// Context for sharing state between switch components
interface SwitchContextValue {
  size: 'small' | 'medium';
  color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  checked: boolean;
  disabled: boolean;
}

const SwitchContext = createContext<SwitchContextValue>({
  size: 'medium',
  color: 'primary',
  checked: false,
  disabled: false,
});

// Switch container variants
const switchContainerVariants = cva(
  'relative inline-flex items-center border-2 rounded-full transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      size: {
        small: 'h-4 w-7',
        medium: 'h-5 w-9',
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
        false: '',
      },
    },
    compoundVariants: [
      // Unchecked states
      {
        checked: false,
        disabled: false,
        className: 'bg-white border-gray-300',
      },
      {
        checked: false,
        disabled: true,
        className: 'bg-gray-100 border-gray-200',
      },
      // Checked states - primary
      {
        checked: true,
        color: 'primary',
        disabled: false,
        className: 'bg-blue-500 border-blue-500',
      },
      {
        checked: true,
        color: 'primary',
        disabled: true,
        className: 'bg-blue-300 border-blue-300',
      },
      // Checked states - secondary
      {
        checked: true,
        color: 'secondary',
        disabled: false,
        className: 'bg-gray-500 border-gray-500',
      },
      {
        checked: true,
        color: 'secondary',
        disabled: true,
        className: 'bg-gray-300 border-gray-300',
      },
      // Checked states - success
      {
        checked: true,
        color: 'success',
        disabled: false,
        className: 'bg-green-500 border-green-500',
      },
      {
        checked: true,
        color: 'success',
        disabled: true,
        className: 'bg-green-300 border-green-300',
      },
      // Checked states - danger
      {
        checked: true,
        color: 'danger',
        disabled: false,
        className: 'bg-red-500 border-red-500',
      },
      {
        checked: true,
        color: 'danger',
        disabled: true,
        className: 'bg-red-300 border-red-300',
      },
      // Checked states - warning
      {
        checked: true,
        color: 'warning',
        disabled: false,
        className: 'bg-yellow-500 border-yellow-500',
      },
      {
        checked: true,
        color: 'warning',
        disabled: true,
        className: 'bg-yellow-300 border-yellow-300',
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

// Switch slider variants
const switchSliderVariants = cva(
  'absolute left-0 rounded-full transition-transform duration-200 ease-in-out',
  {
    variants: {
      size: {
        small: 'w-3 h-3 m-0.5',
        medium: 'w-4 h-4 m-0.5',
      },
      checked: {
        true: '',
        false: '',
      },
      disabled: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Unchecked states
      {
        checked: false,
        disabled: false,
        className: 'bg-gray-400 transform translate-x-0',
      },
      {
        checked: false,
        disabled: true,
        className: 'bg-gray-300 transform translate-x-0',
      },
      // Checked states
      {
        checked: true,
        size: 'small',
        disabled: false,
        className: 'bg-white transform translate-x-3',
      },
      {
        checked: true,
        size: 'medium',
        disabled: false,
        className: 'bg-white transform translate-x-4',
      },
      {
        checked: true,
        disabled: true,
        className: 'bg-white transform',
      },
      // Checked disabled with size variants for transform
      {
        checked: true,
        size: 'small',
        disabled: true,
        className: 'translate-x-3',
      },
      {
        checked: true,
        size: 'medium',
        disabled: true,
        className: 'translate-x-4',
      },
    ],
    defaultVariants: {
      size: 'medium',
      checked: false,
      disabled: false,
    },
  },
);

// Container component
const SwitchContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { size, color, checked, disabled } = useContext(SwitchContext);

    return (
      <div
        ref={ref}
        className={cn(switchContainerVariants({ size, color, checked, disabled }), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

SwitchContainer.displayName = 'SwitchContainer';

// Slider component
const SwitchSlider = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { size, checked, disabled } = useContext(SwitchContext);

    return (
      <div
        ref={ref}
        className={cn(switchSliderVariants({ size, checked, disabled }), className)}
        {...props}
      />
    );
  },
);

SwitchSlider.displayName = 'SwitchSlider';

// Main Switch component
type SwitchBaseProps = VariantProps<typeof switchContainerVariants>;

export interface SwitchProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'size' | 'color' | 'checked' | 'disabled'
    >,
    SwitchBaseProps {}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      size = 'medium',
      color = 'primary',
      checked: checkedProp,
      disabled = false,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [internalChecked, setInternalChecked] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Use controlled or uncontrolled state - pure derived state handles prop changes automatically
    const checked = checkedProp !== undefined ? checkedProp : internalChecked;

    const handleSwitchClick = (event: React.SyntheticEvent<HTMLDivElement>) => {
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

    return (
      <div className="inline-flex items-center">
        <SwitchContext.Provider
          value={{
            size: size ?? 'medium',
            color: color ?? 'primary',
            checked: !!checked,
            disabled: !!disabled,
          }}
        >
          <SwitchContainer
            onClick={handleSwitchClick}
            role="switch"
            aria-checked={!!checked}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === ' ') {
                e.preventDefault();
                handleSwitchClick(e);
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
            <SwitchSlider />
          </SwitchContainer>
        </SwitchContext.Provider>
      </div>
    );
  },
);

Switch.displayName = 'Switch';
