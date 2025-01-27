import { useEffect, useRef, useState } from "react";
import { DeveloperInfo } from "../App";

export interface CanvasImgProps {
  developerInfo: DeveloperInfo[];
}

function CanvasImg({ developerInfo }: CanvasImgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (developerInfo.length === 0) return;

    const loadImages = async () => {
      const images = await Promise.all(
        developerInfo.map((dev) => {
          return new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = dev.avatar_url;
            img.onload = () => resolve(img);
          });
        })
      );

      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const imgSize = 70;
        const padding = 20;
        const maxPerRow = 10;

        const canvasWidth = maxPerRow * (imgSize + padding) + padding;
        const canvasHeight =
          Math.ceil(images.length / maxPerRow) * (imgSize + padding) + padding;

        canvas.width = canvasWidth * 2;
        canvas.height = canvasHeight * 2;
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        images.forEach((img, index) => {
          const row = Math.floor(index / maxPerRow);
          const col = index % maxPerRow;

          const x = col * (imgSize + padding) + padding;
          const y = row * (imgSize + padding) + padding;

          ctx.save();
          ctx.beginPath();
          ctx.arc(x * 2 + imgSize, y * 2 + imgSize, imgSize, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();

          ctx.drawImage(img, x * 2, y * 2, imgSize * 2, imgSize * 2);

          ctx.restore();
        });

        setImagesLoaded(true);
      }
    };

    loadImages();
  }, [developerInfo]);

  const handleExport = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const dataUrl = canvas.toDataURL("image/webp");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "contributors.webp";
      link.click();
    }
  };

  return (
    <div className="h-[50vh] min-w-2/5 bg-transparent rounded-3xl flex flex-col items-center justify-between p-4 border border-slate-300 border-dashed">
      <canvas ref={canvasRef} className="w-full h-auto bg-transparent" />
      {imagesLoaded && (
        <button
          onClick={handleExport}
          className="mt-12 duration-300 h-12 px-6 rounded-xl bg-gradient-to-r from-slate-300 to-purple-300 hover:bg-gradient-to-r hover:from-slate-500 hover:to-purple-500 transition-colors active:translate-y-1 active:scale-95 focus:ring-2 focus:ring-offset-2 font-bold text-xl active:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:text-white"
        >
          Export Image
        </button>
      )}
    </div>
  );
}

export default CanvasImg;
