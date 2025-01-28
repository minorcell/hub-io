import { useEffect, useRef, useState } from "react";
import { DeveloperInfo } from "../App";
import { toast } from "react-toastify";

export interface CanvasImgProps {
  developerInfo: DeveloperInfo[];
}

function CanvasImg({ developerInfo }: CanvasImgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (developerInfo.length === 0) {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

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
        const padding = 15;
        const maxCanvasWidth = 800;

        const maxPerRow = Math.floor(maxCanvasWidth / (imgSize + padding));
        const canvasWidth = Math.min(
          maxCanvasWidth,
          maxPerRow * (imgSize + padding) + padding
        );
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
          ctx.arc(
            x * 2 + imgSize,
            y * 2 + imgSize,
            imgSize,
            0,
            Math.PI * 2
          );
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
      toast.success("Image exported successfully!");
    }
  };

  return (
    <div className="h-[50vh] min-w-2/5 bg-transparent rounded-xl flex flex-col items-center justify-between p-4 border border-slate-300 border-dashed">
      <canvas ref={canvasRef} className="w-full h-auto bg-transparent" />
      {imagesLoaded && (
        <button onClick={handleExport} className="io-button">
          Export Image
        </button>
      )}
    </div>
  );
}

export default CanvasImg;
