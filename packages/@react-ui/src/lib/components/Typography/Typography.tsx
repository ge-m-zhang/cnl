// packages/@react-ui/src/lib/components/Typography/Typography.tsx

import React, { forwardRef } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../tools/classNames';
import { typographyVariants, variantElementMap } from './typography.config';

/**
 * Typography Component
 *
 * A flexible typography component that supports various text styles and variants.
 * Built with accessibility in mind and styled with Tailwind CSS.
 *
 * @features
 * - Multiple variants: h1-h6, subtitle1-2, body1-2, caption
 * - Text alignment options
 * - No-wrap with ellipsis support
 * - Bold text option
 * - Hyperlink styling
 * - Strikethrough option
 * - Custom element override
 */

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = 'body1',
      align = 'inherit',
      noWrap = false,
      bold = false,
      hyperlink = false,
      strikethrough = false,
      as,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    // Determine the element type
    const Element = as || variantElementMap[variant || 'body1'];

    return React.createElement(
      Element,
      {
        ref,
        className: cn(
          typographyVariants({
            variant,
            align,
            noWrap,
            bold,
            hyperlink,
            strikethrough,
          }),
          className,
        ),
        ...props,
      },
      children,
    );
  },
);

Typography.displayName = 'Typography';
