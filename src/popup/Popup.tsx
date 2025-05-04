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
    <div className={cn("p-4", theme.colors.primary.bg.fade)}>
      <h1 className={cn("text-xl font-bold mb-4", theme.colors.primary.text)}>
        Copy Metadata
      </h1>
      <MetadataDisplay env={currentEnv} theme={theme} />
      <div className="mt-4">
        <select
          value={config.enabledTemplate.name}
          onChange={(e) => handleTemplateChange(e.target.value)}
          className={cn("border rounded p-2", theme.colors.primary.border)}
        >
          {Object.entries(config.templates).map(([name]) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 flex gap-2">
        <Button onClick={handleCopy} variant="primary">
          {isCopied ? "Copied!" : "Copy"}
        </Button>
        <Button onClick={handleSaveMetadata} variant="secondary">
          Save Metadata
        </Button>
      </div>
      <div className="mt-4">
        <PreviewBox content={copyText} theme={theme} />
      </div>
    </div>
  );
}
