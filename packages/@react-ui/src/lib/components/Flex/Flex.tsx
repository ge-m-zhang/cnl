import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../../tools/classNames';

const flexVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
      reverse: 'flex-wrap-reverse',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-8',
      xl: 'gap-12',
      '2xl': 'gap-16',
      '3xl': 'gap-24',
    },
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

    // flex item properties
    grow: {
      0: 'flex-grow-0',
      1: 'flex-grow',
    },
    shrink: {
      0: 'flex-shrink-0',
      1: 'flex-shrink',
    },
  },
  defaultVariants: {
    direction: 'row',
    align: 'stretch',
    justify: 'start',
    wrap: false,
    gap: 'none',
    width: 'auto',
    height: 'auto',
  },
});

type FlexBaseProps = VariantProps<typeof flexVariants>;

export interface FlexProps extends Omit<React.HTMLAttributes<HTMLElement>, 'as'>, FlexBaseProps {
  as?: keyof JSX.IntrinsicElements;
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    { className, direction, align, justify, wrap, gap, width, height, grow, shrink, as, ...props },
    ref,
  ) => {
    const Component = as || 'div';
    const elementProps = {
      ref: ref as React.Ref<HTMLDivElement>,
      className: cn(
        flexVariants({ direction, align, justify, wrap, gap, width, height, grow, shrink }),
        className,
      ),
      ...props,
    };

    return React.createElement(Component, elementProps);
  },
);

Flex.displayName = 'Flex';
