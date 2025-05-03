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
    <div className="flex items-center space-x-2">
      <Globe className="mr-2 h-5 w-5" />
      <button
        className={`border-1 w-18 h-7 rounded-full cursor-pointer flex items-center p-1 transition-colors duration-200 ${
          isOn ? "border-blue-500 justify-start" : "border-red-500 justify-end"
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
        <motion.div
          className={`w-5 h-5 rounded-full shadow-md flex items-center justify-center text-xs font-medium ${
            isOn ? "bg-blue-400" : "bg-red-400"
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
      </button>
    </div>
  );
}
