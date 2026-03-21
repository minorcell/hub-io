import type { GitHubContributor, RenderOptions } from "@/lib/types";

const TITLE_FILL = "#f8fafc";
const META_FILL = "#9fb2cb";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

async function fetchAvatarAsDataUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      cache: "force-cache",
    });

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get("content-type") ?? "image/png";
    const buffer = Buffer.from(await response.arrayBuffer());
    return `data:${contentType};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

function initialsOf(login: string): string {
  return login.slice(0, 2).toUpperCase();
}

export async function renderContributorCardSvg(params: {
  owner: string;
  repo: string;
  contributors: GitHubContributor[];
  options: RenderOptions;
}): Promise<string> {
  const { owner, repo, contributors, options } = params;
  const visibleContributors = contributors.slice(0, options.maxCount);
  const avatars = await Promise.all(
    visibleContributors.map((contributor) =>
      fetchAvatarAsDataUrl(contributor.avatar_url)
    )
  );

  const columns = Math.max(1, options.columns);
  const avatarSize = Math.max(48, options.avatarSize);
  const gap = Math.round(avatarSize * 0.24);
  const rows = Math.max(1, Math.ceil(visibleContributors.length / columns));
  const width = columns * avatarSize + Math.max(0, columns - 1) * gap;
  const height = rows * avatarSize + Math.max(0, rows - 1) * gap;

  const avatarNodes = visibleContributors
    .map((contributor, index) => {
      const row = Math.floor(index / columns);
      const col = index % columns;
      const x = col * (avatarSize + gap);
      const y = row * (avatarSize + gap);
      const clipId = `clip-${index}`;
      const avatar = avatars[index];

      if (!avatar) {
        return `
          <g>
            <circle cx="${x + avatarSize / 2}" cy="${y + avatarSize / 2}" r="${avatarSize / 2}" fill="#0f1728" />
            <text x="${x + avatarSize / 2}" y="${y + avatarSize / 2 + 7}" text-anchor="middle" fill="#edf4ff" font-size="24" font-family="ui-sans-serif, system-ui">${escapeXml(initialsOf(contributor.login))}</text>
            <title>${escapeXml(contributor.login)}</title>
          </g>
        `;
      }

      return `
        <g>
          <clipPath id="${clipId}">
            <circle cx="${x + avatarSize / 2}" cy="${y + avatarSize / 2}" r="${avatarSize / 2}" />
          </clipPath>
          <image
            href="${avatar}"
            x="${x}"
            y="${y}"
            width="${avatarSize}"
            height="${avatarSize}"
            clip-path="url(#${clipId})"
            preserveAspectRatio="xMidYMid slice"
          />
          <title>${escapeXml(contributor.login)}</title>
        </g>
      `;
    })
    .join("");

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
      <title id="title">${escapeXml(`${owner}/${repo} contributors`)}</title>
      <desc id="desc">A contributor avatar grid for ${escapeXml(`${owner}/${repo}`)}.</desc>
      ${avatarNodes}
    </svg>
  `.trim();
}

export function renderStatusSvg(message: string, tone: "neutral" | "error"): string {
  const fill = tone === "error" ? "#25121a" : "#0f1d34";
  const stroke = tone === "error" ? "#ff7a8f" : "#7dd3fc";

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="220" viewBox="0 0 900 220" role="img">
      <rect x="1" y="1" width="898" height="218" rx="28" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
      <text x="42" y="76" fill="${TITLE_FILL}" font-family="ui-sans-serif, system-ui" font-size="30" font-weight="700">Hub-IO</text>
      <text x="42" y="122" fill="${META_FILL}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="18">${escapeXml(message)}</text>
    </svg>
  `.trim();
}
