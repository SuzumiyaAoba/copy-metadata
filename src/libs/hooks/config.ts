import { useEffect, useState } from "react";
import { THEMES } from "@/constants/themes";
import { useConfig } from "@/libs/contexts/config";

export function useTheme() {
  const [config] = useConfig();
  const [theme, setTheme] = useState(THEMES[config.theme]);

  useEffect(() => {
    setTheme(THEMES[config.theme]);
  }, [config]);

  return theme;
}
