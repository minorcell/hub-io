import { useState, useCallback } from "react";
import { getContributors, clearContributorCache, type Contributor } from "../api/devrloper";
import type { LoadingState } from "../App";
import { toast } from "react-toastify";
import { Search, RefreshCw, X } from "lucide-react";

export interface IOInputProps {
  setDeveloperInfo: (developerInfo: Contributor[]) => void;
  loadingState: LoadingState;
  setLoadingState: (state: LoadingState) => void;
}

/**
 * Normalizes GitHub repository URL to owner/repo format
 */
function normalizeInputValue(value: string): string {
  return value.replace("https://github.com/", "").trim();
}

function IOInput({ setDeveloperInfo, loadingState, setLoadingState }: IOInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  
  /**
   * Validates if the input matches GitHub repository format
   */
  const validateInput = useCallback((input: string): boolean => {
    if (!input.trim()) return false;

    const githubRepoPattern = /^(https?:\/\/github\.com\/)?[\w.-]+\/[\w.-]+$/;
    return githubRepoPattern.test(input);
  }, []);

  /**
   * Handles search action with enhanced error handling
   */
  const handleSearch = useCallback(async (): Promise<void> => {
    if (loadingState === "loading") return;
    
    setDeveloperInfo([]);

    if (!inputValue) {
      toast.error("Please enter the repository URL.");
      return;
    }

    if (!validateInput(inputValue)) {
      toast.error(
        "Please enter a valid GitHub repository URL in the format: username/repository or https://github.com/username/repository"
      );
      return;
    }

    setLoadingState("loading");
    const normalizedValue = normalizeInputValue(inputValue);

    try {
      // Use pagination support in the enhanced API
      const contributors = await getContributors(normalizedValue, 100, 500);
      
      if (contributors.length > 0) {
        setDeveloperInfo(contributors);
        setLoadingState("success");
      } else {
        setLoadingState("idle");
      }
    } catch (error) {
      console.error("An error occurred during search:", error);
      toast.error(
        typeof error === "string"
          ? error
          : "An error occurred during the search. Please try again later."
      );
      setLoadingState("error");
    }
  }, [inputValue, loadingState, setDeveloperInfo, setLoadingState, validateInput]);

  /**
   * Clears the cache and resets the state
   */
  const handleClearCache = useCallback(() => {
    clearContributorCache();
    setDeveloperInfo([]);
    setLoadingState("idle");
  }, [setDeveloperInfo, setLoadingState]);

  /**
   * Clears the input field and resets the state
   */
  const handleClearInput = useCallback(() => {
    setInputValue("");
    setDeveloperInfo([]);
    setLoadingState("idle");
  }, [setDeveloperInfo, setLoadingState]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div
        className="relative mb-4"
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
      >
        <input
          ref={(input) => input?.focus()}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          type="text"
          className="w-full h-14 pl-4 pr-20 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        {inputValue && (
          <button
            onClick={handleClearInput}
            className="absolute right-[5.5rem] top-2 h-10 px-2 text-gray-400 hover:text-white focus:outline-none transition duration-200"
            title="Clear input"
          >
            <X size={16} />
          </button>
        )}
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
          disabled={!inputValue || loadingState === "loading"}
          className="absolute right-2 top-2 h-10 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingState === "loading" ? (
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
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">Example: minorcell/hub-io</p>
        
        <button
          onClick={handleClearCache}
          className="text-sm text-blue-400 hover:text-blue-300 flex items-center focus:outline-none transition duration-200"
          title="Clear cache and fetch fresh data"
        >
          <RefreshCw size={14} className="mr-1" /> Clear cache
        </button>
      </div>
    </div>
  );
}

export default IOInput;
