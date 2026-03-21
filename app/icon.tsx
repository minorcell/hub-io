import { ImageResponse } from "next/og";
import { getLogoDataUrl } from "@/lib/logo";

export const runtime = "nodejs";
export const size = {
  width: 512,
  height: 512,
};
export const contentType = "image/png";

export default async function Icon() {
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
          background: "linear-gradient(135deg, #fffdf8 0%, #f2eadf 100%)",
          padding: "44px",
        }}
      >
        <img
          src={logoDataUrl}
          alt="Hub-IO logo"
          width={424}
          height={338}
          style={{
            objectFit: "contain",
          }}
        />
      </div>
    ),
    size
  );
}
