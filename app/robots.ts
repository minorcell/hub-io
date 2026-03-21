import type { MetadataRoute } from "next";
import { absoluteSiteUrl, siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/r/"],
      },
    ],
    host: siteConfig.url,
    sitemap: absoluteSiteUrl("/sitemap.xml"),
  };
}
