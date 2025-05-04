/**
 * Custom hook for managing the state and logic of the Popup UI.
 * Handles template selection, copy-to-clipboard, metadata保存, and environment extraction from the active tab.
 *
 * @returns Popup UI state and handlers
 */
import { useEffect, useState, useCallback, useRef } from "react";
import { createEnvFromTab, evalTemplate } from "@/libs/template";
import type { Env } from "@/types";
import { useTheme } from "@/libs/hooks/config";
import { useConfig } from "@/libs/contexts/config";
import { useActiveTab } from "@/libs/hooks/tab";
import { saveMetadataToStorage } from "@/libs/metadataService";

export function usePopupManager() {
  const [config, updateConfig] = useConfig();
  const [activeTab] = useActiveTab();
  const [currentEnv, setCurrentEnv] = useState<Env>({
    title: "",
    url: "",
  });
  const [copyText, setCopyText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const timerId = useRef<ReturnType<typeof setTimeout>>();
  const theme = useTheme();

  /**
   * Copy the current template output to clipboard and show feedback.
   */
  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(copyText);
    setIsCopied(true);

    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(() => {
      setIsCopied(false);
      window.close();
    }, config.copyDuration);
  }, [copyText, config.copyDuration]);

  /**
   * Change the selected template for copying metadata.
   */
  const handleTemplateChange = (name: string) => {
    updateConfig((draft) => {
      draft.enabledTemplate = {
        name,
        template: draft.templates[name].template,
      };
    });
  };

  /**
   * Save the current metadata (Env) to localStorage.
   */
  const handleSaveMetadata = () => {
    saveMetadataToStorage("metadata", currentEnv);
  };

  useEffect(() => {
    if (!activeTab) return;
    const env = createEnvFromTab(activeTab);
    if (!env) return;

    setCurrentEnv(env);
    setCopyText(evalTemplate(config.enabledTemplate.template, env) ?? "");

    if (config.copyOnIconClick) {
      handleCopy();
    }
  }, [activeTab, config, handleCopy]);

  return {
    config,
    theme,
    currentEnv,
    copyText,
    isCopied,
    timerId,
    handleCopy,
    handleTemplateChange,
    handleSaveMetadata,
  };
}
