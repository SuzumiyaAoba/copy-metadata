import { subscribeTemplates } from "@/libs/config";
import { createContextMenus, handleContextMenuClick } from "./menu";

function main() {
  chrome.runtime.onInstalled.addListener(() => {
    createContextMenus();
  });

  subscribeTemplates((_templates) => {
    createContextMenus();
  });

  chrome.contextMenus.onClicked.addListener(handleContextMenuClick);
}

main();
