import { useEffect, useState } from "react";

export function useDebounce<T = unknown>(
  value: T,
  condition: (_value: T) => boolean,
  delay: number,
) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (condition(value)) {
      const timeoutID = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(timeoutID);
      };
    } else {
      setDebouncedValue(value);
    }
  }, [value, delay, condition]);

  return debouncedValue;
}
