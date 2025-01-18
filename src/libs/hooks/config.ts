import { useImmer } from "use-immer";
import { DefaultConfig, parseConfig } from "@/libs/config";
import { useCallback, useEffect } from "react";
import { getBucket } from "@extend-chrome/storage";
import { produce } from "immer";

const CONFIG_KEY = "config";
const configBucket = getBucket(CONFIG_KEY);

export function useConfig() {
  const [config, updateConfig] = useImmer(DefaultConfig);

  useEffect(() => {
    configBucket.get().then((config) => {
      try {
        updateConfig(parseConfig(config));
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
          typeof updator === "function" ? produce(updator) : updator;

        updateConfig(value);

        (async () => {
          configBucket.set(value);
        })();
      },
      [config],
    ),
  ] as const;
}
