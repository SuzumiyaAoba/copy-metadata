import { useEffect, useState } from "react";

export function useActiveTab() {
  const [tab, setTab] = useState<chrome.tabs.Tab | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      setTab(tabs[0]);
    });
  }, []);

  return [tab] as const;
}
