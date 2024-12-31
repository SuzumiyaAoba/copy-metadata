import type { PlasmoMessaging } from "@plasmohq/messaging";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  if (req.name === "openOptions") {
    chrome.runtime.openOptionsPage();
  }
};

export default handler;
