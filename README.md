# Hub-IO

Hub-IO is a Next.js application for generating stable contributor SVG links for public GitHub repositories.

The flow is simple:

1. Enter `owner/repo`
2. Copy the generated image URL or Markdown snippet
3. Paste it into a README or docs page

The app does not require login, repository installation, pull requests, or a repository-side config file.

## How it works

- The page builds a deterministic image URL from the repository name and selected options.
- The render route fetches contributors from the public GitHub API.
- The SVG response is cached with `Cache-Control`, so Vercel's CDN can serve repeated requests efficiently.
- The link stays the same while the rendered contributor grid refreshes as cache entries roll over.

Main render routes:

```text
/r/:owner/:repo
/api/render/:owner/:repo
```

The public-facing route is `/r/:owner/:repo`. The `/api/render` path remains as a compatibility alias.

## Current capabilities

- Public GitHub repositories
- Transparent SVG avatar grid output
- Default `12` columns
- Adjustable between `6` and `24` columns
- Up to `256` contributors
- Height adapts to the actual number of contributors shown
- Optional bot inclusion
- Markdown snippet generation

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS v4
- shadcn/ui components
- Vercel Functions for SVG rendering

## Local development

1. Install dependencies:

```bash
pnpm install
```

2. Copy the example environment file:

```bash
cp .env.example .env.local
```

3. Start the app:

```bash
pnpm dev
```

## Environment variables

See [.env.example](/Users/mcell/Desktop/workspace/hub-io/.env.example).

- `APP_URL`: optional but recommended. Used to generate absolute URLs in the README snippet.
- `GITHUB_TOKEN`: optional. Recommended in production to avoid GitHub's low anonymous rate limit for public API requests.

If `GITHUB_TOKEN` is omitted, the app still works for public repositories, but GitHub API headroom is lower.

## Example snippet

```md
[![Contributors](https://hub-io-mcells-projects.vercel.app/r/octocat/Hello-World)](https://github.com/octocat/Hello-World/graphs/contributors)
```

Query parameters are encoded directly into the link when defaults are changed:

```text
/r/octocat/Hello-World?cols=8&bots=1
```

## Scripts

- `pnpm dev`
- `pnpm build`
- `pnpm start`
- `pnpm lint`

## Scope

This version currently focuses on public repositories and on-demand rendering.

Intentionally not included:

- GitHub login
- GitHub App installation
- writing files into user repositories
- creating pull requests
- background jobs or persistent storage
