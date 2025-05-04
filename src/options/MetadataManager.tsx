import { evalTemplate } from "@/libs/template";
import { Button } from "@/components/ui/Button";
import { useMetadataManager } from "@/options/hooks/useMetadataManager";

export function MetadataManager() {
  const {
    metadata,
    selectedTemplate,
    formatTemplate,
    previewText,
    config,
    handleDelete,
    handleTemplateChange,
    handleCopy,
    handleFormatAndCopyAll,
    handleFormatTemplateChange,
  } = useMetadataManager();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Saved Metadata</h2>
      <p className="text-sm text-gray-300">
        Use Mustache syntax for templates. Example:
        &#123;&#123;&#123;url&#125;&#125;&#125;
      </p>
      <select
        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-600 bg-gray-800 text-gray-100 shadow-sm focus:ring-2 focus:ring-gray-500 transition-shadow"
        value={selectedTemplate}
        onChange={(e) => handleTemplateChange(e.target.value)}
      >
        {Object.entries(config.templates).map(([name]) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      {metadata.length === 0 ? (
        <p className="text-gray-400">No metadata saved.</p>
      ) : (
        <ul className="space-y-2">
          {metadata.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-gray-900 rounded-lg shadow-sm border border-gray-700"
            >
              <span className="text-gray-100">
                {evalTemplate(
                  config.templates[selectedTemplate].template,
                  item
                )}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(item)}
                  className="hover:text-purple-400 font-medium text-gray-200"
                >
                  Copy
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-400 hover:text-red-300 font-medium"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white">Format Template</h3>
        <input
          type="text"
          value={formatTemplate}
          onChange={handleFormatTemplateChange}
          placeholder="Enter format template"
          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-600 bg-gray-800 text-gray-100 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-gray-500 transition-shadow"
        />
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-purple-400">Preview</h3>
          <pre className="bg-gray-800 p-2 rounded-lg text-sm overflow-x-auto text-gray-100 border border-gray-700">
            {previewText}
          </pre>
        </div>
        <Button
          variant="primary"
          onClick={handleFormatAndCopyAll}
          className="w-full mt-4 font-bold py-2 px-4 rounded"
        >
          Copy All Formatted URLs
        </Button>
      </div>
    </div>
  );
}
