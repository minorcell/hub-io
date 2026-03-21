import { ImageResponse } from "next/og";
import { getLogoDataUrl } from "@/lib/logo";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${siteConfig.name} social preview`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoDataUrl = await getLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at top right, #f3c6ad 0%, #f8f3eb 33%, #f3ede3 100%)",
          color: "#171410",
          padding: "58px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              maxWidth: "760px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                fontSize: "22px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#8a7667",
              }}
            >
              <span>Hub-IO</span>
              <span>README visuals</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                lineHeight: 1.04,
                fontSize: "72px",
                fontWeight: 700,
              }}
            >
              <span>GitHub Contributors</span>
              <span>SVG Generator</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: "290px",
              height: "290px",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "44px",
              background: "rgba(255, 250, 243, 0.96)",
              border: "1px solid rgba(125, 117, 108, 0.2)",
            }}
          >
            <img
              src={logoDataUrl}
              alt="Hub-IO logo"
              width={228}
              height={182}
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              fontSize: "30px",
              lineHeight: 1.32,
              maxWidth: "960px",
              color: "#4d433a",
            }}
          >
            Generate a stable contributor image URL and Markdown snippet for any
            public GitHub repository README.
          </div>
          <div
            style={{
              display: "flex",
              gap: "18px",
              fontSize: "22px",
              color: "#7d756c",
            }}
          >
            <span>Public repos</span>
            <span>Markdown ready</span>
            <span>Transparent SVG</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
