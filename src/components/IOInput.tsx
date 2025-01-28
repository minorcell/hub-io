import { useState } from "react";
import { getContributors } from "../api/devrloper";
import type { DeveloperInfo } from "../App";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

export interface IOInputProps {
  setDeveloperInfo: (developerInfo: DeveloperInfo[]) => void;
}

function normalizeInputValue(value: string): string {
  return value.replace("https://github.com/", "");
}

function mapContributorsToDeveloperInfo(
  contributors: Record<string, any>[]
): DeveloperInfo[] {
  return contributors.map((item) => ({
    avatar_url: item.avatar_url,
    contributions: item.contributions,
    login: item.login,
    html_url: item.html_url,
  }));
}

function IOInput({ setDeveloperInfo }: IOInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleRes(res: Record<string, any>[]): DeveloperInfo[] {
    return mapContributorsToDeveloperInfo(res);
  }

  function handleSearch(): void {
    setDeveloperInfo([]);
    if (inputValue) {
      setIsLoading(true);
      const normalizedValue = normalizeInputValue(inputValue);
      getContributors(normalizedValue)
        .then((res) => {
          if (res.length > 0) {
            setDeveloperInfo(handleRes(res));
            toast.success(`Success! Found ${res.length} contributors.`);
          }
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
          setInputValue("");
        });
    } else {
      toast.error("Please enter a valid repository URL.");
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          className="w-full h-14 pl-4 pr-20 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <label
          className={`absolute left-4 transition-all duration-200 ${
            isFocused || inputValue
              ? "top-0 text-xs text-blue-400"
              : "top-4 text-base text-gray-400"
          }`}
        >
          Repository URL
        </label>
        <button
          onClick={handleSearch}
          disabled={!inputValue || isLoading}
          className="absolute right-2 top-2 h-10 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading
            </span>
          ) : (
            <span className="flex items-center">
              <Search className="mr-2" size={16} />
              Query
            </span>
          )}
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-400">Example: minorcell/hub-io</p>
    </div>
  );
}

export default IOInput;
