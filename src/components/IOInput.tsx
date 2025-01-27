import { useState } from "react";

import { getContributors } from "../api/devrloper";
import { DeveloperInfo } from "../App";

export interface IOInputProps {
  setDeveloperInfo: (developerInfo: any) => void;
}

function IOInput({ setDeveloperInfo }: IOInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  function handleRes(res: Record<string, any>[]): DeveloperInfo[] {
    const result = res.map((item) => {
      return {
        avatar_url: item.avatar_url,
        contributions: item.contributions,
        login: item.login,
        html_url: item.html_url,
      };
    });
    return result;
  }

  function handleSearch(): void {
    setDeveloperInfo([]);
    if (inputValue) {
      getContributors(inputValue)
        .then((res) => {
          setDeveloperInfo(handleRes(res));
        })
        .catch((error) => {
          console.log(error);
        });
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
      <button onClick={handleSearch} disabled={!inputValue}>
        Query
      </button>
    </div>
  );
}

export default IOInput;
