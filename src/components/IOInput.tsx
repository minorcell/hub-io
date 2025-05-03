import { useEffect, useRef, useState } from "react";
import { getContributors } from "../api/devrloper";
import type { DeveloperInfo } from "../App";
import { toast } from "react-toastify";
import { Search } from "lucide-react";
import { useI18n } from "../utils/i18n/I18nContext";

export interface IOInputProps {
  setDeveloperInfo: (developerInfo: DeveloperInfo[]) => void;
}

function normalizeInputValue(value: string): string {
  return value.replace("https://github.com/", "").trim();
}

function mapContributorsToDeveloperInfo(
  contributors: DeveloperInfo[]
): DeveloperInfo[] {
  return contributors.map((item) => ({
    avatar_url: item.avatar_url,
    contributions: item.contributions,
    login: item.login,
    html_url: item.html_url,
  }));
}

function IOInput({ setDeveloperInfo }: IOInputProps) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleRes(res: DeveloperInfo[]): DeveloperInfo[] {
    return mapContributorsToDeveloperInfo(res);
  }

  function validateInput(input: string): boolean {
    if (!input.trim()) return false;

    const githubRepoPattern = /^(https?:\/\/github\.com\/)?[\w.-]+\/[\w.-]+$/;
    return githubRepoPattern.test(input);
  }

  function handleSearch(): void {
    setDeveloperInfo([]);

    if (!inputValue) {
      toast.error(
        t({ zh: "请输入仓库 URL", en: "Please enter the repository URL" })
      );
      return;
    }

    if (!validateInput(inputValue)) {
      toast.error(
        t({
          zh: "请输入有效的 GitHub 仓库 URL，格式为：username/repository 或 https://github.com/username/repository",
          en: "Please enter a valid GitHub repository URL in the format: username/repository or https://github.com/username/repository",
        })
      );
      return;
    }

    setIsLoading(true);
    const normalizedValue = normalizeInputValue(inputValue);

    getContributors(normalizedValue)
      .then((res) => {
        if (res.length > 0) {
          setDeveloperInfo(handleRes(res));
          toast.success(
            t(
              {
                zh: "成功！找到 {{count}} 个贡献者。",
                en: "Success! Found {{count}} contributors.",
              },
              { count: res.length }
            )
          );
        }
      })
      .catch((error) => {
        console.error("An error occurred during search:", error);
        toast.error(
          typeof error === "string"
            ? error
            : t({
                zh: "搜索过程中发生错误，请稍后重试。",
                en: "An error occurred during the search. Please try again later.",
              })
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative group">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}

          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          type="text"
          placeholder={t({ zh: "仓库 URL", en: "Repository URL" })}
          className="w-full h-12 px-4 pr-[120px] bg-[#1C1D1F] text-[#E1E4E7] rounded-lg border border-[#26282B] placeholder-[#71757A] focus:outline-none focus:border-[#4A4B4D] focus:ring-1 focus:ring-[#4A4B4D] transition-all duration-200 hover:border-[#313438] text-sm"
        />
        <button
          onClick={handleSearch}
          disabled={!inputValue || isLoading}
          className="absolute right-2 top-2 h-8 px-4 bg-[#2E2F31] text-[#E1E4E7] text-sm font-medium rounded-md hover:bg-[#3A3B3D] focus:outline-none focus:ring-2 focus:ring-[#4A4B4D] focus:ring-offset-1 focus:ring-offset-[#1C1D1F] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center space-x-2"
        >
          {isLoading ? (
            <span className="flex items-center space-x-2">
              <svg
                className="animate-spin h-3.5 w-3.5 text-[#A9ACB1]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>{t({ zh: "加载中", en: "Loading" })}</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <Search
                size={14}
                className="opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <span>{t({ zh: "查询", en: "Query" })}</span>
            </span>
          )}
        </button>
      </div>
      <p className="mt-3 text-sm text-[#71757A]">
        {t({ zh: "示例", en: "Example" })}: minorcell/hub-io
      </p>
    </div>
  );
}

export default IOInput;
