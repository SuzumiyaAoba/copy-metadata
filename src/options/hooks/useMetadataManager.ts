/**
 * Custom hook for managing metadata (save, delete, preview, copy) in the Options UI.
 * Handles template selection, formatting, and preview logic for saved metadata.
 *
 * @returns Options UI state and handlers for metadata management
 */
import { useEffect, useState } from "react";
import { useConfig } from "@/libs/contexts/config";
import { useTheme } from "@/libs/hooks/config";
import { getMetadata } from "@/libs/metadataService";
import { evalTemplate } from "@/libs/template";
import type { Env } from "@/types";

export function useMetadataManager() {
  const [metadata, setMetadata] = useState(getMetadata("metadata"));
  const [config] = useConfig();
  const [selectedTemplate, setSelectedTemplate] = useState(
    config.enabledTemplate.name,
  );
  const theme = useTheme();
  const [formatTemplate, setFormatTemplate] = useState(
    localStorage.getItem("formatTemplate") || "{{{url}}}",
  );
  const [previewText, setPreviewText] = useState("");

  /**
   * Delete a metadata entry by index.
   */
  const handleDelete = (index: number) => {
    const updatedMetadata = metadata.filter((_, i) => i !== index);
    localStorage.setItem("metadata", JSON.stringify(updatedMetadata));
    setMetadata(updatedMetadata);
  };

  /**
   * Change the selected template for formatting/copying.
   */
  const handleTemplateChange = (name: string) => {
    setSelectedTemplate(name);
  };

  /**
   * Copy a single metadata entry using the selected template.
   */
  const handleCopy = async (item: Env) => {
    const formattedText =
      evalTemplate(config.templates[selectedTemplate].template, item) ?? "";
    await navigator.clipboard.writeText(formattedText);
    alert("Copied to clipboard!");
  };

  /**
   * Format and copy all metadata entries using the current format template.
   */
  const handleFormatAndCopyAll = () => {
    const formattedText = metadata
      .map((item) => evalTemplate(formatTemplate, item) ?? "")
      .join("\n");
    navigator.clipboard.writeText(formattedText);
    alert("All URLs copied to clipboard!");
  };

  /**
   * Update the preview text for the current format template.
   */
  const updatePreview = () => {
    const preview = metadata
      .map((item) => evalTemplate(formatTemplate, item) ?? "")
      .join("\n");
    setPreviewText(preview);
  };

  /**
   * Change the format template for preview/copy.
   */
  const handleFormatTemplateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newTemplate = e.target.value;
    setFormatTemplate(newTemplate);
    localStorage.setItem("formatTemplate", newTemplate);
  };

  useEffect(() => {
    updatePreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formatTemplate, metadata]);

  return {
    metadata,
    selectedTemplate,
    formatTemplate,
    previewText,
    config,
    theme,
    handleDelete,
    handleTemplateChange,
    handleCopy,
    handleFormatAndCopyAll,
    handleFormatTemplateChange,
  };
}
