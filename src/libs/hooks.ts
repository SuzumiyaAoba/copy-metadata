import { type Draft } from "immer";
import { useCallback, useEffect, useState } from "react";

import { DefaultConfig, parseConfig, type Config } from "@/libs/config";
import { getBucket } from "@extend-chrome/storage";

export type DraftFunction<S> = (_draft: Draft<S>) => void;
export type Updater<S> = (_arg: S | DraftFunction<S>) => void;
export type ImmerHook<S> = [S, Updater<S>];

export function useDebounce<T = unknown>(
  value: T,
  condtion: (_value: T) => boolean,
  delay: number,
) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (condtion(value)) {
      const timeoutID = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(timeoutID);
      };
    } else {
      setDebouncedValue(value);
    }
  }, [value, delay]);

  return debouncedValue;
}

const CONFIG_KEY = "config";
const configBucket = getBucket(CONFIG_KEY);

export function useConfig() {
  const [config, setConfig] = useState<Config>(DefaultConfig);

  useEffect(() => {
    configBucket.get().then((config) => {
      try {
        setConfig(parseConfig(config));
      } catch (_e) {
        setConfig(DefaultConfig);
      }
    });
  }, []);

  return [
    config,
    useCallback((config: Config) => {
      configBucket.set(config);
    }, []),
  ] as const;
}

export function useActiveTab() {
  const [tab, setTab] = useState<chrome.tabs.Tab | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      setTab(tabs[0]);
    });
  }, []);

  return [tab] as const;
}
