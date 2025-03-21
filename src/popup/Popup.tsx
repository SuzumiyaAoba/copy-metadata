import { useEffect, useState, useCallback, useRef } from "react";
import { createEnvFromTab, evalTemplate, type Env } from "@/libs/template";
import { useTheme } from "@/libs/hooks/config";
import { useConfig } from "@/libs/contexts/config";
import { useActiveTab } from "@/libs/hooks/tab";
import { Button } from "@/components/ui/Button";
import { cn } from "@/libs/utils";
import { saveMetadata } from "@/libs/utils";

function MetadataDisplay({ env }: { env: Env }) {
  const theme = useTheme();

  return (
    <div
      className={cn(
        "space-y-2.5 rounded-lg p-3.5 border bg-white/80",
        theme.colors.primary.bg.light,
        theme.colors.primary.border
      )}
    >
      {Object.entries(env).map(([key, value]) => (
        <div key={key} className="flex">
          <span
            className={cn(
              "text-xs font-medium w-12 text-right pr-2.5 pt-0.5 text-gray-500"
            )}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </span>
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                "text-sm font-medium leading-relaxed text-gray-900",
                key === "url" ? "font-mono break-all" : "break-words"
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
  const theme = useTheme();

  return (
    <div className="relative">
      <div className="absolute -top-2.5 left-3 px-1.5 bg-white">
        <span className={cn("text-xs font-medium", theme.colors.primary.text)}>
          Preview
        </span>
      </div>
      <div
        className={cn(
          "px-3.5 py-2.5 text-sm font-medium border rounded-lg overflow-x-auto whitespace-nowrap font-mono shadow-sm bg-white/90",
          theme.colors.primary.border,
          "text-gray-900",
          theme.colors.primary.bg.fade
        )}
      >
        {content}
      </div>
    </div>
  );
}

export function Popup() {
  const [config, updateConfig] = useConfig();
  const [activeTab] = useActiveTab();
  const [currentEnv, setCurrentEnv] = useState<Env>({
    title: "",
    url: "",
  });
  const [copyText, setCopyText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const timerId = useRef<ReturnType<typeof setTimeout>>();
  const theme = useTheme();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyText);
    setIsCopied(true);

    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(() => {
      setIsCopied(false);
      window.close();
    }, config.copyDuration);
  };

  const handleTemplateChange = (name: string) => {
    updateConfig((draft) => {
      draft.enabledTemplate = {
        name,
        template: draft.templates[name].template,
      };
    });
  };

  const memoizedHandleCopy = useCallback(handleCopy, [
    copyText,
    config.copyDuration,
  ]);

  const handleSaveMetadata = () => {
    saveMetadata("metadata", currentEnv);
  };

  useEffect(() => {
    if (!activeTab) return;
    const env = createEnvFromTab(activeTab);
    if (!env) return;

    setCurrentEnv(env);
    setCopyText(evalTemplate(config.enabledTemplate.template, env) ?? "");

    if (config.copyOnIconClick) {
      memoizedHandleCopy();
    }
  }, [activeTab, config, memoizedHandleCopy]);

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
            onClick={() => {
              if (timerId.current) {
                clearTimeout(timerId.current);
              }
            }}
            onChange={(e) => {
              const name = e.target.value;
              handleTemplateChange(name);
            }}
          >
            {Object.entries(config.templates).map(([name]) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <Button
            variant="primary"
            onClick={memoizedHandleCopy}
            className="w-30"
          >
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
