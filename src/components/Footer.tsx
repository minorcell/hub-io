import { useMemo } from "react";
import { Github, User } from "lucide-react";
import LanguageSwitch from "../utils/i18n/LanguageSwitch";
import { useI18n } from "../utils/i18n/I18nContext";

function Footer() {
  const { t } = useI18n();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="w-full border-t border-white/5 py-8 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Divider with gradient effect */}
        <div className="relative h-px w-full mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
          {/* Logo and copyright */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
            <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2 sm:mb-0">
              Hub-IO
            </p>
            <p className="text-sm text-gray-400">
              {t(
                {
                  zh: "© {{year}} 版权所有",
                  en: "© {{year}} All Rights Reserved",
                },
                { year: currentYear }
              )}
            </p>
          </div>

          {/* Links and language switch */}
          <div className="flex items-center space-x-6">
            <LanguageSwitch />
            <div className="flex items-center space-x-6">
              {/* Project link with hover effect */}
              <a
                href="https://github.com/minorcell/hub-io"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center text-gray-400 hover:text-white transition-all duration-300"
              >
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-20 group-hover:bg-blue-500 transition-all duration-300 blur-sm"></div>
                  <Github className="relative mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-sm">
                  {t({ zh: "项目", en: "Project" })}
                </span>
              </a>
              
              {/* Author link with hover effect */}
              <a
                href="https://github.com/minorcell"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center text-gray-400 hover:text-white transition-all duration-300"
              >
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-20 group-hover:bg-purple-500 transition-all duration-300 blur-sm"></div>
                  <User className="relative mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-sm">
                  {t({ zh: "作者", en: "Author" })}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
