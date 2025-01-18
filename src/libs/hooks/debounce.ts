import { useEffect, useState } from "react";

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
