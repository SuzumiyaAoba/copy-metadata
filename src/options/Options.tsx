import "@/index.css";
import { CopySettings } from "./CopySettings";
import { TemplateEditor } from "./TemplateEditor";

function Options() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="border-b pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Copy metadata</h1>
            <p className="mt-2 text-gray-600">
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
