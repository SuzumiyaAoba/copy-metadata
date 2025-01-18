import { useEffect, useState } from "react";

import { createEnvFromTab, evalTemplate, type Env } from "@/libs/template";
import { useConfig } from "@/libs/hooks/config";
import { useActiveTab } from "@/libs/hooks/tab";

function Popup() {
  const [config, updateConfig] = useConfig();
  const [activeTab] = useActiveTab();
  const [currentEnv, setCurrentEnv] = useState<Env>({
    title: "",
    url: "",
  });
  const [copyText, setCopyText] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const writeTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);

    setCopyButtonText("Copied!");
  };

  const handleOnCopyClick = () => {
    writeTextToClipboard(copyText);
  };

  const handleOpenOptions = async () => {
    chrome.runtime.openOptionsPage();
  };

  const handleTemplateChange = (name: string, template: string) => {
    updateConfig((draft) => {
      draft.enabledTemplate = { name, template };
    });
  };

  useEffect(() => {
    if (!activeTab) {
      return;
    }

    const env = createEnvFromTab(activeTab);
    if (!env) {
      return;
    }

    setCurrentEnv(env);

    const {
      copyOnIconClick,
      enabledTemplate: { template },
    } = config;

    setCopyText(evalTemplate(template, env) ?? "");

    if (copyOnIconClick) {
      const text = evalTemplate(template, env);

      if (text) {
        writeTextToClipboard(text);
      }
    }
  }, [activeTab, config]);

  return (
    <div className="w-96 bg-white">
      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <select
            className="flex-grow px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white shadow-sm 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            value={config.enabledTemplate.name}
            onChange={(e) => {
              const name = e.target.value;
              const template = config.templates[name].template;
              handleTemplateChange(name, template);
            }}
          >
            {Object.entries(config.templates).map(([name]) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <button
            className="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg 
                     hover:bg-blue-600 active:bg-blue-700 transition-colors
                     shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleOnCopyClick}
          >
            {copyButtonText === "Copy" ? (
              "Copy"
            ) : (
              <div className="flex items-center gap-1">
                <span className="i-heroicons-check-circle-20-solid" />
                Copied!
              </div>
            )}
          </button>
        </div>

        <div className="space-y-3">
          <div className="space-y-2.5 bg-gray-50 rounded-lg p-3.5 border border-gray-100">
            <div className="flex">
              <span className="text-xs font-medium text-gray-500 w-12 text-right pr-2.5 pt-0.5">
                Title
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 break-words leading-relaxed">
                  {currentEnv.title}
                </p>
              </div>
            </div>
            <div className="flex">
              <span className="text-xs font-medium text-gray-500 w-12 text-right pr-2.5 pt-0.5">
                URL
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 font-mono break-all leading-relaxed">
                  {currentEnv.url}
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-2.5 left-3 px-1.5 bg-white">
              <span className="text-xs font-medium text-gray-500">Preview</span>
            </div>
            <div className="px-3.5 py-2.5 text-sm font-medium text-gray-800 border rounded-lg bg-gray-50 
                          overflow-x-auto whitespace-nowrap font-mono shadow-sm">
              {copyText}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={handleOpenOptions}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs text-gray-600 
                     hover:text-gray-800 border rounded-lg hover:bg-gray-50 
                     transition-all shadow-sm hover:shadow
                     focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <span className="i-heroicons-cog-6-tooth text-[14px]" />
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
