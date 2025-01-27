import AppInfo from "./components/AppInfo";
import IOInput from "./components/IOInput";
import JSONBlock from "./components/JSONBlock";
import CanvasImg from "./components/CanvasImg";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-between items-center bg-gradient-to-r from-slate-900 to-purple-900">
      <AppInfo />
      <IOInput />
      <div className="w-4/5 py-12 flex items-center justify-center gap-8">
        <JSONBlock />
        <CanvasImg />
      </div>
      <Footer />
    </div>
  );
}

export default App;
