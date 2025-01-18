import React, { useState } from "react";
import { useConfig } from "@/libs/hooks/config";
import { evalTemplate, type Env } from "@/libs/template";
import { BuiltInTemplates } from "@/libs/config";
import { Button } from "@/components/ui/button";

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
          <h2 className="text-xl font-bold text-purple-900">Templates</h2>
          <p className="mt-1 text-sm text-purple-600">
            Customize the format of copied text
          </p>
        </div>
        <Button variant="secondary">Reset to Default</Button>
      </div>

      <form onSubmit={handleAddTemplate} className="flex gap-3">
        <input
          className="flex-grow px-3 py-2 rounded-lg border border-purple-200 shadow-sm 
                   focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
          value={newTemplateName}
          onChange={(e) => setNewTemplateName(e.target.value)}
          placeholder="New template name"
        />
        <Button type="submit" variant="primary">Add</Button>
      </form>

      <div className="space-y-4">
        {Object.entries(config.templates).map(([name, { template }]) => (
          <div key={name} className="bg-purple-50 rounded-lg p-4 space-y-3 border border-purple-100">
            <div className="grid grid-cols-8 gap-3 items-center">
              <label className="col-span-1 text-right font-medium text-purple-900">
                {name}
              </label>
              <input
                className="col-span-6 px-3 py-2 rounded-lg border border-purple-200 shadow-sm 
                         focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
                value={template}
                onChange={handleTemplateChange(name)}
              />
              <Button variant="danger" className="col-span-1">Delete</Button>
            </div>
            <div className="ml-[12.5%] w-[75%]">
              <div className="px-3 py-2 bg-white rounded-lg border border-purple-200 
                           text-sm text-purple-900 overflow-x-auto">
                {renderTemplate(template)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 