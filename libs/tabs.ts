export function activeTabCallback(
  callback: (tab: chrome.tabs.Tab) => void
): void {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];

    callback(activeTab);
  });
}
