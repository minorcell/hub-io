import { DeveloperInfo } from "../App";

import { toast } from "react-toastify";

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
    <div className="felx-1 h-[50vh] min-w-1/5 bg-transparent border border-dashed text-gray-100 border-gray-300 rounded-xl flex flex-col p-2">
      <div className="flex-1 overflow-auto p-1 rounded-lg">
        <h2 className="text-lg font-bold mb-2">JSON Data:</h2>
        <pre className="text-sm">
          <code className="language-json select-text">{jsonString}</code>
        </pre>
      </div>

      {developerInfo.length > 0 && (
        <button type="button" onClick={handleCopy} className="io-button">
          Copy JSON
        </button>
      )}
    </div>
  );
}

export default JSONBlock;
