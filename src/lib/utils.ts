import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// src/lib/utils.ts
export const isTrending = (value?: string | null) => {
  if (!value) return false;
  const v = value.trim().toLowerCase();
  return v === "y" || v === "yes" || v === "true";
};