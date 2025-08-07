// packages/ui/src/lib/tools/classNames.ts

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names and resolves Tailwind conflicts
 *
 * This utility combines the power of:
 * - clsx: for conditional class names
 * - tailwind-merge: for resolving Tailwind class conflicts
 *
 * @param inputs - Class values to combine
 * @returns Merged class string with conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
