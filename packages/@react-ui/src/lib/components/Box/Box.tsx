import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../../tools/classNames';

/**
 * Box Component
 *
 * A versatile box component that provides layout, spacing, and styling utilities.
 * Built with accessibility in mind and styled with Tailwind CSS.
 *
 * @features
 * - Multiple display options: block, inline, flex, grid
 * - Responsive padding and margin
 * - Flexible sizing: width and height
 * - Background color options
 * - Border styles and rounded corners
 * - Shadow effects
 * - Positioning utilities: static, relative, absolute, fixed, sticky
 */

const boxVariants = cva('', {
  variants: {
    // Layout
    display: {
      block: 'block',
      inline: 'inline',
      'inline-block': 'inline-block',
      flex: 'flex',
      grid: 'grid',
      none: 'hidden',
    },
    // Spacing
    padding: {
      none: 'p-0',
      sm: 'p-2 md:p-3', // Responsive padding
      md: 'p-4 md:p-6',
      lg: 'p-6 md:p-8',
      xl: 'p-8 md:p-12',
      '2xl': 'p-12 md:p-16',
    },
    margin: {
      none: 'm-0',
      xs: 'm-1',
      sm: 'm-2',
      md: 'm-4',
      lg: 'm-6',
      xl: 'm-8',
      '2xl': 'm-12',
    },
    // Sizing
    width: {
      full: 'w-full',
      auto: 'w-auto',
      fit: 'w-fit',
      // Common fractions
      '1/2': 'w-1/2',
      '1/3': 'w-1/3',
      '2/3': 'w-2/3',
      '1/4': 'w-1/4',
      '3/4': 'w-3/4',
    },
    height: {
      full: 'h-full',
      auto: 'h-auto',
      fit: 'h-fit',
      screen: 'h-screen',
      // Common fractions
      '1/2': 'h-1/2',
      '1/3': 'h-1/3',
      '2/3': 'h-2/3',
      '1/4': 'h-1/4',
      '3/4': 'h-3/4',
    },
    // Background
    background: {
      transparent: 'bg-transparent',
      white: 'bg-white',
      black: 'bg-black',
      gray: 'bg-gray-100',
      primary: 'bg-blue-500',
      secondary: 'bg-gray-200',
      success: 'bg-green-200',
      danger: 'bg-red-400',
      warning: 'bg-yellow-300',
    },
    // Border
    border: {
      none: 'border-0',
      thin: 'border',
      medium: 'border-2',
      thick: 'border-4',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
    // Shadow
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    },
    // Position
    position: {
      static: 'static',
      relative: 'relative',
      absolute: 'absolute',
      fixed: 'fixed',
      sticky: 'sticky',
    },
  },
  defaultVariants: {
    display: 'block',
    padding: 'none',
    margin: 'none',
    width: 'auto',
    height: 'auto',
    background: 'transparent',
    border: 'none',
    rounded: 'none',
    shadow: 'none',
    position: 'static',
  },
});

type BoxBaseProps = VariantProps<typeof boxVariants>;

export interface BoxProps extends Omit<React.HTMLAttributes<HTMLElement>, 'as'>, BoxBaseProps {
  as?: keyof JSX.IntrinsicElements;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      display,
      padding,
      margin,
      width,
      height,
      background,
      border,
      rounded,
      shadow,
      position,
      as,
      ...props
    },
    ref,
  ) => {
    const Component = as || 'div';
    const elementProps = {
      ref,
      className: cn(
        boxVariants({
          display,
          padding,
          margin,
          width,
          height,
          background,
          border,
          rounded,
          shadow,
          position,
        }),
        className,
      ),
      ...props,
    };

    return React.createElement(Component, elementProps);
  },
);

Box.displayName = 'Box';

export type { BoxBaseProps };
