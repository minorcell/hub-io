import { GitHubRequestError, getContributors, getPublicRepository } from "@/lib/github";
import { parseRenderOptions } from "@/lib/render-options";
import { renderContributorCardSvg, renderStatusSvg } from "@/lib/svg";

function svgResponse(
  body: string,
  init?: ResponseInit & {
    cacheControl?: string;
  }
): Response {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "image/svg+xml; charset=utf-8");
  headers.set("Cache-Control", init?.cacheControl ?? "no-store");
  headers.set("X-Robots-Tag", "noindex, nofollow, noimageindex, noarchive");

  return new Response(body, {
    ...init,
    headers,
  });
}

export async function renderContributorAsset(params: {
  owner: string;
  repo: string;
  searchParams: URLSearchParams;
}): Promise<Response> {
  const options = parseRenderOptions(params.searchParams);

  try {
    await getPublicRepository(params.owner, params.repo);
    const contributors = await getContributors(params.owner, params.repo, {
      includeBots: options.includeBots,
      limit: options.maxCount,
      exclude: options.exclude,
    });

    const svg = await renderContributorCardSvg({
      owner: params.owner,
      repo: params.repo,
      contributors,
      options,
    });

    return svgResponse(svg, {
      cacheControl: "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    });
  } catch (error) {
    if (error instanceof GitHubRequestError) {
      const status =
        error.status === 404 ? 404 : error.status === 403 ? 403 : 502;

      return svgResponse(renderStatusSvg(error.message, "error"), {
        status,
      });
    }

    return svgResponse(
      renderStatusSvg(
        "Unable to render contributor card for this repository right now.",
        "error"
      ),
      {
        status: 500,
      }
    );
  }
}
