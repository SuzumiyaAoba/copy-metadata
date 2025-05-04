import "@/index.css";
import { CopySettings } from "./CopySettings";
import { TemplateEditor } from "./TemplateEditor";
import { MetadataManager } from "./MetadataManager";

function Options() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-gray-800/90 backdrop-blur rounded-xl shadow-sm p-8 border border-gray-700">
          <div className="border-b border-gray-700 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-white">Copy metadata</h1>
            <p className="text-gray-300">
              Copy metadata with customizable templates
            </p>
          </div>
          <div className="space-y-8">
            <CopySettings />
            <TemplateEditor />
            <MetadataManager />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Options;
