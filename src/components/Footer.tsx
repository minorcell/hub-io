import { useMemo } from "react";

function Footer() {
  // 计算当前年份
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  return (
    <div className="w-full py-4 flex items-center justify-center text-white gap-4">
      <p>Hub-IO © {currentYear}</p>
    </div>
  );
}

export default Footer;
