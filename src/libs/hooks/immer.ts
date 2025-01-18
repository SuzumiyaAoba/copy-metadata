import { useStorage } from "@plasmohq/storage/hook";
import { freeze, produce, type Draft } from "immer";
import { useCallback } from "react";

export type DraftFunction<S> = (_draft: Draft<S>) => void;
export type Updater<S> = (_arg: S | DraftFunction<S>) => void;
export type ImmerHook<S> = [S, Updater<S>];

export function useImmerStorage<S = unknown>(
  key: string,
  initialValue: S | (() => S),
): ImmerHook<S> {
  const [val, updateValue] = useStorage(key, (v) =>
    v === undefined
      ? freeze(
          typeof initialValue === "function"
            ? (initialValue as () => S)()
            : initialValue,
          true,
        )
      : v,
  );

  return [
    val,
    useCallback((updater) => {
      if (typeof updater === "function") {
        updateValue(produce(updater as (_draft: Draft<S>) => void));
      } else {
        updateValue(freeze(updater));
      }
    }, []),
  ];
}
