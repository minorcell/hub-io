import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { RepoOnboardingForm } from "@/components/repo-onboarding-form";
import { Button } from "@/components/ui/button";
import { absoluteSiteUrl, siteConfig } from "@/lib/site";

const featureCards = [
  {
    title: "Stable contributor image URLs",
    description:
      "Each repository gets a deterministic `/r/owner/repo` route, so your README keeps the same image URL while the SVG refreshes behind the scenes.",
  },
  {
    title: "Markdown-ready output",
    description:
      "Generate a GitHub contributor badge snippet you can paste into README files, docs portals, changelogs, or profile pages in one step.",
  },
  {
    title: "Built for public GitHub repositories",
    description:
      "No app install, no OAuth flow, and no repository-side config. Paste a public repo URL and export a transparent contributors SVG immediately.",
  },
];

const workflowSteps = [
  "Paste a public repository in `owner/repo` format or use the full GitHub URL.",
  "Tune the contributor grid with column count and optional bot inclusion.",
  "Copy the stable SVG URL or Markdown snippet and drop it into your README.",
];

const faqItems = [
  {
    question: "Does Hub-IO need GitHub login or repository installation?",
    answer:
      "No. Hub-IO works against public GitHub repositories and generates the contributor SVG without OAuth, app installation, or repository config files.",
  },
  {
    question: "Will my contributor image URL stay the same over time?",
    answer:
      "Yes. The exported `/r/owner/repo` link stays stable. The rendered SVG is refreshed through cache revalidation, so your README can keep a single permanent image URL.",
  },
  {
    question: "Where can I use the generated contributor SVG?",
    answer:
      "The output is designed for GitHub README files, documentation sites, team pages, open source landing pages, and any Markdown surface that supports linked images.",
  },
  {
    question: "Can I include bot accounts in the contributor grid?",
    answer:
      "Yes. Bot accounts are excluded by default, but you can enable them with the toggle before copying the final SVG URL or Markdown snippet.",
  },
];

const exampleSnippet = `[![Contributors](${absoluteSiteUrl("/r/octocat/Hello-World?cols=8")})](https://github.com/octocat/Hello-World/graphs/contributors)`;

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    image: absoluteSiteUrl("/opengraph-image"),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Stable GitHub contributors SVG URLs",
      "README-ready Markdown snippets",
      "Transparent avatar grid output",
      "Adjustable column count",
      "Optional bot inclusion",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
];

export const metadata: Metadata = {
  title: "GitHub Contributors SVG Generator for README",
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  keywords: [...siteConfig.keywords],
  openGraph: {
    title: siteConfig.ogTitle,
    description: siteConfig.ogDescription,
    url: "/",
  },
  twitter: {
    title: siteConfig.ogTitle,
    description: siteConfig.ogDescription,
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f0e8] text-[#171410]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="border-b border-[#ded4c7] bg-[#f7f3ed]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-5 py-2 md:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-5 w-5">
              <Image
                src="/io-logo.png"
                alt="Hub-IO logo"
                fill
                priority
                sizes="20px"
                className="object-contain"
              />
            </div>
            <span className="[font-family:var(--font-display)] text-[1.1rem] font-semibold tracking-tight text-[#171410]">
              Hub-IO
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              className="hidden h-8 px-3 text-[0.8rem] md:inline-flex"
            >
              <a
                href="https://github.com/minorcell/hub-io"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-3.5 w-3.5" />
                Project
              </a>
            </Button>
            <Button asChild className="h-8 px-3 text-[0.8rem]">
              <a href="#product">
                Open generator
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <RepoOnboardingForm />

      <section
        aria-labelledby="seo-overview"
        className="border-t border-[#ded4c7] bg-[#f7f3ed]"
      >
        <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-5 py-16 md:px-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-5">
            <p className="text-[0.75rem] font-medium uppercase tracking-[0.22em] text-[#9e9287]">
              GitHub README tooling
            </p>
            <h2
              id="seo-overview"
              className="max-w-[38rem] [font-family:var(--font-display)] text-[1.9rem] leading-[1.08] tracking-[-0.03em] text-[#171410] sm:text-[2.3rem]"
            >
              A GitHub contributors SVG generator that search engines can
              understand and maintainers can paste in seconds.
            </h2>
            <p className="max-w-[41rem] text-[0.95rem] leading-7 text-[#625a52]">
              Hub-IO generates a stable contributor image URL for public GitHub
              repositories and pairs it with a Markdown snippet that drops
              directly into README files. The result is a transparent contributor
              avatar grid you can reuse across GitHub, documentation sites, and
              project landing pages without changing links later.
            </p>
          </div>

          <div className="grid gap-2 self-start rounded-2xl border border-[#ddd3c6] bg-[#fffdf8] p-4 shadow-[0_8px_24px_rgba(59,46,30,0.06)]">
            {[
              ["Format", "Transparent SVG"],
              ["Input", "Public GitHub repositories"],
              ["Output", "Stable URL + Markdown snippet"],
              ["Controls", "Columns and bot inclusion"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 rounded-xl border border-[#eee5d8] bg-[#faf6ef] px-3 py-2.5 text-[0.8rem]"
              >
                <span className="text-[#8a8279]">{label}</span>
                <span className="font-medium text-[#2b241d]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        aria-labelledby="how-it-works-title"
        className="border-t border-[#ded4c7] bg-[#f5f0e8]"
      >
        <div className="mx-auto w-full max-w-[1180px] px-5 py-16 md:px-8">
          <div className="max-w-[42rem]">
            <p className="text-[0.75rem] font-medium uppercase tracking-[0.22em] text-[#9e9287]">
              Why Hub-IO
            </p>
            <h2
              id="how-it-works-title"
              className="mt-3 [font-family:var(--font-display)] text-[1.85rem] leading-[1.08] tracking-[-0.03em] text-[#171410] sm:text-[2.2rem]"
            >
              Ship cleaner contributor sections in your README without adding new
              repo setup.
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featureCards.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#ddd3c6] bg-[#fffdf8] p-5 shadow-[0_4px_16px_rgba(59,46,30,0.05)]"
              >
                <h3 className="text-[1rem] font-semibold text-[#171410]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.88rem] leading-6 text-[#625a52]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <article className="rounded-2xl border border-[#ddd3c6] bg-[#fffdf8] p-5 shadow-[0_4px_16px_rgba(59,46,30,0.05)]">
              <h3 className="text-[1rem] font-semibold text-[#171410]">
                How the contributor SVG flow works
              </h3>
              <ol className="mt-4 space-y-3 text-[0.88rem] leading-6 text-[#625a52]">
                {workflowSteps.map((step, index) => (
                  <li
                    key={step}
                    className="flex items-start gap-3 rounded-xl border border-[#eee5d8] bg-[#faf6ef] px-3 py-3"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#171410] text-[0.78rem] font-semibold text-[#fff9f2]">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </article>

            <article
              id="readme-example"
              className="rounded-2xl border border-[#ddd3c6] bg-[#fffdf8] p-5 shadow-[0_4px_16px_rgba(59,46,30,0.05)]"
            >
              <h3 className="text-[1rem] font-semibold text-[#171410]">
                Example Markdown snippet
              </h3>
              <p className="mt-3 max-w-[44rem] text-[0.88rem] leading-6 text-[#625a52]">
                This is the exact linked image pattern Hub-IO produces. It keeps
                the GitHub contributors page as the click target while the image
                source stays on your deployed Hub-IO domain.
              </p>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-[#e8dfd3] bg-[#faf6ef] px-4 py-4 font-mono text-[0.78rem] leading-6 text-[#5e564e]">
                <code>{exampleSnippet}</code>
              </pre>
            </article>
          </div>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-title"
        className="border-t border-[#ded4c7] bg-[#f7f3ed]"
      >
        <div className="mx-auto w-full max-w-[1180px] px-5 py-16 md:px-8">
          <div className="max-w-[38rem]">
            <p className="text-[0.75rem] font-medium uppercase tracking-[0.22em] text-[#9e9287]">
              FAQ
            </p>
            <h2
              id="faq-title"
              className="mt-3 [font-family:var(--font-display)] text-[1.85rem] leading-[1.08] tracking-[-0.03em] text-[#171410] sm:text-[2.2rem]"
            >
              Common questions about GitHub contributor badges and SVG links.
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <article
                key={item.question}
                className="rounded-2xl border border-[#ddd3c6] bg-[#fffdf8] p-5 shadow-[0_4px_16px_rgba(59,46,30,0.05)]"
              >
                <h3 className="text-[1rem] font-semibold text-[#171410]">
                  {item.question}
                </h3>
                <p className="mt-3 text-[0.88rem] leading-6 text-[#625a52]">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
