import { toast } from "react-toastify";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const CACHE_EXPIRY = 1000 * 60 * 10; // 10 minutes

// Define proper types for the GitHub API response
export interface Contributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

// Simple cache implementation
interface CacheItem {
  data: Contributor[];
  timestamp: number;
}

const contributorCache = new Map<string, CacheItem>();

/**
 * Fetches contributors from a GitHub repository with pagination support
 * @param repoName - Repository name in format: 'owner/repo'
 * @param perPage - Number of contributors per page (max 100)
 * @param maxContributors - Maximum number of contributors to fetch
 * @returns Array of contributors
 */
export const getContributors = async (
  repoName: string,
  perPage = 100,
  maxContributors = 500
): Promise<Contributor[]> => {
  try {
    // Check cache first
    const now = Date.now();
    const cacheKey = `${repoName}_${perPage}_${maxContributors}`;
    const cachedData = contributorCache.get(cacheKey);
    
    if (cachedData && now - cachedData.timestamp < CACHE_EXPIRY) {
      return cachedData.data;
    }
    
    // Prepare API request headers
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    if (GITHUB_TOKEN) {
      headers["Authorization"] = `token ${GITHUB_TOKEN}`;
    }

    let allContributors: Contributor[] = [];
    let page = 1;
    let hasMorePages = true;

    // Fetch pages until we hit the max or run out of contributors
    while (hasMorePages && allContributors.length < maxContributors) {
      const url = new URL(
        `https://api.github.com/repos/${repoName}/contributors`
      );
      url.searchParams.append("per_page", perPage.toString());
      url.searchParams.append("page", page.toString());
      
      const response = await fetch(url.toString(), { headers });

      if (response.status === 404) {
        toast.error("Repository not found, please enter the correct URL.");
        return [];
      } else if (response.status === 403) {
        const rateLimitReset = response.headers.get("X-RateLimit-Reset");
        const resetTime = rateLimitReset
          ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString()
          : "later";
        toast.error(
          `API rate limit reached. Please try again after ${resetTime}.`
        );
        return [];
      } else if (!response.ok) {
        toast.error(`Request failed: ${response.status} ${response.statusText}`);
        return [];
      }

      const pageData: Contributor[] = await response.json();
      
      if (pageData.length === 0) {
        hasMorePages = false;
      } else {
        allContributors = [...allContributors, ...pageData];
        page++;
      }
      
      // Check if we've reached GitHub's pagination limit
      const linkHeader = response.headers.get("Link");
      if (!linkHeader || !linkHeader.includes('rel="next"')) {
        hasMorePages = false;
      }
    }

    // Limit to max contributors
    const result = allContributors.slice(0, maxContributors);
    
    if (result.length === 0) {
      toast.warning("This repository has no contributor information.");
    } else {
      toast.success(`Successfully fetched ${result.length} contributors.`);
      
      // Update cache
      contributorCache.set(cacheKey, {
        data: result,
        timestamp: now,
      });
    }
    
    return result;
  } catch (error) {
    console.error("Error getting contributor information:", error);
    toast.error(
      "Failed to obtain contributor information. Please check your network connection or try again later."
    );
    return [];
  }
};

/**
 * Clears the contributor cache
 */
export const clearContributorCache = (): void => {
  contributorCache.clear();
  toast.info("Cache cleared");
};
