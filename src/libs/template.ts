import Mustache from "mustache";
import type { Env } from "@/types";

/**
 * Create an Env object from a Chrome tab.
 * @param tab - Chrome tab
 * @returns Env object or undefined if url/title is missing
 */
export function createEnvFromTab(tab: chrome.tabs.Tab): Env | undefined {
  if (!tab.url || !tab.title) {
    return undefined;
  }
  return {
    url: tab.url,
    title: tab.title,
  };
}

/**
 * Create an Env object from a Document.
 * @param document - DOM Document
 * @returns Env object
 */
export function createEnvFromDocument(document: Document): Env {
  return {
    url: document.location.href,
    title: document.title,
  };
}

/**
 * Render a template string using Mustache and the given Env.
 * @param template - Mustache template string
 * @param env - Env object
 * @returns Rendered string or undefined if error
 */
export function evalTemplate(template: string, env: Env): string | undefined {
  try {
    return Mustache.render(template, env);
  } catch (_e) {
    return undefined;
  }
}

/**
 * Render a template string using Mustache and a Chrome tab.
 * @param template - Mustache template string
 * @param tab - Chrome tab
 * @returns Rendered string
 */
export function evalTemplateInTab(
  template: string,
  tab: chrome.tabs.Tab,
): string {
  const env = createEnvFromTab(tab);
  return env ? Mustache.render(template, env) : "";
}
