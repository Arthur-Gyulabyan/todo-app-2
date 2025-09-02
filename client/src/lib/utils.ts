/**
 * @file src/lib/utils.ts
 * @description Utility functions including `cn` for combining Tailwind CSS classes.
 *              This file is typically provided by Shadcn/UI.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple Tailwind CSS class strings into a single string.
 * It intelligently merges and de-duplicates class names.
 * @param inputs An array of class values (strings, objects, arrays, etc.).
 * @returns A single string of merged Tailwind CSS classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}