import { Button } from "@/components/ui/Button";
import { cn } from "@/libs/utils";
import { usePopupManager } from "@/popup/hooks/usePopupManager";
import { MetadataDisplay } from "./components/MetadataDisplay";
import { PreviewBox } from "./components/PreviewBox";

export function Popup() {
  const {
    config,
    theme,
    currentEnv,
    copyText,
    isCopied,
    handleCopy,
    handleTemplateChange,
    handleSaveMetadata,
  } = usePopupManager();

  return (
    <div
      className={cn(
        "w-96 bg-gradient-to-b backdrop-blur",
        `from-${theme.colors.primary.bg.fade}`
      )}
    >
      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <select
            className={cn(
              "flex-grow px-3 py-2 text-sm rounded-lg border bg-white/90 shadow-sm focus:ring-2 transition-shadow text-gray-900",
              theme.colors.primary.border,
              theme.colors.primary.ring
            )}
            value={config.enabledTemplate.name}
            onChange={(e) => handleTemplateChange(e.target.value)}
          >
            {Object.entries(config.templates).map(([name]) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <Button variant="primary" onClick={handleCopy} className="w-30">
            {isCopied ? (
              <div className="flex items-center gap-1.5">
                <span className="i-heroicons-check-circle-solid w-5 h-5" />
                Copied!
              </div>
            ) : (
              "Copy"
            )}
          </Button>
        </div>

        <div className="space-y-3">
          <MetadataDisplay env={currentEnv} theme={theme} />
          <PreviewBox content={copyText} theme={theme} />
        </div>

        <div className="flex justify-between mt-4">
          <Button
            variant="secondary"
            onClick={handleSaveMetadata}
            className="flex items-center gap-1.5"
          >
            <span className="i-heroicons-bookmark text-[14px]" />
            Save Metadata
          </Button>
          <Button
            size="sm"
            onClick={() => chrome.runtime.openOptionsPage()}
            className="flex items-center gap-1.5"
          >
            <span className="i-heroicons-cog-6-tooth text-[14px]" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
