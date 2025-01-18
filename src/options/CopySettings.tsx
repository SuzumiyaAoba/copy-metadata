import React from "react";
import { useConfig } from "@/libs/hooks/config";

export function CopySettings() {
  const [config, updateConfig] = useConfig();

  const handleCopyOnIconClickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateConfig((draft) => {
      draft.copyOnIconClick = e.target.checked;
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Copy Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Configure automatic copy behavior
        </p>
      </div>

      <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-4">
        <input
          type="checkbox"
          id="copyOnIconClick"
          checked={config.copyOnIconClick}
          onChange={handleCopyOnIconClickChange}
          className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
        />
        <label
          htmlFor="copyOnIconClick"
          className="text-sm font-medium text-gray-700"
        >
          Copy automatically when clicking the icon
        </label>
      </div>
    </div>
  );
} 