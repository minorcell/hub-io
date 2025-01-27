import { useMemo } from "react";
import { Github, User } from "lucide-react";

function Footer() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="w-full bg-gray-800 text-gray-300 py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 flex items-center gap-4">
            <p className="text-lg font-semibold">Hub-IO</p>
            <p className="text-sm">© {currentYear} All Rights Reserved</p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/minorcell/hub-io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-white transition-colors duration-200"
            >
              <Github className="mr-2 h-4 w-4" />
              <span>Project</span>
            </a>
            <a
              href="https://github.com/minorcell"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-white transition-colors duration-200"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Author</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
