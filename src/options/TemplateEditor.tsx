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
    if (window.confirm("テンプレートをデフォルトの状態に戻しますか？")) {
      updateConfig((draft) => {
        draft.templates = { ...BuiltInTemplates };
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mt-4 mb-2">テンプレート</h2>
        <button
          onClick={handleResetTemplates}
          className="text-sm px-3 py-1 text-gray-600 hover:text-gray-800 border rounded"
        >
          デフォルトに戻す
        </button>
      </div>
      <form onSubmit={handleAddTemplate} className="mb-4 flex gap-2">
        <input
          className="px-2 py-1 rounded border shadow flex-grow"
          value={newTemplateName}
          onChange={(e) => setNewTemplateName(e.target.value)}
          placeholder="新しいテンプレート名"
        />
        <button
          type="submit"
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          追加
        </button>
      </form>
      <div className="grid grid-cols-8 gap-2 items-center">
        {Object.entries(config.templates).map(([name, { template }]) => (
          <React.Fragment key={name}>
            <label className="col-span-1 w-full text-right font-semibold">
              {name}
            </label>
            <input
              className="col-span-5 px-2 py-1 rounded border shadow"
              value={template}
              onChange={handleTemplateChange(name)}
            />
            <button
              onClick={() => handleDeleteTemplate(name)}
              className="col-span-1 px-2 py-1 text-red-500 hover:text-red-600"
            >
              削除
            </button>
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