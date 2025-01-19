import { useImmer } from "use-immer";
import { DefaultConfig, getConfig, setConfig } from "@/libs/config";
import { useCallback, useEffect, useState } from "react";
import { produce } from "immer";
import { THEMES } from "@/constants/themes";

export function useConfig() {
  const [config, updateConfig] = useImmer(DefaultConfig);

  useEffect(() => {
    getConfig().then((config) => {
      try {
        updateConfig(config);
      } catch (_e) {
        updateConfig(DefaultConfig);
      }
    });
  }, []);

  return [
    config,
    useCallback(
      (updator: Parameters<typeof updateConfig>[0]) => {
        const value =
          typeof updator === "function" ? produce(updator)(config) : updator;

        updateConfig(value);

        (async () => {
          await setConfig(value);
        })();
      },
      [config],
    ),
  ] as const;
}

export function useTheme() {
  const [config] = useConfig();
  const [theme, setTheme] = useState(THEMES[config.theme]);

  useEffect(() => {
    chrome.storage.onChanged.addListener((_changes) => {
      getConfig().then((config) => {
        setTheme(THEMES[config.theme]);
      });
    });

    getConfig().then((config) => {
      setTheme(THEMES[config.theme]);
    });
  }, []);

  return theme;
}
