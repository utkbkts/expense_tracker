const Hero = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black-400">
      <div className="light light-bottom-left"></div>
      <div className="light light-top-right"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-4xl font-bold text-white flex flex-col gap-5 text-center">
        {/* Sol köşe parantezi */}
        <div className="absolute left-0 top-42 transform -translate-y-1/2 flex flex-col items-start gap-2">
          <span className="text-black-200 text-6xl font-mono">[</span>
        </div>

        <div className="space-y-6 max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Check all your accounts
          </h1>

          <h1 className="text-4xl font-semibold opacity-90">
            And do it <span className="text-cyan-400 font-bold">for free</span>
          </h1>

          <h1 className="text-2xl leading-relaxed text-gray-300 font-medium">
            Your budget is now under control with our monthly account monitoring
            system.
          </h1>
        </div>

        {/* Sağ köşe parantezi */}
        <div className="absolute right-0 top-42 transform -translate-y-1/2 flex flex-col items-end gap-2">
          <span className="text-black-200 text-6xl font-mono">]</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
