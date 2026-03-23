"use client";

import { RefObject, useEffect } from "react";
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/github.css";

// Register Python language
hljs.registerLanguage("python", python);

interface StagePanelProps {
  code: string;
  activeTab: "code" | "canvas" | "graphs" | "processing";
  onTabChange: (tab: "code" | "canvas" | "graphs" | "processing") => void;
  turtleCanvasRef: RefObject<HTMLCanvasElement | null>;
  graphsCanvasRef: RefObject<HTMLCanvasElement | null>;
  processingCanvasRef: RefObject<HTMLCanvasElement | null>;
}

export default function StagePanel({
  code,
  activeTab,
  onTabChange,
  turtleCanvasRef,
  graphsCanvasRef,
  processingCanvasRef,
}: StagePanelProps) {
  // Initialize canvases
  useEffect(() => {
    const clearCanvas = (canvas: HTMLCanvasElement | null, bgColor = "white") => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    clearCanvas(turtleCanvasRef.current);
    clearCanvas(graphsCanvasRef.current);
    clearCanvas(processingCanvasRef.current, "rgb(200, 200, 200)");
  }, [turtleCanvasRef, graphsCanvasRef, processingCanvasRef]);

  const tabs = [
    { id: "code" as const, label: "Output" },
    { id: "canvas" as const, label: "Turtle" },
    { id: "graphs" as const, label: "Graphs" },
    { id: "processing" as const, label: "Processing" },
  ];

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        background: "var(--bg-surface)",
        borderLeft: "1px solid var(--border)",
      }}
    >
      {/* Stage header with size controls */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{
          background: "var(--bg-deep)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="flex gap-1">
          <button
            className="w-8 h-7 rounded-md flex items-center justify-center text-xs font-semibold"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
            title="Small stage"
          >
            S
          </button>
          <button
            className="w-8 h-7 rounded-md flex items-center justify-center text-xs font-semibold"
            style={{
              background: "var(--accent)",
              border: "1px solid var(--accent)",
              color: "white",
            }}
            title="Large stage"
          >
            L
          </button>
          <button
            className="w-8 h-7 rounded-md flex items-center justify-center text-xs font-semibold"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
            title="Fullscreen"
          >
            F
          </button>
        </div>
      </div>

      {/* Tab header */}
      <div
        className="flex"
        style={{
          background: "var(--bg-deep)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="px-5 py-3 text-sm font-semibold transition-all"
            style={{
              background: activeTab === tab.id ? "var(--bg-surface)" : "transparent",
              color: activeTab === tab.id ? "var(--accent)" : "var(--text-muted)",
              borderBottom: activeTab === tab.id ? "3px solid var(--accent)" : "3px solid transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto" style={{ background: "var(--bg-deep)" }}>
        {/* Code output tab */}
        {activeTab === "code" && (
          <div className="p-3 h-full">
            <pre
              className="h-full overflow-auto p-4 rounded-xl text-sm font-mono"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                lineHeight: 1.6,
              }}
            >
              <code
                className="language-python"
                dangerouslySetInnerHTML={{
                  __html: code
                    ? hljs.highlight(code, { language: "python" }).value
                    : '<span style="color: var(--text-muted)"># Place blocks inside a "when program starts" block!</span>',
                }}
              />
            </pre>
          </div>
        )}

        {/* Turtle canvas tab */}
        {activeTab === "canvas" && (
          <div className="flex flex-col items-center justify-center p-4 gap-3 h-full">
            <canvas
              ref={turtleCanvasRef}
              width={340}
              height={280}
              className="rounded-xl"
              style={{
                background: "white",
                border: "2px solid var(--border)",
                boxShadow: "var(--shadow-md)",
              }}
            />
            <button
              onClick={() => {
                const canvas = turtleCanvasRef.current;
                if (canvas) {
                  const ctx = canvas.getContext("2d");
                  if (ctx) {
                    ctx.fillStyle = "white";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                  }
                }
              }}
              className="px-5 py-2 rounded-2xl text-sm font-semibold transition-all"
              style={{
                background: "var(--accent)",
                color: "white",
              }}
            >
              Clear Canvas
            </button>
          </div>
        )}

        {/* Graphs canvas tab */}
        {activeTab === "graphs" && (
          <div className="flex flex-col items-center justify-center p-4 gap-3 h-full">
            <canvas
              ref={graphsCanvasRef}
              width={340}
              height={280}
              className="rounded-xl"
              style={{
                background: "white",
                border: "2px solid var(--border)",
                boxShadow: "var(--shadow-md)",
              }}
            />
            <button
              onClick={() => {
                const canvas = graphsCanvasRef.current;
                if (canvas) {
                  const ctx = canvas.getContext("2d");
                  if (ctx) {
                    ctx.fillStyle = "white";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                  }
                }
              }}
              className="px-5 py-2 rounded-2xl text-sm font-semibold transition-all"
              style={{
                background: "var(--accent)",
                color: "white",
              }}
            >
              Clear Graphs
            </button>
          </div>
        )}

        {/* Processing canvas tab */}
        {activeTab === "processing" && (
          <div className="flex flex-col items-center justify-center p-4 gap-3 h-full">
            <canvas
              ref={processingCanvasRef}
              width={340}
              height={280}
              className="rounded-xl"
              style={{
                background: "rgb(200, 200, 200)",
                border: "2px solid var(--border)",
                boxShadow: "var(--shadow-md)",
              }}
            />
            <button
              onClick={() => {
                const canvas = processingCanvasRef.current;
                if (canvas) {
                  const ctx = canvas.getContext("2d");
                  if (ctx) {
                    ctx.fillStyle = "rgb(200, 200, 200)";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                  }
                }
              }}
              className="px-5 py-2 rounded-2xl text-sm font-semibold transition-all"
              style={{
                background: "var(--accent)",
                color: "white",
              }}
            >
              Clear Processing
            </button>
          </div>
        )}
      </div>

      {/* Sprite panel (Scratch-style) */}
      <div
        className="p-3"
        style={{
          background: "var(--bg-surface)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-4">
          {/* Sprite thumbnail */}
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center"
            style={{
              background: "white",
              border: "2px solid var(--accent)",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="15" fill="var(--accent)" />
              <text
                x="20"
                y="25"
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
              >
                Py
              </text>
            </svg>
          </div>

          {/* Sprite details */}
          <div className="flex-1">
            <input
              type="text"
              defaultValue="Script1"
              className="w-full px-3 py-2 rounded-lg text-sm font-semibold mb-2"
              style={{
                background: "var(--bg-deep)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                outline: "none",
              }}
              placeholder="Sprite name"
            />
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-muted)" }}>
                <span>x</span>
                <input
                  type="number"
                  defaultValue={0}
                  className="w-12 px-2 py-1 rounded-md text-center"
                  style={{
                    background: "var(--bg-deep)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    outline: "none",
                  }}
                />
              </div>
              <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-muted)" }}>
                <span>y</span>
                <input
                  type="number"
                  defaultValue={0}
                  className="w-12 px-2 py-1 rounded-md text-center"
                  style={{
                    background: "var(--bg-deep)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
