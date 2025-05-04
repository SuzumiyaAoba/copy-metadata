import React from "react";
import { useTheme } from "@/libs/hooks/config";
import { useConfig } from "@/libs/contexts/config";
import { cn } from "@/libs/utils";
import { LabeledInput } from "@/components/ui/LabeledInput";
import { LabeledCheckbox } from "@/components/ui/LabeledCheckbox";
import { SectionHeader } from "@/components/ui/SectionHeader";

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
      <SectionHeader
        title="Copy Settings"
        description="Configure automatic copy behavior"
        titleClassName={theme.colors.primary.text}
        descriptionClassName={theme.colors.primary.text}
      />

      <LabeledInput
        label="Copy Duration (s):"
        type="number"
        value={config.copyDuration / 1000}
        onChange={handleCopyDurationChange}
        className={cn(theme.colors.primary.border, theme.colors.primary.ring)}
      />

      <LabeledCheckbox
        label="Copy automatically when clicking the icon"
        id="copyOnIconClick"
        checked={config.copyOnIconClick}
        onChange={handleCopyOnIconClickChange}
        className={cn(
          theme.colors.primary.text,
          theme.colors.primary.border,
          theme.colors.primary.ring,
        )}
      />
    </div>
  );
}
