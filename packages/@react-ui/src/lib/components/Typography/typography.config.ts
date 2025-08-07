import { cva } from 'class-variance-authority';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'; // Added for completeness

// Enhanced variant mapping
export const variantElementMap: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span', // Better semantic choice for captions
  overline: 'span',
} as const;

// Enhanced typography variants
export const typographyVariants = cva(
  // Base classes with better defaults
  ['font-inherit', 'text-inherit', 'transition-colors', 'duration-200'],
  {
    variants: {
      variant: {
        h1: [
          'text-4xl md:text-5xl lg:text-6xl',
          'font-bold',
          'leading-[1.1]', // Tighter for large headings
          'tracking-tight',
        ],
        h2: ['text-3xl md:text-4xl lg:text-5xl', 'font-bold', 'leading-[1.2]', 'tracking-tight'],
        h3: ['text-2xl md:text-3xl lg:text-4xl', 'font-bold', 'leading-[1.25]', 'tracking-tight'],
        h4: ['text-xl md:text-2xl lg:text-3xl', 'font-bold', 'leading-[1.3]', 'tracking-tight'],
        h5: ['text-lg md:text-xl lg:text-2xl', 'font-bold', 'leading-[1.4]', 'tracking-tight'],
        h6: ['text-base md:text-lg lg:text-xl', 'font-bold', 'leading-[1.4]', 'tracking-tight'],
        subtitle1: ['text-base md:text-lg', 'font-semibold', 'leading-[1.5]', 'tracking-normal'],
        subtitle2: ['text-sm md:text-base', 'font-semibold', 'leading-[1.5]', 'tracking-normal'],
        body1: ['text-base', 'font-normal', 'leading-[1.6]', 'tracking-normal'],
        body2: ['text-sm', 'font-normal', 'leading-[1.6]', 'tracking-normal'],
        caption: ['text-xs', 'font-normal', 'leading-[1.4]', 'tracking-normal', 'text-gray-600'],
        overline: [
          'text-xs',
          'font-semibold',
          'leading-[1.4]',
          'tracking-widest',
          'uppercase',
          'text-gray-500',
        ],
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
        inherit: '',
      },
      noWrap: {
        true: ['whitespace-nowrap', 'overflow-hidden', 'text-ellipsis'],
        false: '',
      },
      bold: {
        true: 'font-bold',
        false: '',
      },
      hyperlink: {
        true: [
          'cursor-pointer',
          'hover:underline',
          'transition-all',
          'duration-200',
          'text-blue-600',
          'hover:text-blue-800',
        ],
        false: '',
      },
      strikethrough: {
        true: 'line-through',
        false: '',
      },
      // Added color variant for more flexibility
      color: {
        inherit: '',
        muted: 'text-gray-600',
        subtle: 'text-gray-500',
        primary: 'text-blue-600',
        success: 'text-green-600',
        warning: 'text-yellow-600',
        danger: 'text-red-600',
      },
    },
    defaultVariants: {
      variant: 'body1',
      align: 'inherit',
      noWrap: false,
      bold: false,
      hyperlink: false,
      strikethrough: false,
      color: 'inherit',
    },
  },
);
