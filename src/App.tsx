import { useState } from "react";

import { ToastContainer } from "react-toastify";
import AppInfo from "./components/AppInfo";
import IOInput from "./components/IOInput";
import JSONBlock from "./components/JSONBlock";
import CanvasImg from "./components/CanvasImg";
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
      <div className="select-none w-screen min-h-screen flex flex-col justify-between items-center bg-gray-900">
        <AppInfo />
        <IOInput setDeveloperInfo={setDeveloperInfo} />
        <div className="w-full min-h-[40vh] py-12 flex items-center justify-center gap-4">
          <CanvasImg developerInfo={developerInfo} />
          <JSONBlock developerInfo={developerInfo} />
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
