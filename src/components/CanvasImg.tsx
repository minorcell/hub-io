import { useEffect, useRef, useState } from "react";
import type { DeveloperInfo } from "../App";
import { toast } from "react-toastify";
import { Download, AlertCircle } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";

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
            en: "Unable to load some or all contributor avatars, please try again later"
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
      toast.success(t({ zh: "图片导出成功！", en: "Image exported successfully!" }));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">{t({ zh: "贡献者图片", en: "Contributors Image" })}</h2>
        {imagesLoaded && (
          <button
            onClick={handleExport}
            className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <Download size={16} className="mr-2" />
            {t({ zh: "导出图片", en: "Export Image" })}
          </button>
        )}
      </div>
      <div
        className="relative flex justify-center items-center bg-transparent"
        style={{ minHeight: "300px" }}
      >
        {developerInfo.length === 0 ? (
          <p className="text-gray-400 text-center">{t({ zh: "暂无数据", en: "No data yet" })}</p>
        ) : (
          <>
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto bg-transparent rounded"
            />
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75">
                <svg
                  className="animate-spin h-10 w-10 text-blue-500 mb-4"
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
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="text-gray-300">{t({ zh: "正在加载贡献者头像...", en: "Loading contributor avatars..." })}</p>
              </div>
            )}
            {!isLoading && loadingError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 text-red-400">
                <AlertCircle size={48} className="mb-4" />
                <p className="text-center mb-2">
                  {t({ zh: "加载贡献者头像出错", en: "Error loading contributor avatars" })}
                </p>
                <p className="text-sm text-gray-400 text-center">
                  {t({ zh: "可能是由于网络问题或 API 限制。", en: "It may be due to network problems or API limitations." })}
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
