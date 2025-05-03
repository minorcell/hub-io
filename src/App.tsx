import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { I18nProvider } from "./i18n/I18nContext";
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
        <div className="font-IoNormal select-none w-screen min-h-screen flex flex-col justify-between items-center bg-slate-900">
          <AppInfo />
          <IOInput setDeveloperInfo={setDeveloperInfo} />
          <div className="w-full md:w-4/5 flex flex-col items-center justify-center gap-8 mb-12 md:px-0 px-4">
            <CanvasImg developerInfo={developerInfo} />
            <MDBlock developerInfo={developerInfo} />
            <JSONBlock developerInfo={developerInfo} />
          </div>
          <Footer />
        </div>
        <ToastContainer />
      </I18nProvider>
    </>
  );
}

export default App;
