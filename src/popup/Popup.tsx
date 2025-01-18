import { useEffect, useState } from "react";
import { createEnvFromTab, evalTemplate, type Env } from "@/libs/template";
import { useConfig } from "@/libs/hooks/config";
import { useActiveTab } from "@/libs/hooks/tab";
import { Button } from "@/components/ui/Button";
import { cn } from "@/libs/utils";

function MetadataDisplay({ env }: { env: Env }) {
  return (
    <div className="space-y-2.5 bg-purple-50 rounded-lg p-3.5 border border-purple-100">
      {Object.entries(env).map(([key, value]) => (
        <div key={key} className="flex">
          <span className="text-xs font-medium text-gray-500 w-12 text-right pr-2.5 pt-0.5">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </span>
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                "text-sm font-medium text-gray-900 leading-relaxed",
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
      <div className="absolute -top-2.5 left-3 px-1.5 bg-white">
        <span className="text-xs font-medium text-purple-600">Preview</span>
      </div>
      <div
        className="px-3.5 py-2.5 text-sm font-medium text-gray-800 border border-purple-200 
                    rounded-lg bg-purple-50/50 overflow-x-auto whitespace-nowrap font-mono shadow-sm"
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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleTemplateChange = (name: string, template: string) => {
    updateConfig((draft) => {
      draft.enabledTemplate = { name, template };
    });
  };

  useEffect(() => {
    if (!activeTab) return;

    const env = createEnvFromTab(activeTab);
    if (!env) return;

    setCurrentEnv(env);
    setCopyText(evalTemplate(config.enabledTemplate.template, env) ?? "");

    if (config.copyOnIconClick) {
      handleCopy();
    }
  }, [activeTab, config]);

  return (
    <div className="w-96 bg-gradient-to-b from-purple-50/50">
      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <select
            className="flex-grow px-3 py-2 text-sm rounded-lg border border-purple-200 bg-white shadow-sm 
                     focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
            value={config.enabledTemplate.name}
            onChange={(e) => {
              const name = e.target.value;
              handleTemplateChange(name, config.templates[name].template);
            }}
          >
            {Object.entries(config.templates).map(([name]) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <Button variant="primary" onClick={handleCopy} className="w-24">
            {isCopied ? (
              <div className="flex items-center gap-1">
                <span className="i-heroicons-check-circle-20-solid" />
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

        <div className="flex justify-end pt-1">
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
