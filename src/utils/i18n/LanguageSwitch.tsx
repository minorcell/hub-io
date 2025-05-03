import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useI18n } from "./I18nContext";
import { Language } from "./types";
import { Globe } from "lucide-react";

export default function LanguageSwitch() {
  const { currentLanguage, setLanguage, t } = useI18n();
  const [isOn, setIsOn] = useState(currentLanguage === "en");

  useEffect(() => {
    setIsOn(currentLanguage === "en");
  }, [currentLanguage]);

  const toggleLanguage = () => {
    const newLanguage: Language = isOn ? "zh" : "en";
    setLanguage(newLanguage);
    setIsOn(!isOn);
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-20 group-hover:bg-blue-500/30 transition-all duration-300 blur-sm"></div>
      <div className="relative flex items-center space-x-2">
        <Globe className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
        <button
          className={`relative w-14 h-7 rounded-full cursor-pointer flex items-center p-1 bg-black/30 border border-white/10 transition-all duration-300 group-hover:border-blue-500/30 ${
            isOn ? "justify-start" : "justify-end"
          }`}
          onClick={toggleLanguage}
          title={
            isOn
              ? t({ zh: "切换成中文", en: "Switch to Chinese" })
              : t({
                  zh: "切换成英文",
                  en: "Switch to English",
                })
          }
        >
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-30"></div>
          </div>

          <motion.div
            className={`w-5 h-5 rounded-full shadow-md flex items-center justify-center text-xs font-medium z-10 ${
              isOn
                ? "bg-gradient-to-r from-blue-400 to-blue-500"
                : "bg-gradient-to-r from-purple-400 to-purple-500"
            }`}
            layout
            transition={{
              type: "spring",
              stiffness: 700,
              damping: 30,
            }}
          >
            {isOn ? "En" : "中"}
          </motion.div>

          <div className="absolute inset-0 flex justify-between items-center px-1.5 pointer-events-none">
            <span
              className={`text-[10px] ${
                !isOn ? "text-white/70" : "text-white/30"
              } transition-colors duration-300`}
            >
              CH
            </span>
            <span
              className={`text-[10px] ${
                isOn ? "text-white/70" : "text-white/30"
              } transition-colors duration-300`}
            >
              英
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
