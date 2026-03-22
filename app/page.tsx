import type { Metadata } from "next";
import { RepoOnboardingForm } from "@/components/repo-onboarding-form";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "GitHub Contributors SVG Generator for README",
  description: siteConfig.description,
  alternates: { canonical: "/" },
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

export default async function Home() {
  return (
    <main className="min-h-screen bg-[#f5f0e8] text-[#171410]">
      <SiteHeader />
      <RepoOnboardingForm />
    </main>
  );
}
