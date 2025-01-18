import "@/index.css";
import { CopySettings } from "./CopySettings";
import { TemplateEditor } from "./TemplateEditor";

function Options() {
  return (
    <div className="flex flex-col px-6 py-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Copy metadata</h1>
      <CopySettings />
      <TemplateEditor />
    </div>
  );
}

export default Options;
