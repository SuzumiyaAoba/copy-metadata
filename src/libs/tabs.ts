export async function activeTabCallback(
  callback: (_tab: chrome.tabs.Tab) => Promise<void>,
): Promise<void> {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const activeTab = tabs[0];
  if (activeTab) {
    await callback(activeTab);
  }
}
