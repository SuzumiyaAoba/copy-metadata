import { activeTabCallback } from "./libs/tabs";
import { evalTemplateInTab } from "./libs/template";

export type Message = {
  type: "copy";
  text: string;
};

export async function sendMessage(
  tabId: number,
  message: Message
): Promise<void> {
  await chrome.tabs.sendMessage(tabId, message);
}

export async function sendCopyTextMessage(
  callback: (_tab: chrome.tabs.Tab) => string
): Promise<void> {
  await activeTabCallback(async (tab) => {
    if (tab.id) {
      await sendMessage(tab.id, { type: "copy", text: callback(tab) });
    }
  });
}

export async function sendCopyTextMessageUsingTemplate(
  template: string
): Promise<void> {
  return await sendCopyTextMessage((tab) => evalTemplateInTab(template, tab));
}

export function clipboardWriteText(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

function main() {
  chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
    if (message.type === "copy") {
      navigator.clipboard.writeText(message.text);
    }

    return true;
  });
}

main();
