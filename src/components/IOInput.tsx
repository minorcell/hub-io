import { useState } from "react";

import { getContributors } from "../api/devrloper";
import { DeveloperInfo } from "../App";

import { toast } from "react-toastify";

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
          setDeveloperInfo(handleRes(res));
          toast.success(`Success! Found ${res.length} contributors.`);
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
    <div className="w-full py-2.5 flex items-center justify-center gap-8">
      {/* Input */}
      <div className="relative w-2/5 pl-4 bg-transparent border border-white rounded-xl">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          placeholder={isFocused ? "e.g. minorcell/hub-io" : ""}
          className="w-full h-12 bg-transparent outline-none text-white"
        />
        <div
          onClick={() => setIsFocused(!isFocused)}
          className={`select-none duration-300 text-white text-xl absolute top-0 left-4 p-2 rounded-xl bg-gray-900 ${
            isFocused ? "-translate-y-1/2 -translate-x-1/4 scale-50 " : ""
          }`}
        >
          Enter a repository url here..
        </div>
      </div>
      {/* SearchButton */}
      <button
        onClick={handleSearch}
        disabled={!inputValue || isLoading}
        className="io-button"
      >
        Query
      </button>
    </div>
  );
}

export default IOInput;
