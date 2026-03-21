import { NextRequest } from "next/server";
import { renderContributorAsset } from "@/lib/render-response";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      owner: string;
      repo: string;
    }>;
  }
): Promise<Response> {
  const { owner, repo } = await context.params;

  return renderContributorAsset({
    owner,
    repo,
    searchParams: request.nextUrl.searchParams,
  });
}
