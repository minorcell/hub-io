"use client";

import { Copy, ExternalLink } from "lucide-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/result-card";
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
  if (typeof window === "undefined") return undefined;
  return window.location.origin;
}

export function RepoOnboardingForm() {
  const [repository, setRepository] = useState("");
  const [columns, setColumns] = useState(String(DEFAULT_RENDER_OPTIONS.columns));
  const [maxCount, setMaxCount] = useState(String(DEFAULT_RENDER_OPTIONS.maxCount));
  const [avatarSize, setAvatarSize] = useState(String(DEFAULT_RENDER_OPTIONS.avatarSize));
  const [includeBots, setIncludeBots] = useState(false);
  const [excludeInput, setExcludeInput] = useState("");
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
      const exclude = excludeInput
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      const options = normalizeRenderOptions({
        columns: Number(columns),
        maxCount: Number(maxCount),
        avatarSize: Number(avatarSize),
        includeBots,
        exclude,
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
    <section id="product" className="mx-auto w-full max-w-[1180px] px-5 pb-16 pt-6 md:px-8 md:pt-8">

      {/* Hero */}
      <div className="mb-6 pb-6 border-b border-[#e4dbd0]">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-[#a89f95]">
          GitHub README tooling
        </p>
        <h1 className="mt-2 max-w-[34rem] [font-family:var(--font-display)] text-[2rem] leading-[1.12] tracking-[-0.03em] text-[#171410] sm:text-[2.5rem]">
          Stable contributor badges for any GitHub repository
        </h1>
        <p className="mt-3 max-w-[38rem] text-[0.9rem] leading-[1.7] text-[#625a52]">
          Paste a public repo URL and get a permanent SVG image link. Drop it
          into your README once — it stays current automatically.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "Transparent SVG",
            "Markdown-ready",
            "No OAuth or setup",
            "Auto-refreshes daily",
          ].map((feature) => (
            <span
              key={feature}
              className="rounded border border-[#d8cebf] bg-[#fffdf8] px-2.5 py-1 text-[0.75rem] text-[#5f574f]"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">

        {/* Repo input */}
        <div className="flex gap-2 rounded-lg border border-[#dcd2c5] bg-[#fffdf8] p-1.5 shadow-[0_2px_8px_rgba(57,44,29,0.05)]">
          <Input
            id="repository"
            value={repository}
            onChange={(e) => setRepository(e.target.value)}
            placeholder="owner/repo or GitHub URL"
            className="h-8 rounded-md border-0 bg-transparent px-3 text-[0.875rem] shadow-none focus-visible:ring-0"
          />
          <Button type="submit" variant="light" className="h-7 shrink-0 px-5 text-[0.8rem]">
            Generate
          </Button>
        </div>

        {/* Options grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="space-y-1.5">
            <Label htmlFor="columns" className="text-[0.75rem] text-[#7d756c]">
              Columns
              <span className="ml-1 text-[#b5ada4]">6–24</span>
            </Label>
            <Input
              id="columns"
              type="number"
              min={6}
              max={24}
              value={columns}
              onChange={(e) => setColumns(e.target.value)}
              className="h-8 rounded-md bg-[#fffdf8] text-[0.875rem]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="maxCount" className="text-[0.75rem] text-[#7d756c]">
              Max contributors
              <span className="ml-1 text-[#b5ada4]">1–256</span>
            </Label>
            <Input
              id="maxCount"
              type="number"
              min={1}
              max={256}
              value={maxCount}
              onChange={(e) => setMaxCount(e.target.value)}
              className="h-8 rounded-md bg-[#fffdf8] text-[0.875rem]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="avatarSize" className="text-[0.75rem] text-[#7d756c]">
              Avatar size (px)
              <span className="ml-1 text-[#b5ada4]">48–88</span>
            </Label>
            <Input
              id="avatarSize"
              type="number"
              min={48}
              max={88}
              value={avatarSize}
              onChange={(e) => setAvatarSize(e.target.value)}
              className="h-8 rounded-md bg-[#fffdf8] text-[0.875rem]"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[0.75rem] text-[#7d756c]">Bots</Label>
            <div className="inline-flex h-8 w-full items-center gap-2.5 rounded-md border border-[#d8cebf] bg-[#fffdf8] px-3">
              <Checkbox
                id="includeBots"
                checked={includeBots}
                onCheckedChange={(checked) => setIncludeBots(checked === true)}
              />
              <Label
                htmlFor="includeBots"
                className="cursor-pointer text-[0.8rem] font-normal text-[#5f574f]"
              >
                Include bots
              </Label>
            </div>
          </div>
        </div>

        {/* Exclude logins */}
        <div className="space-y-1.5">
          <Label htmlFor="exclude" className="text-[0.75rem] text-[#7d756c]">
            Exclude logins
            <span className="ml-1 text-[#b5ada4]">comma-separated</span>
          </Label>
          <Input
            id="exclude"
            value={excludeInput}
            onChange={(e) => setExcludeInput(e.target.value)}
            placeholder="renovate-bot, dependabot, ghost"
            className="h-8 rounded-md bg-[#fffdf8] text-[0.875rem]"
          />
        </div>
      </form>

      {/* Results */}
      <div id="results" className="mt-8 grid gap-4">
        <ResultCard
          title="Contributor Preview"
          action={
            result ? (
              <Button asChild variant="outline" className="h-7 px-3 text-[0.75rem]">
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
            <div className="flex min-h-[160px] items-center justify-center rounded-md border border-dashed border-[#dbd1c3] bg-[#faf6ef] px-6 text-center text-[0.82rem] text-[#9e9287]">
              Contributor grid will appear here after you generate a link.
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
                  className="h-7 px-3 text-[0.75rem]"
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
              <div className="flex min-h-[120px] items-center justify-center rounded-md border border-dashed border-[#dbd1c3] bg-[#faf6ef] text-center text-[0.82rem] text-[#9e9287]">
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
                  className="h-7 px-3 text-[0.75rem]"
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
              <div className="flex min-h-[120px] items-center justify-center rounded-md border border-dashed border-[#dbd1c3] bg-[#faf6ef] text-center text-[0.82rem] text-[#9e9287]">
                Stable image URL will appear here.
              </div>
            )}
          </ResultCard>
        </div>

        {/* URL params reference */}
        <div className="grid grid-cols-2 gap-2 pt-1 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { param: "cols", range: "6–24", desc: "Grid columns" },
            { param: "max", range: "1–256", desc: "Max contributors" },
            { param: "size", range: "48–88 px", desc: "Avatar size" },
            { param: "bots", range: "0 / 1", desc: "Include bots" },
            { param: "exclude", range: "a,b,c", desc: "Exclude logins" },
          ].map(({ param, range, desc }) => (
            <div
              key={param}
              className="rounded-md border border-[#ddd3c6] bg-[#fffdf8] px-3 py-2"
            >
              <p className="font-mono text-[0.75rem] font-medium text-[#c06a3d]">{param}</p>
              <p className="mt-0.5 text-[0.72rem] text-[#8a8279]">{desc}</p>
              <p className="mt-0.5 font-mono text-[0.68rem] text-[#b5ada4]">{range}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
