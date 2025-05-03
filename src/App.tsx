import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/animations.css";
import { I18nProvider } from "./utils/i18n/I18nContext";
import AppInfo from "./components/AppInfo";
import IOInput from "./components/IOInput";
import JSONBlock from "./components/JSONBlock";
import CanvasImg from "./components/CanvasImg";
import MDBlock from "./components/MDBlock";
import Footer from "./components/Footer";

export interface DeveloperInfo {
  avatar_url: string;
  contributions: number;
  login: string;
  html_url: string;
}

function App() {
  const [developerInfo, setDeveloperInfo] = useState<DeveloperInfo[]>([]);

  return (
    <>
      <I18nProvider>
        <div className="font-IoNormal select-none w-screen min-h-screen flex flex-col justify-between items-center bg-black overflow-hidden">
          <div className="fixed inset-0 bg-black">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 via-transparent to-purple-500/30 animate-gradient" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          </div>

          <div className="relative w-full z-10">
            <AppInfo />
          </div>

          <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <IOInput setDeveloperInfo={setDeveloperInfo} />
            <div className="w-full flex flex-col items-center justify-center gap-8 mb-12">
              <CanvasImg developerInfo={developerInfo} />
              <MDBlock developerInfo={developerInfo} />
              <JSONBlock developerInfo={developerInfo} />
            </div>
          </div>

          <div className="relative z-10 w-full">
            <Footer />
          </div>
        </div>
        <ToastContainer />
      </I18nProvider>
    </>
  );
}

export default App;
