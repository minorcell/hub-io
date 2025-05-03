import type { Contributor } from "../api/devrloper";
import { toast } from "react-toastify";
import { Copy } from "lucide-react";
import { useEffect } from "react";
import Prism from "prismjs";
import { useI18n } from "../i18n/I18nContext";

export interface MDBlockProps {
  developerInfo: Contributor[];
}

function MDBlock({ developerInfo }: MDBlockProps) {
  const { t } = useI18n();
  const generateMarkdownTable = () => {
    if (developerInfo.length === 0) return "";

    const MAX_COLUMNS = 8;

    const groupedRows = [];
    for (let i = 0; i < developerInfo.length; i += MAX_COLUMNS) {
      groupedRows.push(developerInfo.slice(i, i + MAX_COLUMNS));
    }

    const rows = groupedRows.map((group) => {
      const cells = group.map((dev) => {
        return `<td align="center" valign="top" width="${
          100 / MAX_COLUMNS
        }%" style="word-break: break-word; white-space: normal;"><a href="${
          dev.html_url
        }" title="${dev.login}"><img src="${
          dev.avatar_url
        }" width="100px;" alt="${
          dev.login
        }" style="border-radius: 9999px;" /></a></td>`;
      });
      return `    <tr>${cells.join("")}\n    </tr>\n`;
    });

    const header = `<table>\n  <tbody>\n`;
    const footer = `\n  </tbody>\n</table>`;
    return header + rows.join("") + footer;
  };

  const markdownTable = generateMarkdownTable();

  const handleCopyMarkdown = async () => {
    await navigator.clipboard.writeText(markdownTable);
    toast.success(t({ zh: "Markdown 已复制到剪贴板", en: "Markdown copied to clipboard" }));
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [developerInfo]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">{t({ zh: "Markdown 数据", en: "MarkDown Data" })}</h2>
        {developerInfo.length > 0 && (
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <Copy size={16} className="mr-2" />
              {t({ zh: "复制 Markdown", en: "Copy Markdown" })}
            </button>
          </div>
        )}
      </div>
      <div
        className="p-4 overflow-auto min-h-[30vh]"
        style={{ maxHeight: "calc(50vh - 60px)" }}
      >
        {developerInfo.length > 0 ? (
          <>
            <pre className="text-sm text-gray-300 whitespace-pre overflow-x-auto break-words mt-4">
              <code className="lang-html select-text">{markdownTable}</code>
            </pre>
          </>
        ) : (
          <p className="text-gray-400 h-[30vh] flex items-center justify-center">
            {t({ zh: "暂无数据", en: "No data available" })}
          </p>
        )}
      </div>
    </div>
  );
}

export default MDBlock;
