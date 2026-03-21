const DEFAULT_SITE_URL = "https://hub-io-mcells-projects.vercel.app";

function normalizeSiteUrl(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function resolveSiteUrl(): string {
  const configuredUrl = process.env.APP_URL?.trim();

  if (!configuredUrl) {
    return DEFAULT_SITE_URL;
  }

  try {
    return normalizeSiteUrl(new URL(configuredUrl).toString());
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteConfig = {
  name: "Hub-IO",
  url: resolveSiteUrl(),
  defaultTitle: "GitHub Contributors SVG Generator for README",
  description:
    "Generate a stable GitHub contributors SVG URL for any public repository. Copy a Markdown-ready snippet for README, docs, and profile pages without login or repo config.",
  ogTitle: "Hub-IO GitHub Contributors SVG Generator",
  ogDescription:
    "Stable contributor SVG links, transparent avatar grids, and Markdown snippets for public GitHub repositories.",
  keywords: [
    "github contributors svg",
    "github contributors badge",
    "readme contributors generator",
    "github readme image",
    "contributor avatar grid",
    "github contributor badge generator",
    "markdown contributor snippet",
    "open source readme tool",
  ],
} as const;

export function absoluteSiteUrl(pathname = "/"): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(path, siteConfig.url).toString();
}
