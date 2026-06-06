import { useState, useEffect } from "react";

function Timer() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("mode") || "focus";
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("timeLeft");
    return saved ? JSON.parse(saved) : 25 * 60;
  });

  const [isActive, setIsActive] = useState(() => {
    const saved = localStorage.getItem("isActive");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("isActive", JSON.stringify(isActive));
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsActive(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  function getModeDuration(currentMode) {
    switch (currentMode) {
      case "focus":
        return 25 * 60;
      case "shortBreak":
        return 5 * 60;
      case "longBreak":
        return 15 * 60;
      default:
        return 25 * 60;
    }
  }

  function getModeLabel(currentMode) {
    switch (currentMode) {
      case "focus":
        return "Focus";
      case "shortBreak":
        return "Short Break";
      case "longBreak":
        return "Long Break";
      default:
        return currentMode;
    }
  }

  function switchMode(newMode) {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(getModeDuration(newMode));
  }

  function resetTimer() {
    setIsActive(false);
    setTimeLeft(getModeDuration(mode));
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  const totalTime = getModeDuration(mode);
  const progress = timeLeft / totalTime;

  return (
    <div className="flex flex-col items-center">
      {/* Mode Buttons */}
      <div className="flex gap-4 mb-8">
        {["focus", "shortBreak", "longBreak"].map((currentMode) => (
          <button
            key={currentMode}
            onClick={() => switchMode(currentMode)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              mode === currentMode
                ? "bg-white/10 text-white border-white/20"
                : "text-white/50 hover:text-white/80"
            } border border-transparent`}
          >
            {getModeLabel(currentMode)}
          </button>
        ))}
      </div>

      {/* Circular Timer */}
      <div className="relative flex items-center justify-center w-64 h-64 mb-8">
        <svg className="w-full h-full -rotate-90 transform">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-white/5"
          />

          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={753.98}
            strokeDashoffset={753.98 * (1 - progress)}
            className={`transition-all duration-1000 ease-linear ${
              mode === "focus"
                ? "text-purple-500"
                : "text-orange-500"
            }`}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute text-6xl font-bold tracking-tighter tabular-nums">
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={() => setIsActive((prev) => !prev)}
          className={`w-32 py-3 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
            isActive
              ? "bg-white/10 text-white"
              : "bg-white text-black"
          }`}
        >
          {isActive ? "Pause" : "Start"}
        </button>

        <button
          onClick={resetTimer}
          className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Timer;