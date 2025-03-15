import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Metadata {
  title: string;
  url: string;
}

export function saveMetadata(key: string, data: Metadata) {
  const existingData: Metadata[] = JSON.parse(
    localStorage.getItem(key) || "[]",
  );
  existingData.push(data);
  localStorage.setItem(key, JSON.stringify(existingData));
}

export function getMetadata(key: string): Metadata[] {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

export function formatMetadata(data: Metadata[], template: string): string {
  return data
    .map((item) => {
      let formatted: string = template;
      for (const [key, value] of Object.entries(item)) {
        formatted = formatted.replace(
          new RegExp(`{{${key}}}`, "g"),
          String(value),
        );
      }
      return formatted;
    })
    .join("\n");
}
