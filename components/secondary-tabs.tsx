"use client";

import { useState } from "react";

interface SecondaryTabsProps {
  activeTab: "code" | "canvas" | "graphs" | "processing";
  onTabChange: (tab: "code" | "canvas" | "graphs" | "processing") => void;
  onCleanup: () => void;
  onRun: () => void;
  onStop: () => void;
  isRunning: boolean;
}

export default function SecondaryTabs({
  activeTab,
  onTabChange,
  onCleanup,
  onRun,
  onStop,
  isRunning,
}: SecondaryTabsProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "code" as const, label: "Code", color: "#855cd6" },
    { id: "canvas" as const, label: "Turtle", color: "#59c059" },
    { id: "graphs" as const, label: "Graphs", color: "#ff8c1a" },
  ];

  return (
    <div 
      className="flex items-center px-4 gap-1"
      style={{ 
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--border)",
        minHeight: "48px"
      }}
    >
      {/* Tab buttons */}
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="flex items-center gap-2 px-5 py-3 text-sm font-semibold cursor-pointer transition-all -mb-px"
          style={{
            background: activeTab === tab.id ? "var(--bg-surface)" : "var(--bg-deep)",
            border: activeTab === tab.id ? "1px solid var(--border)" : "none",
            borderBottom: activeTab === tab.id ? "1px solid var(--bg-surface)" : "none",
            borderRadius: "var(--radius-md) var(--radius-md) 0 0",
            color: activeTab === tab.id ? "var(--accent)" : "var(--text)",
          }}
        >
          <span
            className="w-5 h-5 rounded"
            style={{ background: tab.color }}
          />
          {tab.label}
        </button>
      ))}
      
      {/* Spacer */}
      <div className="flex-1" />
      
      {/* Search input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search blocks..."
        className="px-4 py-2 rounded-2xl text-sm max-w-48"
        style={{
          background: "var(--bg-deep)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          outline: "none",
        }}
      />
      
      {/* Cleanup button */}
      <button
        onClick={onCleanup}
        className="px-4 py-2 rounded-2xl text-sm font-semibold mr-2 transition-all"
        style={{
          background: "var(--bg-deep)",
          border: "1px solid var(--border)",
          color: "var(--text)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--accent)";
          e.currentTarget.style.color = "white";
          e.currentTarget.style.borderColor = "var(--accent)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--bg-deep)";
          e.currentTarget.style.color = "var(--text)";
          e.currentTarget.style.borderColor = "var(--border)";
        }}
      >
        Clean Up
      </button>
      
      {/* Run/Stop buttons (Scratch-style) */}
      <div className="flex items-center gap-2">
        <button
          onClick={onRun}
          disabled={isRunning}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
          style={{
            background: "var(--green)",
            border: "none",
            opacity: isRunning ? 0.5 : 1,
            cursor: isRunning ? "not-allowed" : "pointer",
          }}
          title="Run"
        >
          {/* Play triangle */}
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "12px solid white",
              borderTop: "7px solid transparent",
              borderBottom: "7px solid transparent",
              marginLeft: "3px",
            }}
          />
        </button>
        
        <button
          onClick={onStop}
          disabled={!isRunning}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
          style={{
            background: "var(--red)",
            border: "none",
            opacity: !isRunning ? 0.5 : 1,
            cursor: !isRunning ? "not-allowed" : "pointer",
          }}
          title="Stop"
        >
          {/* Stop square */}
          <div
            className="w-3.5 h-3.5 rounded-sm"
            style={{ background: "white" }}
          />
        </button>
      </div>
    </div>
  );
}
