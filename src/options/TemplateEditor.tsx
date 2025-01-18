import React, { useState } from "react";
import { useConfig } from "@/libs/hooks/config";
import { evalTemplate, type Env } from "@/libs/template";
import { BuiltInTemplates } from "@/libs/config";

export function TemplateEditor() {
  const [config, updateConfig] = useConfig();
  const [newTemplateName, setNewTemplateName] = useState("");
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

  const handleAddTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplateName.trim()) return;
    
    updateConfig((draft) => {
      draft.templates[newTemplateName] = {
        template: "{{{ title }}} - {{{ url }}}",
      };
    });
    setNewTemplateName("");
  };

  const handleDeleteTemplate = (name: string) => {
    updateConfig((draft) => {
      delete draft.templates[name];
    });
  };

  const handleResetTemplates = () => {
    if (window.confirm("Are you sure you want to reset templates to default?")) {
      updateConfig((draft) => {
        draft.templates = { ...BuiltInTemplates };
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Templates</h2>
          <p className="mt-1 text-sm text-gray-500">
            Customize the format of copied text
          </p>
        </div>
        <button
          onClick={handleResetTemplates}
          className="text-sm px-4 py-2 text-gray-600 hover:text-gray-800 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          Reset to Default
        </button>
      </div>

      <form onSubmit={handleAddTemplate} className="flex gap-3">
        <input
          className="flex-grow px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
          value={newTemplateName}
          onChange={(e) => setNewTemplateName(e.target.value)}
          placeholder="New template name"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </form>

      <div className="space-y-4">
        {Object.entries(config.templates).map(([name, { template }]) => (
          <div key={name} className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-8 gap-3 items-center">
              <label className="col-span-1 text-right font-medium text-gray-700">
                {name}
              </label>
              <input
                className="col-span-6 px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                value={template}
                onChange={handleTemplateChange(name)}
              />
              <button
                onClick={() => handleDeleteTemplate(name)}
                className="col-span-1 px-3 py-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
            <div className="ml-[12.5%] w-[75%]">
              <div className="px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-600 overflow-x-auto">
                {renderTemplate(template)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 