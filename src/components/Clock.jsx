import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  

  // Format time for Cairo (UTC+3 / UTC+2)
  const options = {
    timeZone: "Africa/Cairo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const cairoTime = time.toLocaleTimeString("en-US", options);
  const cairoDate = time.toLocaleDateString("en-US", {
    timeZone: "Africa/Cairo",
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="flex flex-col items-center gap-1 group animate-fade-in">
      <div className="relative">
        <div className="text-4xl font-black bg-linear-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent tracking-tighter tabular-nums drop-shadow-sm group-hover:scale-105 transition-transform duration-500 ">
          {cairoTime}
        </div>
        <div className="absolute -inset-1 bg-purple-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
      <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        Cairo, Egypt
      </div>
      <div className="mt-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 text-[10px] font-medium text-white/40 group-hover:text-white/60 transition-colors">
        {cairoDate}
      </div>
    </div>
  );
}

export default Clock;
