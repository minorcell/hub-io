import { DeveloperInfo } from "../App";

export interface JSONBlockProps {
  developerInfo: DeveloperInfo[];
}

function JSONBlock({ developerInfo }: JSONBlockProps) {
  const jsonString = JSON.stringify(developerInfo, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonString);
    alert("JSON 数据已复制到剪贴板！");
  };

  return (
    <div className="felx-1 h-[50vh] min-w-2/5 bg-white rounded-3xl flex flex-col p-2">
      <div className="flex-1 overflow-auto bg-gray-100 p-1 rounded-lg">
        <h2 className="text-lg font-bold mb-2">JSON 数据:</h2>
        <pre className="text-sm text-gray-800">
          <code>{jsonString}</code>
        </pre>
      </div>

      {developerInfo.length > 0 && (
        <button
          type="button"
          onClick={handleCopy}
          className="mt-4 duration-300 h-12 px-6 py-2 rounded-xl bg-gradient-to-r from-slate-300 to-purple-300 hover:bg-gradient-to-r hover:from-slate-500 hover:to-purple-500 transition-colors active:translate-y-1 active:scale-95 focus:ring-2 focus:ring-offset-2 font-bold text-xl active:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:text-white"
        >
          Copy JSON
        </button>
      )}
    </div>
  );
}

export default JSONBlock;
