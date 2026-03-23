"use client";

import { useState } from "react";

interface NavbarProps {
  projectName: string;
  onProjectNameChange: (name: string) => void;
  theme: "light" | "dark";
  onThemeChange: (theme: "light" | "dark") => void;
}

export default function Navbar({ projectName, onProjectNameChange, theme, onThemeChange }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav 
      className="flex items-center justify-between px-4 relative z-50"
      style={{ 
        background: "var(--header-bg)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
      }}
    >
      {/* Left section */}
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 text-white font-bold text-xl mr-4"
        >
          <div 
            className="w-9 h-9 rounded-full"
            style={{ 
              background: "linear-gradient(135deg, #ffab19 0%, #ff8c1a 100%)" 
            }}
          />
          Python VP
        </div>
        
        {/* File menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-4 py-2 rounded-xl font-semibold text-sm"
            style={{ 
              background: "rgba(255,255,255,0.15)", 
              color: "var(--header-text)" 
            }}
          >
            File
          </button>
          
          {menuOpen && (
            <div 
              className="absolute top-12 left-0 z-50 min-w-48 py-2 rounded-xl animate-in fade-in slide-in-from-top-1"
              style={{ 
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-lg)"
              }}
            >
              <MenuItem onClick={() => { setMenuOpen(false); }}>New Project</MenuItem>
              <MenuItem onClick={() => { setMenuOpen(false); }}>Save Project</MenuItem>
              <MenuItem onClick={() => { setMenuOpen(false); }}>My Projects</MenuItem>
              <div className="h-px my-1.5" style={{ background: "var(--border)" }} />
              <MenuItem onClick={() => { setMenuOpen(false); }}>Settings</MenuItem>
            </div>
          )}
        </div>
        
        {/* Project name input */}
        <input
          type="text"
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm w-48 font-medium"
          style={{ 
            background: "rgba(255,255,255,0.15)",
            border: "none",
            color: "var(--header-text)",
            outline: "none"
          }}
          placeholder="Untitled Project"
        />
      </div>
      
      {/* Center section - Theme selector */}
      <div className="flex items-center gap-3">
        <select
          value={theme}
          onChange={(e) => onThemeChange(e.target.value as "light" | "dark")}
          className="px-4 py-2 rounded-2xl text-sm font-semibold cursor-pointer"
          style={{ 
            background: "rgba(255,255,255,0.15)",
            color: "var(--header-text)",
            border: "none",
            outline: "none"
          }}
        >
          <option value="light" style={{ color: "var(--text)", background: "var(--bg-surface)" }}>
            Light Theme
          </option>
          <option value="dark" style={{ color: "var(--text)", background: "var(--bg-surface)" }}>
            Dark Theme
          </option>
        </select>
      </div>
      
      {/* Right section */}
      <div className="flex items-center gap-3">
        <span 
          className="text-sm font-medium"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
        </span>
        <button
          className="px-4 py-2 rounded-2xl text-sm font-semibold"
          style={{ 
            background: "rgba(255,255,255,0.25)",
            color: "var(--header-text)"
          }}
        >
          Join Python VP
        </button>
        <button
          className="px-4 py-2 rounded-2xl text-sm font-semibold"
          style={{ 
            background: "white",
            color: "var(--accent)"
          }}
        >
          Sign in
        </button>
      </div>
      
      {/* Click outside to close menu */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
}

function MenuItem({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="px-5 py-2.5 text-sm font-medium cursor-pointer transition-colors"
      style={{ color: "var(--text)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--accent)";
        e.currentTarget.style.color = "white";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "var(--text)";
      }}
    >
      {children}
    </div>
  );
}
