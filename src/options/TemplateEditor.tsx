import React from "react";
import { useConfig } from "@/libs/hooks/config";
import { evalTemplate, type Env } from "@/libs/template";

export function TemplateEditor() {
  const [config, updateConfig] = useConfig();
  const sampleEnv: Env = {
    title: "Sample Title",
    url: "https://suzumiyaaoba.com/",
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
    <>
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
            <div className="grid grid-cols-subgrid col-span-8">
              <div className="col-start-2 col-span-6 px-2 py-1 w-full bg-gray-100 overflow-x-scroll text-nowrap">
                {renderTemplate(template)}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
} 