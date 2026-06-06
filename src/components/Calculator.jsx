import { useState } from "react";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  const handleNumber = (num) => {
    if (display === "0") setDisplay(num);
    else setDisplay(display + num);
  };

  const handleOperator = (op) => {
    setEquation(display + " " + op + " ");
    setDisplay("0");
  };

  const calculate = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation("");
    } catch (e) {
      setDisplay("Error");
    }
  };

  const clear = () => {
    setDisplay("0");
    setEquation("");
  };

  const buttons = [
    { label: "C", action: clear, style: "text-red-400" },
    { label: "/", action: () => handleOperator("/"), style: "text-purple-400" },
    { label: "*", action: () => handleOperator("*"), style: "text-purple-400" },
    { label: "DEL", action: () => setDisplay(display.length > 1 ? display.slice(0, -1) : "0"), style: "text-orange-400" },
    { label: "7", action: () => handleNumber("7") },
    { label: "8", action: () => handleNumber("8") },
    { label: "9", action: () => handleNumber("9") },
    { label: "-", action: () => handleOperator("-"), style: "text-purple-400" },
    { label: "4", action: () => handleNumber("4") },
    { label: "5", action: () => handleNumber("5") },
    { label: "6", action: () => handleNumber("6") },
    { label: "+", action: () => handleOperator("+"), style: "text-purple-400" },
    { label: "1", action: () => handleNumber("1") },
    { label: "2", action: () => handleNumber("2") },
    { label: "3", action: () => handleNumber("3") },
    { label: "=", action: calculate, style: "bg-purple-600 text-white row-span-2" },
    { label: "0", action: () => handleNumber("0"), style: "col-span-2" },
    { label: ".", action: () => handleNumber(".") },
  ];

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-right overflow-hidden shadow-inner">
        <div className="text-xs text-white/30 h-4 mb-1 font-medium tracking-wider truncate">
          {equation}
        </div>
        <div className="text-3xl font-bold tracking-tighter truncate text-white">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            className={`h-12 rounded-xl font-bold transition-all active:scale-95 hover:bg-white/10 border border-transparent ${
              btn.style || "bg-white/5 text-white/80"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
