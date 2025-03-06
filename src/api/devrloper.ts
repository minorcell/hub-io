import { toast } from "react-toastify";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const getContributors = async (repoName: string) => {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    if (GITHUB_TOKEN) {
      headers["Authorization"] = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${repoName}/contributors`,
      {
        headers,
      }
    );

    if (response.status === 404) {
      toast.error("Repository not found, please enter the correct URL.");
      return [];
    } else if (response.status === 403) {
      const rateLimitReset = response.headers.get("X-RateLimit-Reset");
      const resetTime = rateLimitReset
        ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString()
        : "later";
      toast.error(
        `The number of API requests has reached the upper limit. Please try again after ${resetTime}.`
      );
      return [];
    } else if (!response.ok) {
      toast.error(`Request failed: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    if (data.length === 0) {
      toast.warning("This repository has no contributor information.");
    }
    return data;
  } catch (error) {
    console.error("Error getting contributor information:", error);
    toast.error(
      "Failed to obtain contributor information, please check network connection or try again later."
    );
    return [];
  }
};
