import { useState, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import components
import AppInfo from "./components/AppInfo";
import IOInput from "./components/IOInput";
import JSONBlock from "./components/JSONBlock";
import CanvasImg from "./components/CanvasImg";
import MDBlock from "./components/MDBlock";
import Footer from "./components/Footer";

// Import from API
import type { Contributor } from "./api/devrloper";

// Define loading state type
export type LoadingState = "idle" | "loading" | "success" | "error";

function App() {
  // State management
  const [developerInfo, setDeveloperInfo] = useState<Contributor[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  
  // Derived state
  const hasContributors = useMemo(() => developerInfo.length > 0, [developerInfo]);
  
  return (
    <>
      <div className="font-IoNormal select-none w-screen min-h-screen flex flex-col justify-between items-center bg-slate-900">
        <AppInfo />
        <IOInput 
          setDeveloperInfo={setDeveloperInfo} 
          setLoadingState={setLoadingState}
          loadingState={loadingState}
        />
        
        {hasContributors && (
          <div className="w-full md:w-4/5 flex flex-col items-center justify-center gap-8 mb-12 md:px-0 px-4">
            <CanvasImg developerInfo={developerInfo} />
            <MDBlock developerInfo={developerInfo} />
            <JSONBlock developerInfo={developerInfo} />
          </div>
        )}
        
        <Footer />
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;
