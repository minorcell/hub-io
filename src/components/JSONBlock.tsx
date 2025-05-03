import type { DeveloperInfo } from "../App";
import { toast } from "react-toastify";
import { Copy } from "lucide-react";
import { useEffect } from "react";
import Prism from "prismjs";
import { useI18n } from "../utils/i18n/I18nContext";

export interface JSONBlockProps {
  developerInfo: DeveloperInfo[];
}

function JSONBlock({ developerInfo }: JSONBlockProps) {
  const { t } = useI18n();
  const jsonString = JSON.stringify(developerInfo, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonString);
    toast.success(
      t({ zh: "JSON 已复制到剪贴板", en: "JSON copied to clipboard" })
    );
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [developerInfo]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#151718] border border-[#26282B] rounded-xl shadow-xl overflow-hidden transition-all duration-200 hover:border-[#313438]">
      <div className="p-4 bg-gradient-to-b from-[#1C1D1F] to-[#151718] border-b border-[#26282B] flex justify-between items-center">
        <h2 className="text-[15px] font-medium text-[#E1E4E7]">
          {t({ zh: "JSON 数据", en: "JSON Data" })}
        </h2>
        {developerInfo.length > 0 && (
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center px-3 py-1.5 bg-[#2E2F31] text-[#E1E4E7] text-sm font-medium rounded-md hover:bg-[#3A3B3D] transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#4A4B4D] focus:ring-offset-1 focus:ring-offset-[#151718] group"
          >
            <Copy size={14} className="mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
            {t({ zh: "复制 JSON", en: "Copy JSON" })}
          </button>
        )}
      </div>
      <div
        className="p-4 overflow-auto min-h-[30vh] bg-[#151718]"
        style={{ maxHeight: "calc(50vh - 60px)" }}
      >
        {developerInfo.length > 0 ? (
          <pre className="text-sm text-[#A9ACB1] whitespace-pre overflow-x-auto break-words font-mono">
            <code className="lang-js select-text">{jsonString}</code>
          </pre>
        ) : (
          <p className="text-[#71757A] h-[30vh] flex items-center justify-center text-sm">
            {t({ zh: "暂无数据", en: "No data available" })}
          </p>
        )}
      </div>
    </div>
  );
}

export default JSONBlock;
