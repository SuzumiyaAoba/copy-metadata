import React, { useState } from "react";
import { useConfig } from "@/libs/contexts/config";
import { evalTemplate } from "@/libs/template";
import type { Env } from "@/types";
import { Button } from "@/components/ui/Button";
import { DefaultConfig } from "@/libs/config";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LabeledInput } from "@/components/ui/LabeledInput";

export function TemplateEditor() {
  const [config, updateConfig] = useConfig();
  const [newTemplateName, setNewTemplateName] = useState("");
  const sampleEnv: Env = {
    title: "Sample Title",
    url: "https://suzumiyaaoba.com/",
  };

  const handleTemplateChange =
    (name: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleResetToDefault = () => {
    if (
      !window.confirm(
        "Are you sure you want to reset all templates to default?"
      )
    )
      return;
    updateConfig((draft) => {
      draft.templates = DefaultConfig.templates;
    });
  };

  const handleDeleteTemplate = (name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" template?`))
      return;
    updateConfig((draft) => {
      delete draft.templates[name];
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SectionHeader
          title="Templates"
          description="Customize the format of copied text"
          titleClassName="text-white"
          descriptionClassName="text-gray-300"
        />
        <Button
          variant="secondary"
          onClick={handleResetToDefault}
          className="border-gray-600 text-gray-200 bg-gray-700 hover:bg-gray-600"
        >
          Reset to Default
        </Button>
      </div>

      <form onSubmit={handleAddTemplate} className="flex gap-3">
        <LabeledInput
          label="New template name"
          value={newTemplateName}
          onChange={(e) => setNewTemplateName(e.target.value)}
          className="flex-grow border-gray-600 focus:ring-gray-500 bg-gray-700 text-gray-100 placeholder-gray-400"
          placeholder="New template name"
        />
        <Button
          type="submit"
          variant="primary"
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          Add
        </Button>
      </form>

      <div className="space-y-6">
        {Object.entries(config.templates).map(([name, { template }]) => (
          <div
            key={name}
            className="rounded-xl p-0 border border-gray-700 bg-gray-800/80 shadow-sm flex flex-col overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 px-5 pt-5 pb-2 bg-gray-900">
              <div className="font-semibold text-base md:w-32 w-full text-left md:text-right md:pr-2 text-gray-100">
                {name}
              </div>
              <textarea
                value={template}
                onChange={handleTemplateChange(name)}
                rows={2}
                className="w-full min-w-0 resize-none px-3 py-2 rounded-lg border border-gray-600 shadow-sm focus:ring-2 focus:ring-gray-500 transition-shadow text-sm font-mono bg-gray-700 text-gray-100 placeholder-gray-400"
                style={{ minHeight: 40, maxHeight: 120 }}
                readOnly={false}
              />
              <div className="flex justify-end md:justify-center items-center md:pl-2">
                <Button
                  variant="danger"
                  size="sm"
                  className="md:w-20 w-full border-gray-600 text-gray-200 bg-gray-700 hover:bg-gray-600"
                  onClick={() => handleDeleteTemplate(name)}
                >
                  Delete
                </Button>
              </div>
            </div>
            <div className="w-full px-0 pt-0 pb-5">
              <div className="flex items-start gap-2 rounded-xl border border-gray-700 bg-gray-900 px-5 py-3 mt-1 shadow-sm">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-700 text-purple-400 mr-2 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.262 4.879l2.12-2.122a1.5 1.5 0 1 1 2.122 2.122l-2.12 2.122m-2.122-2.122l-9.9 9.9a4.5 4.5 0 0 0-1.122 1.878l-.684 2.053a.75.75 0 0 0 .948.948l2.053-.684a4.5 4.5 0 0 0 1.878-1.122l9.9-9.9m-2.122-2.122l2.122 2.122"
                    />
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-purple-400 text-xs mb-1 tracking-wide select-none">
                    Preview
                  </div>
                  <pre
                    className="text-gray-100 font-mono text-sm whitespace-pre-wrap m-0 p-0 bg-transparent border-none shadow-none overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
                    style={{ lineHeight: "1.6" }}
                  >
                    {renderTemplate(template)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
