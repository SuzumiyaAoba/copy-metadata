import React from "react";

import "./style.css";

import { useConfig } from "~libs/hooks";
import { evalTemplate, type Env } from "~libs/template";

function OptionsPage() {
  const [config, updateConfig] = useConfig();
  const sampleEnv: Env = {
    title: "Sample Title",
    url: "https://suzumiyaaoba.com/"
  };

  const handleCopyOnIconCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateConfig((draft) => {
      draft.copyOnIconClick = e.target.checked;
    });
  };

  const handleTemplateChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      updateConfig((draft) => {
        draft.templates[name].template = e.target.value;
      });
    };

  const renderTemplate = (template: string) =>
    evalTemplate(template, sampleEnv) ?? "Invalid template";

  return (
    <div className="flex flex-col px-6 py-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Copy metadata</h1>
      <h2 className="text-lg font-bold mt-4">設定</h2>
      <div className="flex mt-4 items-center">
        <input
          type="checkbox"
          checked={config.copyOnIconClick}
          onChange={handleCopyOnIconCheckboxChange}
        />
        <label className="ml-2">アイコンをクリックしてコピーを有効にする</label>
      </div>
      <h2 className="text-lg font-bold mt-4 mb-2">Templates</h2>
      <div className="grid grid-cols-8 gap-2 items-center">
        {Object.entries(config.templates).map(([name, { template }]) => (
          <React.Fragment key={name}>
            <label className="col-span-1 w-full text-right font-semibold">
              {name}
            </label>
            <input
              className="col-span-6 px-2 py-1 rounded border shadow"
              value={template}
              onChange={handleTemplateChange(name)}
            />
            {/*
            <button className="col-span-1 py-1 bg-red-500 text-white font-bold rounded-full">
              Delete
            </button>
            */}
            <div className="grid grid-cols-subgrid col-span-8">
              <div className="col-start-2 col-span-6 px-2 py-1 w-full bg-gray-100 overflow-x-scroll text-nowrap">
                {renderTemplate(template)}
              </div>
            </div>
          </React.Fragment>
        ))}
        {/*
        <button className="col-span-6 col-start-2 mt-4 py-2 rounded-full bg-indigo-500 text-white">
          +
        </button>
        */}
      </div>
    </div>
  );
}

export default OptionsPage;
