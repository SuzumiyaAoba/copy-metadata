export function activeTabCallback(
  callback: (_tab: chrome.tabs.Tab) => void
): void {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];

    callback(activeTab);
  });
}
