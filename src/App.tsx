import { useState } from "react";

import AppInfo from "./components/AppInfo";
import IOInput from "./components/IOInput";
import JSONBlock from "./components/JSONBlock";
import CanvasImg from "./components/CanvasImg";
import Footer from "./components/Footer";

export interface DeveloperInfo {
  avatar_url: string;
  contributions: number;
  login: string;
  url: string;
}

function App() {
  const [developerInfo, setDeveloperInfo] = useState<DeveloperInfo[]>([]);

  return (
    <div className="w-screen min-h-screen flex flex-col justify-between items-center bg-gradient-to-r from-slate-900 to-purple-900">
      <AppInfo />
      <IOInput setDeveloperInfo={setDeveloperInfo} />
      <div className="w-full min-h-[40vh] py-12 flex items-center justify-center gap-12">
        <CanvasImg developerInfo={developerInfo} />
        <JSONBlock developerInfo={developerInfo} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
