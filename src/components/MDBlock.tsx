import type { DeveloperInfo } from "../App";
import { toast } from "react-toastify";
import { Copy } from "lucide-react";
import { useEffect } from "react";
import Prism from "prismjs";

export interface MDBlockProps {
  developerInfo: DeveloperInfo[];
}

function MDBlock({ developerInfo }: MDBlockProps) {
  const generateMarkdownTable = () => {
    if (developerInfo.length === 0) return "";

    // 每行最多显示 8 个 <td>
    const MAX_COLUMNS = 8;

    // 分组：每 8 个开发者为一组
    const groupedRows = [];
    for (let i = 0; i < developerInfo.length; i += MAX_COLUMNS) {
      groupedRows.push(developerInfo.slice(i, i + MAX_COLUMNS));
    }

    // 生成表格内容
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

    // 拼接完整的表格
    const header = `<table>\n  <tbody>\n`;
    const footer = `\n  </tbody>\n</table>`;
    return header + rows.join("") + footer;
  };

  const markdownTable = generateMarkdownTable();

  const handleCopyMarkdown = async () => {
    await navigator.clipboard.writeText(markdownTable);
    toast.success("Markdown copied to clipboard");
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [developerInfo]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">MarkDown Data</h2>
        {developerInfo.length > 0 && (
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <Copy size={16} className="mr-2" />
              Copy Markdown
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
            No data available
          </p>
        )}
      </div>
    </div>
  );
}

export default MDBlock;
