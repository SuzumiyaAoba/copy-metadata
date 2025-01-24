import React from "react";
import { useTheme } from "@/libs/hooks/config";
import { useConfig } from "@/libs/contexts/config";
import { cn } from "@/libs/utils";

export function CopySettings() {
  const [config, updateConfig] = useConfig();
  const theme = useTheme();

  const handleCopyOnIconClickChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateConfig((draft) => {
      draft.copyOnIconClick = e.target.checked;
    });
  };

  const handleCopyDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateConfig((draft) => {
      draft.copyDuration = Number(e.target.value) * 1000;
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className={cn("text-xl font-bold", theme.colors.primary.text)}>
          Copy Settings
        </h2>
        <p className={theme.colors.primary.text}>
          Configure automatic copy behavior
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <label className={theme.colors.primary.text}>Copy Duration (s):</label>
        <input
          type="number"
          value={config.copyDuration / 1000}
          onChange={(e) => handleCopyDurationChange(e)}
          className={cn(
            "px-3 py-2 rounded-lg border shadow-sm focus:ring-2 transition-shadow",
            theme.colors.primary.border,
            theme.colors.primary.ring,
          )}
        />
      </div>

      <div
        className={cn(
          "flex items-center space-x-3 rounded-lg p-4 border",
          theme.colors.primary.bg.light,
          theme.colors.primary.border,
        )}
      >
        <input
          type="checkbox"
          id="copyOnIconClick"
          checked={config.copyOnIconClick}
          onChange={handleCopyOnIconClickChange}
          className={cn(
            "h-4 w-4 rounded border focus:ring-2",
            theme.colors.primary.text,
            theme.colors.primary.border,
            theme.colors.primary.ring,
          )}
        />
        <label htmlFor="copyOnIconClick" className={theme.colors.primary.text}>
          Copy automatically when clicking the icon
        </label>
      </div>
    </div>
  );
}
