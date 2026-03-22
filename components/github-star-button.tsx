import { Github } from "lucide-react";

async function fetchStarCount(): Promise<number | null> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "hub-io",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    const token = process.env.GITHUB_TOKEN;
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch("https://api.github.com/repos/minorcell/hub-io", {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count: number };
    return data.stargazers_count;
  } catch {
    return null;
  }
}

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export async function GitHubStarButton() {
  const stars = await fetchStarCount();

  return (
    <a
      href="https://github.com/minorcell/hub-io"
      target="_blank"
      rel="noreferrer"
      className="hidden h-8 items-center overflow-hidden rounded-md border border-[#cfc4b5] bg-[#fffdf8] text-[0.8rem] text-[#3d3731] transition-colors hover:bg-[#f4ede2] md:inline-flex"
    >
      <span className="flex items-center gap-1.5 px-2.5">
        <Github className="h-3.5 w-3.5" />
        Star
      </span>
      {stars !== null && (
        <>
          <span className="h-full w-px bg-[#d8cebf]" />
          <span className="px-2.5 font-mono text-[0.75rem] text-[#6d665c]">
            {formatStars(stars)}
          </span>
        </>
      )}
    </a>
  );
}
