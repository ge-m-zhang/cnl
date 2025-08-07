import { cva } from 'class-variance-authority';

export const ButtonColors = ['primary', 'secondary', 'success', 'danger', 'warning'] as const;
export type ButtonColor = (typeof ButtonColors)[number];
export type ButtonVariant = 'contained' | 'outlined' | 'text';

type ColorVariantStyles = {
  [K in ButtonVariant]: string;
};

type ColorMap = {
  [K in ButtonColor]: ColorVariantStyles;
};

export const colorMap: ColorMap = {
  primary: {
    contained:
      'bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600 focus-visible:ring-blue-500 active:bg-blue-700',
    outlined:
      'text-blue-600 border-blue-600 hover:bg-blue-50 focus-visible:ring-blue-600 active:bg-blue-100',
    text: 'text-blue-600 hover:bg-blue-50 active:bg-blue-100',
  },
  secondary: {
    contained:
      'bg-gray-600 border-gray-600 hover:bg-gray-700 hover:border-gray-700 focus-visible:ring-gray-600 active:bg-gray-800',
    outlined:
      'text-gray-600 border-gray-600 hover:bg-gray-50 focus-visible:ring-gray-600 active:bg-gray-100',
    text: 'text-gray-600 hover:bg-gray-50 active:bg-gray-100',
  },
  success: {
    contained:
      'bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700 focus-visible:ring-green-600 active:bg-green-800',
    outlined:
      'text-green-600 border-green-600 hover:bg-green-50 focus-visible:ring-green-600 active:bg-green-100',
    text: 'text-green-600 hover:bg-green-50 active:bg-green-100',
  },
  danger: {
    contained:
      'bg-red-600 border-red-600 hover:bg-red-700 hover:border-red-700 focus-visible:ring-red-600 active:bg-red-800',
    outlined:
      'text-red-600 border-red-600 hover:bg-red-50 focus-visible:ring-red-600 active:bg-red-100',
    text: 'text-red-600 hover:bg-red-50 active:bg-red-100',
  },
  warning: {
    contained:
      'bg-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600 focus-visible:ring-yellow-500 active:bg-yellow-700',
    outlined:
      'text-yellow-600 border-yellow-600 hover:bg-yellow-50 focus-visible:ring-yellow-600 active:bg-yellow-100',
    text: 'text-yellow-600 hover:bg-yellow-50 active:bg-yellow-100',
  },
};

export const buttonVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-md',
    'text-sm',
    'font-medium',
    'transition-all',
    'duration-200',
    'outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        contained: ['text-white', 'border', 'shadow-sm', 'hover:shadow-md', 'active:shadow-inner'],
        outlined: ['bg-white', 'border', 'hover:shadow-sm', 'active:shadow-inner'],
        text: [
          'bg-transparent',
          'border',
          'border-transparent',
          'hover:shadow-sm',
          'active:shadow-inner',
        ],
      },
      size: {
        tiny: 'h-6 px-1.5 text-xs rounded',
        small: 'h-8 px-2.5 text-xs',
        medium: 'h-10 px-4 text-sm',
        large: 'h-11 px-5.5 text-base',
      },
      color: {
        primary: '',
        secondary: '',
        success: '',
        danger: '',
        warning: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: Object.entries(colorMap).flatMap(([color, variants]) =>
      Object.entries(variants).map(([variant, classes]) => ({
        color: color as ButtonColor,
        variant: variant as ButtonVariant,
        class: classes.split(' '),
      })),
    ),
    defaultVariants: {
      variant: 'contained',
      size: 'medium',
      color: 'primary',
      fullWidth: false,
    },
  },
);
