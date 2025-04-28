import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// UI utility: merge Tailwind and clsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
