import type { DeveloperInfo } from "../App";
import { toast } from "react-toastify";
import { Copy } from "lucide-react";
import { useEffect } from "react";
import Prism from "prismjs";
import { useI18n } from "../i18n/I18nContext";

export interface JSONBlockProps {
  developerInfo: DeveloperInfo[];
}

function JSONBlock({ developerInfo }: JSONBlockProps) {
  const { t } = useI18n();
  const jsonString = JSON.stringify(developerInfo, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonString);
    toast.success(t({ zh: "JSON 已复制到剪贴板", en: "JSON copied to clipboard" }));
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [developerInfo]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">{t({ zh: "JSON 数据", en: "JSON Data" })}</h2>
        {developerInfo.length > 0 && (
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <Copy size={16} className="mr-2" />
            {t({ zh: "复制 JSON", en: "Copy JSON" })}
          </button>
        )}
      </div>
      <div
        className="p-4 overflow-auto min-h-[30vh]"
        style={{ maxHeight: "calc(50vh - 60px)" }}
      >
        {developerInfo.length > 0 ? (
          <pre className="text-sm text-gray-300 whitespace-pre overflow-x-auto break-words">
            <code className="lang-js select-text">{jsonString}</code>
          </pre>
        ) : (
          <p className="text-gray-400 h-[30vh] flex items-center justify-center">
            {t({ zh: "暂无数据", en: "No data available" })}
          </p>
        )}
      </div>
    </div>
  );
}

export default JSONBlock;
