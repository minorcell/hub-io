import type { DeveloperInfo } from "../App";
import { toast } from "react-toastify";
import { Copy } from "lucide-react";

export interface JSONBlockProps {
  developerInfo: DeveloperInfo[];
}

function JSONBlock({ developerInfo }: JSONBlockProps) {
  const jsonString = JSON.stringify(developerInfo, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonString);
    toast.success("JSON copied to clipboard");
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">JSON Data</h2>
        {developerInfo.length > 0 && (
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <Copy size={16} className="mr-2" />
            Copy JSON
          </button>
        )}
      </div>
      <div
        className="p-4 overflow-auto"
        style={{ maxHeight: "calc(50vh - 60px)" }}
      >
        {developerInfo.length > 0 ? (
          <pre className="text-sm text-gray-300 whitespace-pre-wrap break-words">
            <code className="language-json">{jsonString}</code>
          </pre>
        ) : (
          <p className="text-gray-400 text-center">No data available</p>
        )}
      </div>
    </div>
  );
}

export default JSONBlock;
