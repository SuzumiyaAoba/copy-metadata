import { getConfig } from "@/libs/config";
import { createEnvFromTab, evalTemplate } from "@/libs/template";

export async function createContextMenus() {
  // Remove existing menus
  await chrome.contextMenus.removeAll();

  // Create parent menu
  chrome.contextMenus.create({
    id: "copy-metadata",
    title: "Copy metadata",
    contexts: ["all"],
  });

  // Get templates from config and create submenus
  const config = await getConfig();
  Object.entries(config.templates).forEach(([name]) => {
    chrome.contextMenus.create({
      id: `copy-metadata-${name}`,
      parentId: "copy-metadata",
      title: name,
      contexts: ["all"],
    });
  });
}

export async function handleContextMenuClick(
  info: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab,
) {
  if (!tab?.id) return;
  if (!info.menuItemId.toString().startsWith("copy-metadata")) return;

  const templateName = info.menuItemId.toString().replace("copy-metadata-", "");
  if (templateName === "copy-metadata") return;

  const config = await getConfig();
  const template = config.templates[templateName]?.template;
  if (!template) return;

  const env = createEnvFromTab(tab);
  if (!env) return;

  const text = evalTemplate(template, env);
  if (!text) return;

  await navigator.clipboard.writeText(text);
}
