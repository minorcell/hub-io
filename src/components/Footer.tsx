import { useMemo } from "react";
import { Github, User } from "lucide-react";
import LanguageSwitch from "../i18n/LanguageSwitch";
import { useI18n } from "../i18n/I18nContext";

function Footer() {
  const { t } = useI18n();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="w-full bg-gray-800 text-gray-300 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
          <p className="text-xl font-bold text-white mb-2 sm:mb-0">Hub-IO</p>
          <p className="text-sm">
            {t(
              {
                zh: "© {{year}} 版权所有",
                en: "© {{year}} All Rights Reserved",
              },
              { year: currentYear }
            )}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <LanguageSwitch />
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/minorcell/hub-io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-white transition-colors duration-200"
            >
              <Github className="mr-2 h-5 w-5" />
              <span className="text-sm sm:text-base">
                {t({ zh: "项目", en: "Project" })}
              </span>
            </a>
            <a
              href="https://github.com/minorcell"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-white transition-colors duration-200"
            >
              <User className="mr-2 h-5 w-5" />
              <span className="text-sm sm:text-base">
                {t({ zh: "作者", en: "Author" })}
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
