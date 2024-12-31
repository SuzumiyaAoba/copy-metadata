import { activeTabCallback } from "~libs/tabs";
import { evalTemplateInTab } from "~libs/template";

export {};

export type Message = {
  type: "copy";
  text: string;
};

export function sendMessage(tabId: number, message: Message) {
  (async () => {
    chrome.tabs.sendMessage(tabId, message);
  })();
}

export function sendCopyTextMessage(
  callback: (tab: chrome.tabs.Tab) => string
): void {
  activeTabCallback((tab) =>
    sendMessage(tab.id, { type: "copy", text: callback(tab) })
  );
}

export function sendCopyTextMessageUsingTemplate(template: string) {
  return sendCopyTextMessage((tab) => evalTemplateInTab(template, tab));
}

export function clipboardWriteText(text: string) {
  return navigator.clipboard.writeText(text);
}

function main() {
  chrome.runtime.onMessage.addListener(
    (message: Message, sender, sendResponse) => {
      if (message.type === "copy") {
        navigator.clipboard.writeText(message.text).then(
          () => {},
          () => {}
        );
      }
    }
  );
}

main();
