# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # start dev server (Next.js + Turbopack)
pnpm build      # production build (runs TypeScript check)
pnpm lint       # ESLint with zero warnings tolerance
pnpm start      # serve production build locally
```

No test suite exists in this project.

## Environment

Copy `.env.example` to `.env.local`. Empty string values are treated as absent — Zod preprocesses them to `undefined` before validation.

| Variable | Required | Notes |
|---|---|---|
| `APP_URL` | No | Base URL for absolute link generation; falls back to the hardcoded Vercel URL in `lib/site.ts` |
| `GITHUB_TOKEN` | Recommended | Fine-grained token, public repos read-only; without it GitHub API rate-limits to 60 req/hr |

## Architecture

### Request flow for a contributor SVG

```
GET /r/[owner]/[repo]?cols=8&max=50&exclude=bot
  → app/r/[owner]/[repo]/route.ts
  → lib/render-response.ts · renderContributorAsset()
      ├── lib/render-options.ts · parseRenderOptions()   (validates + clamps all params)
      ├── lib/github.ts · getPublicRepository()          (verifies public, not private)
      ├── lib/github.ts · getContributors()              (paginates, filters bots + exclude list)
      └── lib/svg.ts · renderContributorCardSvg()        (fetches avatars as base64, builds SVG)
  → Response: image/svg+xml
      Cache-Control: public, max-age=0, s-maxage=86400, stale-while-revalidate=604800
```

`/api/render/[owner]/[repo]` is an identical route that delegates to the same handler.

### Caching strategy

- **SVG response**: CDN-cached for 24 h (`s-maxage=86400`), served stale for 7 days while background-revalidating (`stale-while-revalidate=604800`). Browsers never cache (`max-age=0`).
- **GitHub API calls** (`getPublicRepository`, `getContributors`): `cache: "no-store"` — always fresh when the route actually executes.
- **Avatar images** in `renderContributorCardSvg`: `cache: "force-cache"` — embedded as base64 data URLs in the SVG; cached in the Next.js fetch cache for the lifetime of the serverless function instance.
- **GitHub star count** in `GitHubStarButton`: `next: { revalidate: 3600 }` — refreshed hourly at the page level.

### URL parameters for the render route

All params are optional; non-default values only appear in generated URLs.

| Param | Default | Range | Description |
|---|---|---|---|
| `cols` | 12 | 6–24 | Grid columns |
| `max` | 256 | 1–256 | Max contributors fetched |
| `size` | 72 | 48–88 px | Avatar size |
| `bots` | `0` | `0`/`1` | Include bot accounts |
| `exclude` | — | comma-separated logins | Exclude specific users (case-insensitive) |

### Component boundary: server vs client

| Component | Type | Reason |
|---|---|---|
| `app/page.tsx` | Server | Renders metadata; composes header + form |
| `components/site-header.tsx` | async Server | Awaits `GitHubStarButton` |
| `components/github-star-button.tsx` | async Server | Fetches GitHub API; zero client JS |
| `components/result-card.tsx` | Server (no directive) | Pure presentational wrapper |
| `components/repo-onboarding-form.tsx` | Client (`"use client"`) | Manages form state and clipboard |

`RepoOnboardingForm` calls `buildImagePath` / `buildImageUrl` / `buildReadmeSnippet` from `lib/render-options.ts` client-side to construct the preview URL without a round-trip — the actual SVG is fetched by the browser directly from `/r/[owner]/[repo]`.

### Error handling in the render route

`renderContributorAsset` always returns `image/svg+xml`, even on failure. `GitHubRequestError` maps to HTTP 404/403/502 with an error SVG; all other exceptions return HTTP 500 with a generic error SVG. This ensures `<img>` tags in READMEs never show a broken image icon.

### Styling

Tailwind CSS v4 with a warm parchment palette. Design tokens are in `app/globals.css` (`--radius: 0.4rem`, color variables). shadcn/ui components live in `components/ui/`. Fonts: `Manrope` (body), `Newsreader` (display/headings), `IBM Plex Mono` (mono) — all via `next/font/google`, exposed as CSS variables.
