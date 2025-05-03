import { useEffect, useRef, useState } from "react";
import type { DeveloperInfo } from "../App";
import { toast } from "react-toastify";
import { Download, AlertCircle } from "lucide-react";
import { useI18n } from "../utils/i18n/I18nContext";

export interface CanvasImgProps {
  developerInfo: DeveloperInfo[];
}

function CanvasImg({ developerInfo }: CanvasImgProps) {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (developerInfo.length === 0) {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      setImagesLoaded(false);
      setLoadingError(false);
      return;
    }

    setIsLoading(true);
    setLoadingError(false);

    const loadImages = async () => {
      try {
        const images = await Promise.all(
          developerInfo.map((dev) => {
            return new Promise<HTMLImageElement>((resolve, reject) => {
              const img = new Image();
              img.crossOrigin = "anonymous";
              img.src = dev.avatar_url;
              img.onload = () => resolve(img);
              img.onerror = () =>
                reject(new Error(`Unable to load image: ${dev.login}`));
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
            Math.ceil(images.length / maxPerRow) * (imgSize + padding) +
            padding;

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
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error loading image:", error);
        setLoadingError(true);
        setIsLoading(false);
        toast.error(
          t({
            zh: "无法加载部分或全部贡献者头像，请稍后重试",
            en: "Unable to load some or all contributor avatars, please try again later",
          })
        );
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
      toast.success(
        t({ zh: "图片导出成功！", en: "Image exported successfully!" })
      );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#151718] border border-[#26282B] rounded-xl shadow-xl overflow-hidden transition-all duration-200 hover:border-[#313438]">
      <div className="p-4 bg-gradient-to-b from-[#1C1D1F] to-[#151718] border-b border-[#26282B] flex justify-between items-center">
        <h2 className="text-[15px] font-medium text-[#E1E4E7]">
          {t({ zh: "贡献者图片", en: "Contributors Image" })}
        </h2>
        {imagesLoaded && (
          <button
            onClick={handleExport}
            className="flex items-center px-3 py-1.5 bg-[#2E2F31] text-[#E1E4E7] text-sm font-medium rounded-md hover:bg-[#3A3B3D] transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#4A4B4D] focus:ring-offset-1 focus:ring-offset-[#151718] group"
          >
            <Download size={14} className="mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
            {t({ zh: "导出图片", en: "Export Image" })}
          </button>
        )}
      </div>
      <div
        className="relative flex justify-center items-center bg-[#151718]"
        style={{ minHeight: "300px" }}
      >
        {developerInfo.length === 0 ? (
          <p className="text-[#71757A] text-center text-sm">
            {t({ zh: "暂无数据", en: "No data yet" })}
          </p>
        ) : (
          <>
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto bg-transparent rounded-lg"
            />
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#151718] bg-opacity-90 backdrop-blur-sm">
                <svg
                  className="animate-spin h-8 w-8 text-[#A9ACB1] mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="text-[#A9ACB1] text-sm">
                  {t({
                    zh: "正在加载贡献者头像...",
                    en: "Loading contributor avatars...",
                  })}
                </p>
              </div>
            )}
            {!isLoading && loadingError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#151718] bg-opacity-90 backdrop-blur-sm text-[#F04438]">
                <AlertCircle size={32} className="mb-4 opacity-80" />
                <p className="text-center mb-2 text-sm">
                  {t({
                    zh: "加载贡献者头像出错",
                    en: "Error loading contributor avatars",
                  })}
                </p>
                <p className="text-sm text-[#71757A] text-center">
                  {t({
                    zh: "可能是由于网络问题或 API 限制。",
                    en: "It may be due to network problems or API limitations.",
                  })}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CanvasImg;
