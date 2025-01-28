import logo from "../assets/io-logo.png";

function AppInfo() {
  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-12">
          <div className="relative">
            <img
              src={logo}
              alt="io-logo"
              className="w-24 sm:w-32 md:w-40 animate-pulse"
            />
            <div className="absolute inset-0 bg-blue-500 filter blur-xl opacity-50 animate-pulse"></div>
          </div>
          <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-SixtyfourConvergence">
              Hub-IO
            </span>
          </h1>
        </div>
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Effortlessly retrieve GitHub repository information and export it to
          JSON or Image formats.
        </p>
      </div>
    </div>
  );
}

export default AppInfo;
