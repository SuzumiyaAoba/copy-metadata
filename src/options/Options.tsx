import "@/index.css";
import { CopySettings } from "./CopySettings";
import { TemplateEditor } from "./TemplateEditor";
import { ThemeSettings } from "./ThemeSettings";
import { useTheme } from "@/libs/hooks/config";
import { cn } from "@/libs/utils";
import { useState, useEffect } from "react";
import { getMetadata } from "@/libs/utils";
import { useConfig } from "@/libs/contexts/config";
import { evalTemplate } from "@/libs/template";
import { Button } from "@/components/ui/Button";

function MetadataManager() {
  const [metadata, setMetadata] = useState(getMetadata("metadata"));
  const [config] = useConfig();
  const [selectedTemplate, setSelectedTemplate] = useState(
    config.enabledTemplate.name
  );
  const theme = useTheme();
  const [formatTemplate, setFormatTemplate] = useState(
    localStorage.getItem("formatTemplate") || "{{{url}}}"
  );
  const [previewText, setPreviewText] = useState("");

  const handleDelete = (index: number) => {
    const updatedMetadata = metadata.filter((_, i) => i !== index);
    localStorage.setItem("metadata", JSON.stringify(updatedMetadata));
    setMetadata(updatedMetadata);
  };

  const handleTemplateChange = (name: string) => {
    setSelectedTemplate(name);
  };

  const handleCopy = async (item: any) => {
    const formattedText =
      evalTemplate(config.templates[selectedTemplate].template, item) ?? "";
    await navigator.clipboard.writeText(formattedText);
    alert("Copied to clipboard!");
  };
  const handleFormatAndCopyAll = () => {
    const formattedText = metadata
      .map((item) => evalTemplate(formatTemplate, item) ?? "")
      .join("\n");
    navigator.clipboard.writeText(formattedText);
    alert("All URLs copied to clipboard!");
  };

  const updatePreview = () => {
    const preview = metadata
      .map((item) => evalTemplate(formatTemplate, item) ?? "")
      .join("\n");
    setPreviewText(preview);
  };

  const handleFormatTemplateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTemplate = e.target.value;
    setFormatTemplate(newTemplate);
    localStorage.setItem("formatTemplate", newTemplate);
  };

  useEffect(() => {
    updatePreview();
  }, [formatTemplate, metadata]);

  return (
    <div className="space-y-4">
      <h2 className={cn("text-2xl font-semibold", theme.colors.primary.text)}>
        Saved Metadata
      </h2>
      <p className={cn("text-sm text-gray-600", theme.colors.primary.text)}>
        Use Mustache syntax for templates. Example:
        &#123;&#123;&#123;url&#125;&#125;&#125;
      </p>
      <select
        className={cn(
          "w-full px-3 py-2 text-sm rounded-lg border bg-white shadow-sm focus:ring-2 transition-shadow",
          theme.colors.primary.text,
          theme.colors.primary.border
        )}
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
        <p className={cn("text-gray-600", theme.colors.primary.text)}>
          No metadata saved.
        </p>
      ) : (
        <ul className="space-y-2">
          {metadata.map((item, index) => (
            <li
              key={index}
              className={cn(
                "flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border",
                theme.colors.primary.border
              )}
            >
              <span className={cn("text-gray-700", theme.colors.primary.text)}>
                {evalTemplate(
                  config.templates[selectedTemplate].template,
                  item
                )}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(item)}
                  className={cn(
                    "hover:text-blue-800 font-medium",
                    theme.colors.primary.text
                  )}
                >
                  Copy
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className={cn("text-red-600 hover:text-red-800 font-medium")}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <h3 className={cn("text-lg font-semibold", theme.colors.primary.text)}>
          Format Template
        </h3>
        <input
          type="text"
          value={formatTemplate}
          onChange={handleFormatTemplateChange}
          placeholder="Enter format template"
          className="w-full px-3 py-2 text-sm rounded-lg border bg-white/90 shadow-sm focus:ring-2 transition-shadow text-gray-900"
        />
        <div className="mt-4">
          <h3
            className={cn("text-lg font-semibold", theme.colors.primary.text)}
          >
            Preview
          </h3>
          <pre className="bg-gray-100 p-2 rounded-lg text-sm overflow-x-auto">
            {previewText}
          </pre>
        </div>
        <Button
          variant="primary"
          onClick={handleFormatAndCopyAll}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Copy All Formatted URLs
        </Button>
      </div>
    </div>
  );
}

function Options() {
  const theme = useTheme();

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-b",
        `from-${theme.colors.primary.bg.fade} to-white`
      )}
    >
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div
          className={cn(
            "bg-white/80 backdrop-blur rounded-xl shadow-sm p-8 border",
            theme.colors.primary.border
          )}
        >
          <div
            className={cn("border-b pb-6 mb-6", theme.colors.primary.border)}
          >
            <h1 className={cn("text-3xl font-bold", theme.colors.primary.text)}>
              Copy metadata
            </h1>
            <p className={theme.colors.primary.text}>
              Copy metadata with customizable templates
            </p>
          </div>
          <div className="space-y-8">
            <CopySettings />
            <ThemeSettings />
            <TemplateEditor />
            <MetadataManager />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Options;
