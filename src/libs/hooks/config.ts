import { useMemo } from "react";
import { THEMES } from "@/constants/themes";
import { useConfig } from "@/libs/contexts/config";

export function useTheme() {
  const [config] = useConfig();
  const theme = useMemo(() => THEMES[config.theme], [config.theme]);

  return theme;
}
