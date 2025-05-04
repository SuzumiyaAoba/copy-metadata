import type { Env as Metadata } from "@/types";

/**
 * Save a metadata entry to localStorage under the given key.
 * @param key - Storage key
 * @param data - Metadata object to save
 */
export function saveMetadata(key: string, data: Metadata): void {
  const existingData: Metadata[] = getMetadata(key);
  localStorage.setItem(key, JSON.stringify([...existingData, data]));
}

/**
 * Retrieve all metadata entries from localStorage for the given key.
 * @param key - Storage key
 * @returns Array of metadata objects
 */
export function getMetadata(key: string): Metadata[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item) =>
          typeof item.title === "string" && typeof item.url === "string",
      );
    }
    return [];
  } catch {
    return [];
  }
}

/**
 * Format an array of metadata using a template string.
 * @param data - Array of metadata objects
 * @param template - Template string (e.g. "{{title}} - {{url}}")
 * @returns Formatted string
 */
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
