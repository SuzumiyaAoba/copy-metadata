import type { Env } from "@/types";

/**
 * Save a single metadata entry to localStorage under the given key (append).
 * @param key - Storage key
 * @param data - Metadata object to save
 */
export function saveMetadataToStorage(key: string, data: Env): void {
  const existingData: Env[] = getMetadataFromStorage(key);
  localStorage.setItem(key, JSON.stringify([...existingData, data]));
}

/**
 * Retrieve all metadata entries from localStorage for the given key.
 * @param key - Storage key
 * @returns Array of metadata objects
 */
export function getMetadataFromStorage(key: string): Env[] {
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
export function formatMetadata(data: Env[], template: string): string {
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

/**
 * Save all metadata entries to localStorage under the given key (overwrite).
 * @param key - Storage key
 * @param data - Array of metadata objects to save
 */
export function setMetadataToStorage(key: string, data: Env[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}
