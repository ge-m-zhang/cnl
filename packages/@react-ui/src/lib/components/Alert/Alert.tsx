import React from 'react';

/**
 * Alert Component
 *
 * A fully implemented alert component that displays messages with different variants.
 *
 * @features
 * - Multiple variants: success, error, warning, info
 * - Customizable styling through className prop
 * - Accessible with proper ARIA role
 * - Responsive design with Tailwind CSS
 */
export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

export interface AlertProps {
  children: React.ReactNode;
  variant?: AlertVariant;
  className?: string;
}

const variantStyles: Record<AlertVariant, string> = {
  success: 'bg-green-100 text-green-800 border-green-200',
  error: 'bg-red-100 text-red-800 border-red-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
};

export const Alert: React.FC<AlertProps> = ({ children, variant = 'info', className = '' }) => {
  return (
    <div className={`rounded-lg border p-4 ${variantStyles[variant]} ${className}`} role="alert">
      {children}
    </div>
  );
};
