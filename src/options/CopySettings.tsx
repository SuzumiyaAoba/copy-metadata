import React from "react";
import { useConfig } from "@/libs/hooks/config";

export function CopySettings() {
  const [config, updateConfig] = useConfig();

  const handleCopyOnIconCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateConfig((draft) => {
      draft.copyOnIconClick = e.target.checked;
    });
  };

  const handleEnabledTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateName = e.target.value;
    updateConfig((draft) => {
      draft.enabledTemplate = {
        name: templateName,
        ...draft.templates[templateName],
      };
    });
  };

  return (
    <>
      <h2 className="text-lg font-bold mt-4">設定</h2>
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={config.copyOnIconClick}
            onChange={handleCopyOnIconCheckboxChange}
          />
          <label className="ml-2">アイコンをクリックしてコピーを有効にする</label>
        </div>
        <div className="flex items-center">
          <label className="mr-2">コピー時のテンプレート：</label>
          <select 
            value={config.enabledTemplate.name} 
            onChange={handleEnabledTemplateChange}
            className="px-2 py-1 rounded border shadow"
          >
            {Object.keys(config.templates).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
} 