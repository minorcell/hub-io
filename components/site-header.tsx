import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubStarButton } from "@/components/github-star-button";

export async function SiteHeader() {
  return (
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
          <GitHubStarButton />
          <Button asChild className="h-8 px-3 text-[0.8rem]">
            <a href="#product">
              Open generator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
