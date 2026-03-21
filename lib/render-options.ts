import type { RenderOptions } from "@/lib/types";
import { absoluteUrl, encodePathSegments } from "@/lib/utils";

export const DEFAULT_RENDER_OPTIONS: RenderOptions = {
  columns: 12,
  avatarSize: 72,
  maxCount: 256,
  includeBots: false,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function parseInteger(
  value: string | null,
  fallback: number,
  min: number,
  max: number
): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed)) {
    return fallback;
  }

  return clamp(parsed, min, max);
}

export function normalizeRenderOptions(
  overrides: Partial<RenderOptions> = {}
): RenderOptions {
  return {
    columns: clamp(
      overrides.columns ?? DEFAULT_RENDER_OPTIONS.columns,
      6,
      24
    ),
    avatarSize: clamp(
      overrides.avatarSize ?? DEFAULT_RENDER_OPTIONS.avatarSize,
      48,
      88
    ),
    maxCount: clamp(
      overrides.maxCount ?? DEFAULT_RENDER_OPTIONS.maxCount,
      1,
      256
    ),
    includeBots: overrides.includeBots ?? DEFAULT_RENDER_OPTIONS.includeBots,
  };
}

export function parseRenderOptions(searchParams: URLSearchParams): RenderOptions {
  return normalizeRenderOptions({
    columns: parseInteger(
      searchParams.get("cols"),
      DEFAULT_RENDER_OPTIONS.columns,
      6,
      24
    ),
    includeBots:
      searchParams.get("bots") === "1" ||
      searchParams.get("bots") === "true",
  });
}

function buildQueryString(options: RenderOptions): string {
  const params = new URLSearchParams();

  if (options.columns !== DEFAULT_RENDER_OPTIONS.columns) {
    params.set("cols", String(options.columns));
  }

  if (options.includeBots) {
    params.set("bots", "1");
  }

  return params.toString();
}

export function buildImagePath(
  owner: string,
  repo: string,
  overrides?: Partial<RenderOptions>
): string {
  const options = normalizeRenderOptions(overrides);
  const query = buildQueryString(options);
  const basePath = `/r/${encodePathSegments(owner, repo)}`;

  return query ? `${basePath}?${query}` : basePath;
}

export function buildImageUrl(
  owner: string,
  repo: string,
  overrides?: Partial<RenderOptions>,
  origin?: string
): string {
  const path = buildImagePath(owner, repo, overrides);

  if (origin) {
    return new URL(path, origin).toString();
  }

  return absoluteUrl(path);
}

export function buildReadmeSnippet(
  owner: string,
  repo: string,
  overrides?: Partial<RenderOptions>,
  origin?: string
): string {
  const imageUrl = buildImageUrl(owner, repo, overrides, origin);
  const repoPath = encodePathSegments(owner, repo);

  return `[![Contributors](${imageUrl})](https://github.com/${repoPath}/graphs/contributors)`;
}
