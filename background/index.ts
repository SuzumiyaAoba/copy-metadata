import { sendToContentScript } from "@plasmohq/messaging";

import { sendCopyTextMessageUsingTemplate } from "~contents";

export {};

type ParentId = string | number;

type Menu = {
  id: string;
  title: string;
  children?: Menu[];
};

export const Templates = {
  url: "{{{ url }}}",
  title: "{{{ title }}}",
  markdown: "[{{{ title }}}]({{{ url }}})",
  org: "[[{{{ url }}}][{{{ title }}}]]",
  asciidoc: "{{{ url }}}[{{{ title }}}]"
};

const DefaultMenu: Menu[] = [
  {
    id: "Copy metadata",
    title: "Copy metadata",
    children: [
      {
        id: "Copy URL",
        title: "URL"
      },
      {
        id: "Copy Title",
        title: "Title"
      },
      {
        id: "Markdown",
        title: "Markdown"
      },
      {
        id: "Org",
        title: "Org"
      },
      {
        id: "Asciidoc",
        title: "Asciidoc"
      }
    ]
  }
] as const;

function createMenu(menu: Menu, parentId?: ParentId) {
  const parent = chrome.contextMenus.create({
    id: menu.id,
    title: menu.title,
    parentId,
    contexts: ["all"]
  });

  if (menu.children) {
    createMenus(menu.children, parent);
  }
}

function createMenus(menus: Menu[], parentId?: ParentId): void {
  menus.forEach((child) => createMenu(child, parentId));
}

function main() {
  chrome.runtime.onInstalled.addListener(() => {
    createMenus(DefaultMenu);
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
      case "Copy URL":
        sendCopyTextMessageUsingTemplate(Templates.url);
        break;
      case "Copy Title":
        sendCopyTextMessageUsingTemplate(Templates.title);
        break;
      case "Markdown":
        sendCopyTextMessageUsingTemplate(Templates.markdown);
        break;
      case "Org":
        sendCopyTextMessageUsingTemplate(Templates.org);
        break;
      case "Asciidoc":
        sendCopyTextMessageUsingTemplate(Templates.asciidoc);
        break;
    }
  });

  chrome.action.onClicked.addListener((tab) => {
    if (tab.id) {
      sendToContentScript({ name: "popup", tabId: tab.id });
    }
  });
}

main();
