import { useEffect, useRef, useState } from "react";
import type { DeveloperInfo } from "../App";
import { toast } from "react-toastify";
import { Download } from "lucide-react";

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
      setImagesLoaded(false);
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
        const maxCanvasWidth = Math.min(800, window.innerWidth - 40);

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
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "contributors.png";
      link.click();
      toast.success("Image exported successfully!");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Contributors Image</h2>
        {imagesLoaded && (
          <button
            onClick={handleExport}
            className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <Download size={16} className="mr-2" />
            Export Image
          </button>
        )}
      </div>
      <div
        className="flex justify-center items-center bg-transparent"
        style={{ minHeight: "300px" }}
      >
        {developerInfo.length > 0 ? (
          <canvas
            ref={canvasRef}
            className="max-w-full h-auto bg-transparent rounded"
          />
        ) : (
          <p className="text-gray-400 text-center">No data available</p>
        )}
      </div>
    </div>
  );
}

export default CanvasImg;
