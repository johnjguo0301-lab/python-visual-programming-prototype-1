"use client";

import { useRef, useEffect } from "react";

interface ConsoleProps {
  output: Array<{ text: string; type: "stdout" | "stderr" }>;
  isRunning: boolean;
  pyodideStatus: string;
  onRun: () => void;
  onStop: () => void;
  onClear: () => void;
}

export default function Console({
  output,
  isRunning,
  pyodideStatus,
  onRun,
  onStop,
  onClear,
}: ConsoleProps) {
  const outputRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div
      className="flex flex-col"
      style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border)",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.08)",
      }}
    >
      {/* Toolbar */}
      <div
        className="flex items-center gap-2.5 px-4 py-2.5"
        style={{
          background: "var(--bg-deep)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Title */}
        <div
          className="flex items-center gap-2 mr-auto text-sm font-bold"
          style={{ color: "var(--text)" }}
        >
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded-md text-sm font-bold"
            style={{ background: "var(--accent)", color: "white" }}
          >
            {">"}
          </span>
          Console
        </div>

        {/* Status */}
        <span
          className="text-xs font-semibold px-3 py-1.5 rounded-md"
          style={{
            background: pyodideStatus === "Python ready" 
              ? "rgba(76, 175, 80, 0.15)" 
              : "rgba(255, 191, 0, 0.15)",
            color: pyodideStatus === "Python ready" 
              ? "var(--green)" 
              : "var(--cat-events)",
            animation: pyodideStatus !== "Python ready" ? "pulse 2s ease-in-out infinite" : "none",
          }}
        >
          {pyodideStatus}
        </span>

        {/* Run button */}
        <button
          onClick={onRun}
          disabled={isRunning || pyodideStatus !== "Python ready"}
          className="flex items-center gap-1.5 px-6 py-2.5 text-sm font-bold rounded-2xl transition-all"
          style={{
            background: "var(--green)",
            color: "white",
            opacity: isRunning || pyodideStatus !== "Python ready" ? 0.5 : 1,
            cursor: isRunning || pyodideStatus !== "Python ready" ? "not-allowed" : "pointer",
          }}
        >
          <span
            style={{
              width: 0,
              height: 0,
              borderLeft: "8px solid white",
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
            }}
          />
          Run
        </button>

        {/* Stop button */}
        <button
          onClick={onStop}
          disabled={!isRunning}
          className="px-5 py-2.5 text-sm font-bold rounded-2xl transition-all"
          style={{
            background: "var(--red)",
            color: "white",
            opacity: !isRunning ? 0.5 : 1,
            cursor: !isRunning ? "not-allowed" : "pointer",
          }}
        >
          Stop
        </button>

        {/* Clear button */}
        <button
          onClick={onClear}
          className="px-4 py-2.5 text-sm font-semibold rounded-lg transition-all"
          style={{
            background: "var(--bg-surface)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--btn-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--bg-surface)";
          }}
        >
          Clear
        </button>
      </div>

      {/* Output area */}
      <div
        ref={outputRef}
        className="flex-1 overflow-auto p-4 m-3 rounded-xl font-mono text-sm"
        style={{
          background: "white",
          border: "1px solid var(--border)",
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
        }}
      >
        {output.length === 0 ? (
          <span style={{ color: "var(--text-muted)" }}>
            # Output will appear here when you run your code...
          </span>
        ) : (
          output.map((line, index) => (
            <span
              key={index}
              style={{
                color: line.type === "stderr" ? "var(--red)" : "var(--text)",
                fontWeight: line.type === "stderr" ? 600 : 400,
              }}
            >
              {line.text}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
