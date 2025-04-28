import React, { useState } from "react";
import { useTheme } from "@/libs/hooks/config";
import { useConfig } from "@/libs/contexts/config";
import { evalTemplate } from "@/libs/template";
import type { Env } from "@/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/libs/utils";
import { DefaultConfig } from "@/libs/config";

export function TemplateEditor() {
  const [config, updateConfig] = useConfig();
  const theme = useTheme();
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

  const handleResetToDefault = () => {
    if (
      !window.confirm(
        "Are you sure you want to reset all templates to default?",
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
        <div>
          <h2 className={cn("text-xl font-bold", theme.colors.primary.text)}>
            Templates
          </h2>
          <p className={theme.colors.primary.text}>
            Customize the format of copied text
          </p>
        </div>
        <Button variant="secondary" onClick={handleResetToDefault}>
          Reset to Default
        </Button>
      </div>

      <form onSubmit={handleAddTemplate} className="flex gap-3">
        <input
          className={cn(
            "flex-grow px-3 py-2 rounded-lg border shadow-sm focus:ring-2 transition-shadow",
            theme.colors.primary.border,
            theme.colors.primary.ring,
          )}
          value={newTemplateName}
          onChange={(e) => setNewTemplateName(e.target.value)}
          placeholder="New template name"
        />
        <Button type="submit" variant="primary">
          Add
        </Button>
      </form>

      <div className="space-y-4">
        {Object.entries(config.templates).map(([name, { template }]) => (
          <div
            key={name}
            className={cn(
              "rounded-lg p-4 space-y-3 border",
              theme.colors.primary.bg.light,
              theme.colors.primary.border,
            )}
          >
            <div className="grid grid-cols-8 gap-3 items-center">
              <label
                className={cn(
                  "col-span-1 text-right font-medium",
                  theme.colors.primary.text,
                )}
              >
                {name}
              </label>
              <input
                className={cn(
                  "col-span-6 px-3 py-2 rounded-lg border shadow-sm focus:ring-2 transition-shadow",
                  theme.colors.primary.border,
                  theme.colors.primary.ring,
                )}
                value={template}
                onChange={handleTemplateChange(name)}
              />
              <Button
                variant="danger"
                className="col-span-1"
                onClick={() => handleDeleteTemplate(name)}
              >
                Delete
              </Button>
            </div>
            <div className="ml-[12.5%] w-[75%]">
              <div
                className={cn(
                  "px-3 py-2 bg-white rounded-lg border text-sm overflow-x-auto",
                  theme.colors.primary.border,
                  theme.colors.primary.text,
                )}
              >
                {renderTemplate(template)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
