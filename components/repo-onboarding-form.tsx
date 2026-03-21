"use client";

import { Copy, ExternalLink } from "lucide-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  DEFAULT_RENDER_OPTIONS,
  buildImagePath,
  buildImageUrl,
  buildReadmeSnippet,
  normalizeRenderOptions,
} from "@/lib/render-options";
import { parseRepository } from "@/lib/utils";

interface GeneratedAsset {
  graphUrl: string;
  imagePath: string;
  imageUrl: string;
  owner: string;
  readmeSnippet: string;
  repo: string;
}

type CopyField = "image" | "markdown" | null;

function currentOrigin(): string | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window.location.origin;
}

function HeroGraphic() {
  return (
    <svg
      viewBox="76 88 584 438"
      className="h-auto w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hubio-surface" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffdf9" />
          <stop offset="100%" stopColor="#f5ede2" />
        </linearGradient>
        <linearGradient id="hubio-accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e9936a" />
          <stop offset="100%" stopColor="#d7744d" />
        </linearGradient>
        <radialGradient id="hubio-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#efbb96" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#efbb96" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="404" cy="282" rx="238" ry="188" fill="url(#hubio-glow)" />

      <g fill="none" stroke="#d7744d" strokeLinecap="round">
        <path d="M248 138 C302 118 392 116 458 150" strokeWidth="10" opacity="0.58" />
        <path d="M280 438 C360 486 486 486 566 438" strokeWidth="10" opacity="0.45" />
        <path d="M500 196 C560 222 598 270 610 344" strokeWidth="8" opacity="0.35" />
      </g>

      <g transform="translate(210 110)">
        <rect
          x="0"
          y="0"
          width="264"
          height="72"
          rx="22"
          fill="#fffaf3"
          stroke="#ded2c5"
          strokeWidth="2"
        />
        <rect
          x="18"
          y="22"
          width="40"
          height="28"
          rx="14"
          fill="#f4e6d7"
        />
        <path
          d="M32 36 H44 M44 36 L40 32 M44 36 L40 40"
          stroke="#d7744d"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <rect
          x="72"
          y="23"
          width="140"
          height="10"
          rx="5"
          fill="#ddcfbf"
        />
        <rect
          x="72"
          y="40"
          width="106"
          height="9"
          rx="4.5"
          fill="#e9ddd0"
        />
        <text
          x="230"
          y="44"
          textAnchor="end"
          fill="#6f675f"
          fontSize="17"
          fontFamily="var(--font-mono), monospace"
        >
          /r/owner/repo
        </text>
      </g>

      <g transform="translate(110 182)">
        <rect
          x="0"
          y="0"
          width="336"
          height="320"
          rx="34"
          fill="url(#hubio-surface)"
          stroke="#ddd0c1"
          strokeWidth="2"
        />
        <text
          x="34"
          y="48"
          fill="#6f675f"
          fontSize="15"
          letterSpacing="0.12em"
          fontFamily="var(--font-mono), monospace"
        >
          CONTRIBUTORS SVG
        </text>
        <text
          x="34"
          y="88"
          fill="#171410"
          fontSize="28"
          fontWeight="600"
          fontFamily="var(--font-body), sans-serif"
        >
          Stable grid preview
        </text>

        <g transform="translate(34 118)">
          <g>
            <circle cx="30" cy="30" r="26" fill="#ebb286" />
            <circle cx="30" cy="26" r="11" fill="#1f2737" opacity="0.92" />
            <path d="M13 52 C17 37 44 37 48 52" fill="#1f2737" opacity="0.92" />
          </g>
          <g transform="translate(76 0)">
            <circle cx="30" cy="30" r="26" fill="#d9d4ef" />
            <circle cx="30" cy="26" r="11" fill="#433f75" opacity="0.88" />
            <path d="M13 52 C17 37 44 37 48 52" fill="#433f75" opacity="0.88" />
          </g>
          <g transform="translate(152 0)">
            <circle cx="30" cy="30" r="26" fill="#d9ebe0" />
            <circle cx="30" cy="26" r="11" fill="#2c5848" opacity="0.88" />
            <path d="M13 52 C17 37 44 37 48 52" fill="#2c5848" opacity="0.88" />
          </g>
          <g transform="translate(228 0)">
            <circle cx="30" cy="30" r="26" fill="#f1d7cd" />
            <circle cx="30" cy="26" r="11" fill="#7a4330" opacity="0.88" />
            <path d="M13 52 C17 37 44 37 48 52" fill="#7a4330" opacity="0.88" />
          </g>

          <g
            transform="translate(0 82)"
            fill="none"
            stroke="#dfd3c5"
            strokeWidth="2"
            opacity="0.9"
          >
            <circle cx="30" cy="30" r="26" strokeDasharray="6 7" />
            <circle cx="106" cy="30" r="26" strokeDasharray="6 7" />
            <circle cx="182" cy="30" r="26" strokeDasharray="6 7" />
            <circle cx="258" cy="30" r="26" strokeDasharray="6 7" />
          </g>
          <g
            transform="translate(0 164)"
            fill="none"
            stroke="#dfd3c5"
            strokeWidth="2"
            opacity="0.9"
          >
            <circle cx="30" cy="30" r="26" strokeDasharray="6 7" />
            <circle cx="106" cy="30" r="26" strokeDasharray="6 7" />
            <circle cx="182" cy="30" r="26" strokeDasharray="6 7" />
            <circle cx="258" cy="30" r="26" strokeDasharray="6 7" />
          </g>
        </g>
      </g>

      <g transform="translate(420 246)">
        <rect
          x="0"
          y="0"
          width="216"
          height="224"
          rx="30"
          fill="#fffaf3"
          stroke="#ddd0c1"
          strokeWidth="2"
        />
        <text
          x="28"
          y="42"
          fill="#6f675f"
          fontSize="15"
          letterSpacing="0.12em"
          fontFamily="var(--font-mono), monospace"
        >
          README
        </text>
        <rect x="28" y="64" width="160" height="16" rx="8" fill="#181410" />
        <rect x="28" y="96" width="120" height="10" rx="5" fill="#ddd1c3" />
        <rect x="28" y="116" width="144" height="10" rx="5" fill="#e7ddd2" />
        <rect x="28" y="136" width="132" height="10" rx="5" fill="#e7ddd2" />
        <rect
          x="28"
          y="172"
          width="160"
          height="38"
          rx="19"
          fill="url(#hubio-accent)"
        />
        <text
          x="108"
          y="196"
          textAnchor="middle"
          fill="#fff9f2"
          fontSize="18"
          fontWeight="600"
          fontFamily="var(--font-body), sans-serif"
        >
          Paste once
        </text>
      </g>

      <g fill="#d7744d">
        <circle cx="458" cy="150" r="12" />
        <circle cx="280" cy="438" r="11" />
        <circle cx="610" cy="344" r="10" />
      </g>
    </svg>
  );
}

function ResultCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden rounded-lg border-[#ddd3c6] bg-[#fffdf8] shadow-[0_2px_8px_rgba(59,46,30,0.06)]">
      <CardHeader className="flex-row items-center justify-between gap-3 px-4 py-3">
        <CardTitle className="text-[0.82rem] font-semibold uppercase tracking-wider text-[#7d756c]">
          {title}
        </CardTitle>
        {action}
      </CardHeader>
      <Separator className="bg-[#ebe2d6]" />
      <CardContent className="px-4 py-4">{children}</CardContent>
    </Card>
  );
}

export function RepoOnboardingForm() {
  const [repository, setRepository] = useState("");
  const [columns, setColumns] = useState(String(DEFAULT_RENDER_OPTIONS.columns));
  const [includeBots, setIncludeBots] = useState(false);
  const [result, setResult] = useState<GeneratedAsset | null>(null);
  const [copiedField, setCopiedField] = useState<CopyField>(null);

  async function copyText(field: Exclude<CopyField, null>, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      toast.success(field === "image" ? "Image URL copied" : "Markdown copied");
      window.setTimeout(() => {
        setCopiedField((current) => (current === field ? null : current));
      }, 1600);
    } catch {
      setCopiedField(null);
      toast.error("Unable to copy to clipboard.");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    try {
      const { owner, repo } = parseRepository(repository);
      const options = normalizeRenderOptions({
        columns: Number(columns),
        includeBots,
      });
      const origin = currentOrigin();
      const imagePath = buildImagePath(owner, repo, options);
      const imageUrl = buildImageUrl(owner, repo, options, origin);
      const readmeSnippet = buildReadmeSnippet(owner, repo, options, origin);

      setResult({
        graphUrl: `https://github.com/${owner}/${repo}/graphs/contributors`,
        imagePath,
        imageUrl,
        owner,
        readmeSnippet,
        repo,
      });
      toast.success("Stable contributor link generated.");
    } catch (submitError) {
      setResult(null);
      toast.error(
        submitError instanceof Error
          ? submitError.message
          : "Unable to build the contributor link."
      );
    }
  }

  return (
    <section id="product" className="mx-auto w-full max-w-[1180px] px-5 pb-16 pt-5 md:px-8 md:pt-7">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(360px,0.94fr)] lg:items-center">
        <div className="max-w-[34rem]">
          <p className="text-[0.75rem] font-medium uppercase tracking-widest text-[#9e9287]">README visuals</p>
          <h1 className="mt-3 max-w-[30rem] [font-family:var(--font-display)] text-[2rem] leading-[1.12] tracking-[-0.03em] text-[#171410] sm:text-[2.5rem] md:text-[2.75rem]">
            Meet your contributor gallery
          </h1>
          <p className="mt-3 max-w-[29rem] text-[0.875rem] leading-6 text-[#625a52]">
            Generate a stable contributors SVG for any public GitHub
            repository, then reuse the same link anywhere you need it.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            <div className="flex max-w-[48rem] flex-col gap-2 rounded-lg border border-[#dcd2c5] bg-[#fffdf8] p-1.5 shadow-[0_2px_10px_rgba(57,44,29,0.05)] sm:flex-row sm:items-center">
              <Input
                id="repository"
                value={repository}
                onChange={(event) => setRepository(event.target.value)}
                placeholder="owner/repo or GitHub URL"
                className="h-8 rounded-md border-0 bg-transparent px-3 text-[0.875rem] shadow-none focus-visible:ring-0"
              />
              <Button
                type="submit"
                variant="light"
                className="h-7 px-5 text-[0.8rem]"
              >
                Generate link
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge className="rounded border border-[#d8cebf] bg-[#f4ece0] px-2 py-0.5 text-[0.72rem] font-medium tracking-normal normal-case text-[#7d756c]">
                Public repos only
              </Badge>
              <Badge className="rounded border border-[#d8cebf] bg-[#f4ece0] px-2 py-0.5 text-[0.72rem] font-medium tracking-normal normal-case text-[#7d756c]">
                Markdown ready
              </Badge>
              <Badge className="rounded border border-[#d8cebf] bg-[#f4ece0] px-2 py-0.5 text-[0.72rem] font-medium tracking-normal normal-case text-[#7d756c]">
                Transparent SVG
              </Badge>
            </div>

            <div className="grid gap-3 sm:grid-cols-[130px_auto]">
              <div className="space-y-1.5">
                <Label htmlFor="columns" className="text-[0.8rem] text-[#7d756c]">
                  Columns
                </Label>
                <Input
                  id="columns"
                  type="number"
                  min={6}
                  max={24}
                  value={columns}
                  onChange={(event) => setColumns(event.target.value)}
                  className="h-8 rounded-md bg-[#fffdf8] text-[0.875rem]"
                />
              </div>

              <div className="mt-[1.45rem] inline-flex min-h-8 items-center gap-2.5 rounded-md border border-[#d8cebf] bg-[#fffdf8] px-3 text-[0.82rem] text-[#5f574f]">
                <Checkbox
                  id="includeBots"
                  checked={includeBots}
                  onCheckedChange={(checked) => setIncludeBots(checked === true)}
                />
                <Label
                  htmlFor="includeBots"
                  className="cursor-pointer text-[0.82rem] font-normal text-[#5f574f]"
                >
                  Include bot accounts
                </Label>
              </div>
            </div>
          </form>
        </div>

        <div className="relative lg:justify-self-end lg:pr-0">
          <div className="absolute inset-x-10 top-12 h-32 rounded-full bg-[#db7b56]/10 blur-3xl" />
          <div className="mx-auto max-w-[35rem] lg:max-w-[41rem] lg:translate-x-4">
            <HeroGraphic />
          </div>
        </div>
      </div>

      <div id="results" className="mt-10 grid gap-4">
        <ResultCard
          title="Contributor Preview"
          action={
            result ? (
              <Button asChild variant="outline" className="h-7 px-3 text-[0.78rem]">
                <a href={result.imageUrl} target="_blank" rel="noreferrer">
                  Open image
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            ) : undefined
          }
        >
          {result ? (
            <div className="overflow-x-auto rounded-md border border-[#e8dfd3] bg-[linear-gradient(45deg,#f7f2ea_25%,#fbf7f0_25%,#fbf7f0_50%,#f7f2ea_50%,#f7f2ea_75%,#fbf7f0_75%,#fbf7f0_100%)] bg-[size:20px_20px] px-4 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={result.imagePath}
                src={result.imagePath}
                alt={`${result.owner}/${result.repo} contributors`}
                style={{ display: "block", height: "auto", maxWidth: "100%" }}
              />
            </div>
          ) : (
            <div className="flex min-h-[180px] items-center justify-center rounded-md border border-dashed border-[#dbd1c3] bg-[#faf6ef] px-6 text-center text-[0.82rem] text-[#9e9287]">
              Your contributor grid will preview here after you generate a link.
            </div>
          )}
        </ResultCard>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <ResultCard
            title="Markdown Snippet"
            action={
              result ? (
                <Button
                  type="button"
                  variant="outline"
                  className="h-7 px-3 text-[0.78rem]"
                  onClick={() => copyText("markdown", result.readmeSnippet)}
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copiedField === "markdown" ? "Copied" : "Copy Markdown"}
                </Button>
              ) : undefined
            }
          >
            {result ? (
              <pre className="overflow-x-auto rounded-md border border-[#e8dfd3] bg-[#faf6ef] px-3 py-3 font-mono text-[0.78rem] leading-5 text-[#5e564e]">
                <code>{result.readmeSnippet}</code>
              </pre>
            ) : (
              <div className="flex min-h-[130px] items-center justify-center rounded-md border border-dashed border-[#dbd1c3] bg-[#faf6ef] text-center text-[0.82rem] text-[#9e9287]">
                Markdown output will appear here.
              </div>
            )}
          </ResultCard>

          <ResultCard
            title="Stable URL"
            action={
              result ? (
                <Button
                  type="button"
                  variant="outline"
                  className="h-7 px-3 text-[0.78rem]"
                  onClick={() => copyText("image", result.imageUrl)}
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copiedField === "image" ? "Copied" : "Copy URL"}
                </Button>
              ) : undefined
            }
          >
            {result ? (
              <div className="space-y-3">
                <p className="break-all rounded-md border border-[#e8dfd3] bg-[#faf6ef] px-3 py-3 font-mono text-[0.78rem] leading-5 text-[#5e564e]">
                  {result.imageUrl}
                </p>
                <a
                  href={result.graphUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[0.8rem] text-[#7d756c] transition hover:text-black"
                >
                  View GitHub contributors
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ) : (
              <div className="flex min-h-[130px] items-center justify-center rounded-md border border-dashed border-[#dbd1c3] bg-[#faf6ef] text-center text-[0.82rem] text-[#9e9287]">
                Stable image URL will appear here.
              </div>
            )}
          </ResultCard>
        </div>

        <div id="notes" className="grid gap-2 pt-1 md:grid-cols-3">
          {[
            "The exported link stays stable while the SVG refreshes later through the render route.",
            "By default the gallery uses 12 columns and can be adjusted between 6 and 24.",
            "Up to 256 contributors are fetched while the image height adapts to the actual count.",
          ].map((item) => (
            <div
              key={item}
              className="rounded-md border border-[#ddd3c6] bg-[#fffdf8] px-3 py-2.5 text-[0.78rem] leading-5 text-[#8a8279]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
