import React from 'react';

/**
 * Badge Component
 *
 * A fully implemented badge component.
 *
 * @features
 * - Fully implemented with all planned features
 * - Customizable through props
 * - Accessible and responsive
 * - Styled with Tailwind CSS
 */

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-blue-100 text-blue-800',
  secondary: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  danger: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
  info: 'bg-blue-100 text-blue-800',
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className = '' }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
