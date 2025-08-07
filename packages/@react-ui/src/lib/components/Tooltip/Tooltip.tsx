import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react';
import { cn } from '../../tools/classNames';
import ReactDOM from 'react-dom';

/**
 * Tooltip Component
 *
 * A flexible tooltip component with multiple variants and positioning options.
 * Built with accessibility in mind and styled with Tailwind CSS.
 *
 * @features
 * - Multiple variants: light, dark, label
 * - Multiple placements: top, bottom, left, right (with start/end modifiers)
 * - Arrow support
 * - Delay control
 * - Trigger modes: hover, focus, click, manual
 * - Accessible with proper ARIA attributes
 * - Portal rendering for proper z-index layering
 */

type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

// Constants for better maintainability
const VIEWPORT_MARGIN = 8; // Minimum distance from viewport edges

const tooltipVariants = cva(
  'absolute z-50 px-3 py-2 text-sm rounded-md shadow-lg transition-opacity duration-200 pointer-events-none',
  {
    variants: {
      variant: {
        light: 'bg-white text-gray-900 border border-gray-200',
        dark: 'bg-gray-900 text-white',
        label: 'bg-white text-gray-900 border border-gray-300 shadow-xl px-3 py-2 text-base',
      },
      visible: {
        true: 'opacity-100',
        false: 'opacity-0 pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'dark',
      visible: false,
    },
  },
);

const arrowVariants = cva('absolute w-2 h-2 transform rotate-45', {
  variants: {
    variant: {
      light: 'bg-white border border-gray-200',
      dark: 'bg-gray-900',
      label: 'bg-white border border-gray-300',
    },
    placement: {
      top: '-bottom-1 left-1/2 -translate-x-1/2',
      'top-start': '-bottom-1 left-2',
      'top-end': '-bottom-1 right-2',
      bottom: '-top-1 left-1/2 -translate-x-1/2',
      'bottom-start': '-top-1 left-2',
      'bottom-end': '-top-1 right-2',
      left: '-right-1 top-1/2 -translate-y-1/2',
      'left-start': '-right-1 top-2',
      'left-end': '-right-1 bottom-2',
      right: '-left-1 top-1/2 -translate-y-1/2',
      'right-start': '-left-1 top-2',
      'right-end': '-left-1 bottom-2',
    },
  },
  defaultVariants: {
    variant: 'dark',
    placement: 'top',
  },
});

type TooltipBaseProps = VariantProps<typeof tooltipVariants>;

export interface TooltipProps extends Omit<TooltipBaseProps, 'visible'> {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: TooltipPlacement;
  arrow?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  delay?: number;
  hideDelay?: number;
  trigger?: 'hover' | 'focus' | 'click' | 'manual';
  disableFocusListener?: boolean;
  disableHoverListener?: boolean;
  disableTouchListener?: boolean;
  onOpenChange?: (open: boolean) => void;
  tooltipProps?: React.HTMLAttributes<HTMLDivElement>;
}

// Custom positioning implementation provides basic tooltip positioning
// with full control over behavior and minimal dependencies.
// For advanced features like collision detection and auto-flipping,
// @floating-ui/react could be considered as a future enhancement.
const getTooltipPosition = (
  trigger: HTMLElement,
  tooltip: HTMLElement,
  placement: TooltipPlacement,
) => {
  const triggerRect = trigger.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  let top = 0;
  let left = 0;

  const offset = 8; // Distance from trigger

  switch (placement) {
    case 'top':
      top = triggerRect.top + scrollY - tooltipRect.height - offset;
      left = triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2;
      break;
    case 'top-start':
      top = triggerRect.top + scrollY - tooltipRect.height - offset;
      left = triggerRect.left + scrollX;
      break;
    case 'top-end':
      top = triggerRect.top + scrollY - tooltipRect.height - offset;
      left = triggerRect.right + scrollX - tooltipRect.width;
      break;
    case 'bottom':
      top = triggerRect.bottom + scrollY + offset;
      left = triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2;
      break;
    case 'bottom-start':
      top = triggerRect.bottom + scrollY + offset;
      left = triggerRect.left + scrollX;
      break;
    case 'bottom-end':
      top = triggerRect.bottom + scrollY + offset;
      left = triggerRect.right + scrollX - tooltipRect.width;
      break;
    case 'left':
      top = triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2;
      left = triggerRect.left + scrollX - tooltipRect.width - offset;
      break;
    case 'left-start':
      top = triggerRect.top + scrollY;
      left = triggerRect.left + scrollX - tooltipRect.width - offset;
      break;
    case 'left-end':
      top = triggerRect.bottom + scrollY - tooltipRect.height;
      left = triggerRect.left + scrollX - tooltipRect.width - offset;
      break;
    case 'right':
      top = triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2;
      left = triggerRect.right + scrollX + offset;
      break;
    case 'right-start':
      top = triggerRect.top + scrollY;
      left = triggerRect.right + scrollX + offset;
      break;
    case 'right-end':
      top = triggerRect.bottom + scrollY - tooltipRect.height;
      left = triggerRect.right + scrollX + offset;
      break;
  }

  // Keep tooltip within viewport bounds
  top = Math.max(
    VIEWPORT_MARGIN,
    Math.min(top, viewportHeight + scrollY - tooltipRect.height - VIEWPORT_MARGIN),
  );
  left = Math.max(
    VIEWPORT_MARGIN,
    Math.min(left, viewportWidth + scrollX - tooltipRect.width - VIEWPORT_MARGIN),
  );

  return { top, left };
};

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      variant = 'dark',
      placement = 'top',
      arrow = false,
      open: controlledOpen,
      defaultOpen = false,
      delay = 0,
      hideDelay = 0,
      trigger = 'hover',
      disableFocusListener = false,
      disableHoverListener = false,
      disableTouchListener = false,
      onOpenChange,
      tooltipProps,
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const [mounted, setMounted] = useState(false);
    // Generate a unique ID for accessibility and ARIA attributes
    const tooltipId = `tooltip-${useId()}`;
    const triggerRef = useRef<HTMLElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const setOpen = (open: boolean) => {
      // React 18+ handles unmounted component state updates internally
      if (!isControlled) {
        setInternalOpen(open);
      }
      onOpenChange?.(open);
    };

    const showTooltip = () => {
      // Clear any pending hide timeout
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = undefined;
      }

      if (delay > 0) {
        timeoutRef.current = setTimeout(() => {
          setOpen(true);
        }, delay);
      } else {
        setOpen(true);
      }
    };

    const hideTooltip = () => {
      // Clear any pending show timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }

      if (hideDelay > 0) {
        hideTimeoutRef.current = setTimeout(() => {
          setOpen(false);
        }, hideDelay);
      } else {
        setOpen(false);
      }
    };

    // Position tooltip
    useEffect(() => {
      if (isOpen && triggerRef.current && tooltipRef.current) {
        const { top, left } = getTooltipPosition(triggerRef.current, tooltipRef.current, placement);
        tooltipRef.current.style.top = `${top}px`;
        tooltipRef.current.style.left = `${left}px`;
      }
    }, [isOpen, placement]);

    // Mount effect with proper cleanup
    useEffect(() => {
      setMounted(true);

      return () => {
        // Clear any pending timeouts - this is the proper cleanup approach
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = undefined;
        }
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = undefined;
        }
      };
    }, []);

    if (!mounted) {
      return <>{children}</>;
    }

    const triggerHandlers: React.HTMLAttributes<HTMLElement> = {};

    if (trigger === 'hover' && !disableHoverListener) {
      triggerHandlers.onMouseEnter = showTooltip;
      triggerHandlers.onMouseLeave = hideTooltip;
    }

    if (trigger === 'focus' && !disableFocusListener) {
      triggerHandlers.onFocus = showTooltip;
      triggerHandlers.onBlur = hideTooltip;
    }

    if (trigger === 'click') {
      triggerHandlers.onClick = () => setOpen(!isOpen);
    }

    if (!disableTouchListener) {
      triggerHandlers.onTouchStart = showTooltip;
    }

    return (
      <>
        {/* Trigger element */}
        {React.cloneElement(children as React.ReactElement, {
          ref: triggerRef,
          ...triggerHandlers,
          'aria-describedby': isOpen ? tooltipId : undefined,
        })}

        {/* Tooltip portal - ReactDOM.createPortal for proper layering */}
        {mounted &&
          isOpen &&
          ReactDOM.createPortal(
            <div
              ref={(node) => {
                (tooltipRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                if (typeof ref === 'function') {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
              }}
              id={tooltipId}
              role="tooltip"
              className={cn(tooltipVariants({ variant, visible: isOpen }))}
              style={{ position: 'absolute' }}
              {...tooltipProps}
            >
              {content}
              {arrow && <div className={cn(arrowVariants({ variant, placement }))} />}
            </div>,
            document.body,
          )}
      </>
    );
  },
);

Tooltip.displayName = 'Tooltip';

// Convenience components
export const LightTooltip = (props: Omit<TooltipProps, 'variant'>) => (
  <Tooltip variant="light" {...props} />
);

export const DarkTooltip = (props: Omit<TooltipProps, 'variant'>) => (
  <Tooltip variant="dark" {...props} />
);

export const LabelTooltip = (props: Omit<TooltipProps, 'variant'>) => (
  <Tooltip variant="label" {...props} />
);
