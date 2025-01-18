import "@/index.css";
import { CopySettings } from "./CopySettings";
import { TemplateEditor } from "./TemplateEditor";

function Options() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white/80 backdrop-blur rounded-xl shadow-sm p-8 border border-purple-100">
          <div className="border-b border-purple-100 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-purple-900">
              Copy metadata
            </h1>
            <p className="mt-2 text-purple-600">
              Copy metadata with customizable templates
            </p>
          </div>
          <div className="space-y-8">
            <CopySettings />
            <TemplateEditor />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Options;
