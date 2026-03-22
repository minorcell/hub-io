import { getEnv } from "@/lib/env";
import type { GitHubContributor, GitHubRepo } from "@/lib/types";
import { encodePathSegments } from "@/lib/utils";

const GITHUB_API = "https://api.github.com";

interface GitHubErrorShape {
  message?: string;
}

export class GitHubRequestError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = "GitHubRequestError";
  }
}

function githubHeaders(): HeadersInit {
  const env = getEnv();

  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "hub-io",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(env.GITHUB_TOKEN ? { Authorization: `Bearer ${env.GITHUB_TOKEN}` } : {}),
  };
}

async function githubRequest<T>(path: string): Promise<T> {
  const response = await fetch(`${GITHUB_API}${path}`, {
    headers: githubHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    let message = `GitHub request failed with status ${response.status}.`;

    if (
      response.status === 403 &&
      response.headers.get("x-ratelimit-remaining") === "0"
    ) {
      message =
        "GitHub API rate limit exceeded. Add GITHUB_TOKEN on Vercel or try again later.";
    } else {
      try {
        const data = (await response.json()) as GitHubErrorShape;
        if (data.message) {
          message = data.message;
        }
      } catch {
        // Ignore malformed GitHub error payloads.
      }
    }

    throw new GitHubRequestError(response.status, message);
  }

  return (await response.json()) as T;
}

function isBot(contributor: GitHubContributor): boolean {
  return contributor.type === "Bot" || contributor.login.endsWith("[bot]");
}

export async function getPublicRepository(
  owner: string,
  repo: string
): Promise<GitHubRepo> {
  const repository = await githubRequest<GitHubRepo>(
    `/repos/${encodePathSegments(owner, repo)}`
  );

  if (repository.private) {
    throw new GitHubRequestError(
      403,
      "Private repositories are not supported in this stateless MVP."
    );
  }

  return repository;
}

export async function getContributors(
  owner: string,
  repo: string,
  options: {
    includeBots: boolean;
    limit: number;
    exclude: string[];
  }
): Promise<GitHubContributor[]> {
  const excludeSet = new Set(options.exclude.map((s) => s.toLowerCase()));
  const contributors: GitHubContributor[] = [];
  let page = 1;

  while (contributors.length < options.limit) {
    const next = await githubRequest<GitHubContributor[]>(
      `/repos/${encodePathSegments(owner, repo)}/contributors?per_page=100&page=${page}`
    );

    if (next.length === 0) {
      break;
    }

    for (const contributor of next) {
      if (!options.includeBots && isBot(contributor)) {
        continue;
      }

      if (excludeSet.has(contributor.login.toLowerCase())) {
        continue;
      }

      contributors.push(contributor);

      if (contributors.length >= options.limit) {
        break;
      }
    }

    page += 1;
  }

  return contributors.slice(0, options.limit);
}
