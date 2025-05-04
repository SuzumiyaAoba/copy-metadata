import type { Env } from "@/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/libs/utils";
import { usePopupManager } from "@/popup/hooks/usePopupManager";

function MetadataDisplay({ env }: { env: Env }) {
  return (
    <div className="space-y-2.5 rounded-lg p-3.5 border border-gray-700 bg-gray-900">
      {Object.entries(env).map(([key, value]) => (
        <div key={key} className="flex">
          <span className="text-xs font-medium w-12 text-right pr-2.5 pt-0.5 text-gray-400">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </span>
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                "text-sm font-medium leading-relaxed text-gray-100",
                key === "url" ? "font-mono break-all" : "break-words",
              )}
            >
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PreviewBox({ content }: { content: string }) {
  return (
    <div className="relative">
      <div className="absolute -top-2.5 left-3 px-1.5 bg-gray-900">
        <span className="text-xs font-medium text-purple-400">Preview</span>
      </div>
      <div className="px-3.5 py-2.5 text-sm font-medium border border-gray-700 rounded-lg overflow-x-auto whitespace-pre font-mono shadow-sm bg-gray-800 text-gray-100">
        {content}
      </div>
    </div>
  );
}

export function Popup() {
  const {
    config,
    currentEnv,
    copyText,
    isCopied,
    handleCopy,
    handleTemplateChange,
    handleSaveMetadata,
  } = usePopupManager();

  return (
    <div className="w-96 bg-gradient-to-b from-gray-900 to-gray-800 backdrop-blur text-gray-100">
      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <select
            className="flex-grow px-3 py-2 text-sm rounded-lg border border-gray-700 bg-gray-900 text-gray-100 shadow-sm focus:ring-2 focus:ring-gray-500 transition-shadow"
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
          <MetadataDisplay env={currentEnv} />
          <PreviewBox content={copyText} />
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
