import { createContext, useContext, type PropsWithChildren } from "react";
import { useImmer } from "use-immer";
import {
  type Config,
  DefaultConfig,
  getConfig,
  setConfig,
} from "@/libs/config";
import { useEffect } from "react";
import { produce } from "immer";

type ConfigContextType = readonly [
  Config,
  (_updator: (_draft: Config) => void | Config) => void,
];

const ConfigContext = createContext<ConfigContextType | null>(null);

export function ConfigProvider({ children }: PropsWithChildren) {
  const [config, updateConfig] = useImmer(DefaultConfig);

  useEffect(() => {
    getConfig().then((config) => {
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
            typeof updator === "function" ? produce(updator)(config) : updator;

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
