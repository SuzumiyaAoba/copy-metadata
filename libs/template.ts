import Mustache from "mustache";

export type Env = {
  url: string;
  title: string;
};

export function createEnvFromTab(tab: chrome.tabs.Tab): Env {
  return {
    url: tab.url,
    title: tab.title
  };
}

export function createEnvFromDocument(document: Document): Env {
  return {
    url: document.location.href,
    title: document.title
  };
}

export function evalTemplate(template: string, env: Env): string | undefined {
  try {
    return Mustache.render(template, env);
  } catch (_e) {
    return undefined;
  }
}

export function evalTemplateInTab(
  template: string,
  tab: chrome.tabs.Tab
): string {
  return Mustache.render(template, createEnvFromTab(tab));
}
