import { createContext, useContext, type PropsWithChildren } from "react";
import { useImmer } from "use-immer";
import { DefaultConfig, getConfig, setConfig } from "@/libs/config";
import { useEffect } from "react";
import { produce } from "immer";
import type { AppConfig } from "@/types";

type ConfigUpdater = (draft: AppConfig) => void | AppConfig;
type ConfigContextType = readonly [
  AppConfig,
  (updator: ConfigUpdater | AppConfig) => void,
];

const ConfigContext = createContext<ConfigContextType | null>(null);

export function ConfigProvider({ children }: PropsWithChildren) {
  const [config, updateConfig] = useImmer<AppConfig>(DefaultConfig);

  useEffect(() => {
    getConfig().then((config: AppConfig) => {
      try {
        updateConfig(config);
      } catch (_e) {
        updateConfig(DefaultConfig);
      }
    });
  }, [updateConfig]);

  return (
    <ConfigContext.Provider
      value={[
        config,
        (updator) => {
          const value =
            typeof updator === "function"
              ? (produce(updator)(config) as AppConfig)
              : (updator as AppConfig);

          updateConfig(value);
          setConfig(value);
        },
      ]}
    >
      {children}
    </ConfigContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within ConfigProvider");
  }
  return context;
}
