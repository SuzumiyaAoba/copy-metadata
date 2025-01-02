import { freeze, produce, type Draft } from "immer";
import { useCallback, useEffect, useState } from "react";

import { useStorage, type RawKey } from "@plasmohq/storage/hook";

import { DefaultConfig, type Config } from "./config";

const KEY = "copy-metadata";

export type DraftFunction<S> = (_draft: Draft<S>) => void;
export type Updater<S> = (_arg: S | DraftFunction<S>) => void;
export type ImmerHook<S> = [S, Updater<S>];

function useImmerStorage<S = unknown>(
  _key: RawKey,
  _initialValue: S | (() => S)
): ImmerHook<S>;

function useImmerStorage(key, initialValue) {
  const [val, updateValue] = useStorage(key, (v) =>
    v === undefined
      ? freeze(
          typeof initialValue === "function" ? initialValue() : initialValue,
          true
        )
      : v
  );

  return [
    val,
    useCallback((updater) => {
      if (typeof updater === "function") {
        updateValue(produce(updater));
      } else {
        updateValue(freeze(updater));
      }
    }, [])
  ];
}

export function useConfig() {
  return useImmerStorage<Config>(KEY, DefaultConfig);
}

export function useDebounce<T = unknown>(
  value: T,
  condtion: (_value: T) => boolean,
  delay: number
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
