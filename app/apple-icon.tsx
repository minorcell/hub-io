import { ImageResponse } from "next/og";
import { getLogoDataUrl } from "@/lib/logo";

export const runtime = "nodejs";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default async function AppleIcon() {
  const logoDataUrl = await getLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fffaf3",
          padding: "18px",
        }}
      >
        <img
          src={logoDataUrl}
          alt="Hub-IO logo"
          width={144}
          height={115}
          style={{
            objectFit: "contain",
          }}
        />
      </div>
    ),
    size
  );
}
