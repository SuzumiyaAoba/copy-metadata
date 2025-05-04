import "@/index.css";
import { CopySettings } from "./CopySettings";
import { TemplateEditor } from "./TemplateEditor";
import { ThemeSettings } from "./ThemeSettings";
import { useTheme } from "@/libs/hooks/config";
import { cn } from "@/libs/utils";
import { MetadataManager } from "./components/MetadataManager";

function Options() {
  const theme = useTheme();

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-b",
        `from-${theme.colors.primary.bg.fade} to-white`,
      )}
    >
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div
          className={cn(
            "bg-white/80 backdrop-blur rounded-xl shadow-sm p-8 border",
            theme.colors.primary.border,
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
