import { absoluteSiteUrl } from "@/lib/site";

export function parseRepository(input: string): { owner: string; repo: string } {
  const normalized = input
    .trim()
    .replace(/^https?:\/\/github\.com\//, "")
    .replace(/\/+$/, "");

  const [owner, repo] = normalized.split("/");

  if (!owner || !repo || normalized.split("/").length !== 2) {
    throw new Error("Repository must be in the format owner/repo.");
  }

  return { owner, repo };
}

export function getRepositoryKey(owner: string, repo: string): string {
  return `${owner}/${repo}`;
}

export function encodePathSegments(...parts: string[]): string {
  return parts
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join("/");
}

export function absoluteUrl(pathname: string): string {
  return absoluteSiteUrl(pathname);
}
