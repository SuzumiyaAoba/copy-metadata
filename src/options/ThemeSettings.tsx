import { useConfig } from "@/libs/contexts/config";
import { THEMES, type ThemeId } from "@/constants/themes";
import { cn } from "@/libs/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ThemeSettings() {
  const [config, updateConfig] = useConfig();

  const handleThemeChange = (themeId: ThemeId) => {
    updateConfig((draft) => {
      draft.theme = themeId;
    });
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Theme Settings"
        description="Customize the appearance"
      />
      <div className="grid grid-cols-3 gap-4">
        {Object.values(THEMES).map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={cn(
              "p-4 rounded-lg border transition-all",
              config.theme === theme.id
                ? `${theme.colors.primary.border} ${theme.colors.primary.bg.light}`
                : "border-gray-200 hover:border-gray-300",
            )}
          >
            <div className="space-y-2">
              <div className={`h-8 rounded-md ${theme.colors.primary.base}`} />
              <div className="text-sm font-medium text-gray-900">
                {theme.name}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
