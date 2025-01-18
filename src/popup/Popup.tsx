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
    <div
      className="px-4 py-4 w-96 
                  bg-neutral-50 
                    drop-shadow-xl
                    overflow-hidden text-pretty
                  text-black text-lg"
    >
      <div className="flex gap-2 mb-2">
        <select
          className="flex-grow px-2 py-1 text-sm rounded border"
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
          className="px-1 py-2 flex-grow text-sm font-bold rounded-full bg-black text-white"
          onClick={handleOnCopyClick}
        >
          {copyButtonText}
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-4 text-sm">
        <div className="flex">
          <p className="mr-1">Title:</p>
          <p className="font-bold break-all">{currentEnv.title}</p>
        </div>
        <div className="flex">
          <p className="mr-1">URL:</p>
          <p className="font-bold break-all">{currentEnv.url}</p>
        </div>
      </div>
      <div className="flex mt-4 items-center">
        <div className="px-2 py-3 w-full rounded-lg text-sm font-semibold bg-gray-200 text-nowrap overflow-x-scroll">
          {copyText}
        </div>
        <div className="h-full ml-2 my-auto text-2xl">
          <button onClick={handleOpenOptions}>
            <span className="i-vscode-icons-file-type-light-config"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
