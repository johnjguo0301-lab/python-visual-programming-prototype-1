"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import SecondaryTabs from "@/components/secondary-tabs";
import Console from "@/components/console";

// Dynamically import components that need Blockly
const BlocklyEditor = dynamic(() => import("@/components/blockly-editor"), {
  ssr: false,
  loading: () => (
    <div 
      className="flex items-center justify-center h-full"
      style={{ background: "white" }}
    >
      <div className="text-center">
        <div 
          className="w-12 h-12 rounded-full mx-auto mb-4 animate-pulse"
          style={{ background: "var(--accent)" }}
        />
        <p style={{ color: "var(--text-muted)" }}>Loading editor...</p>
      </div>
    </div>
  ),
});

const StagePanel = dynamic(() => import("@/components/stage-panel"), {
  ssr: false,
  loading: () => (
    <div 
      className="flex items-center justify-center h-full"
      style={{ background: "var(--bg-surface)" }}
    >
      <p style={{ color: "var(--text-muted)" }}>Loading...</p>
    </div>
  ),
});

export default function Home() {
  const [code, setCode] = useState<string>("");
  const [isCodePanelVisible, setIsCodePanelVisible] = useState(true);
  const [activeTab, setActiveTab] = useState<"code" | "canvas" | "graphs" | "processing">("code");
  const [projectName, setProjectName] = useState("Untitled Project");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [consoleOutput, setConsoleOutput] = useState<Array<{ text: string; type: "stdout" | "stderr" }>>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideStatus, setPyodideStatus] = useState("Loading Python...");
  const [isClient, setIsClient] = useState(false);
  
  // Canvas refs for turtle, graphs, processing
  const turtleCanvasRef = useRef<HTMLCanvasElement>(null);
  const graphsCanvasRef = useRef<HTMLCanvasElement>(null);
  const processingCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Pyodide instance ref
  const pyodideRef = useRef<unknown>(null);
  const workspaceRef = useRef<unknown>(null);

  // Ensure we're on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize Pyodide
  useEffect(() => {
    if (!isClient) return;
    
    const initPyodide = async () => {
      if (typeof window !== "undefined" && (window as Window & { loadPyodide?: () => Promise<unknown> }).loadPyodide) {
        try {
          const pyodide = await ((window as Window & { loadPyodide: () => Promise<unknown> }).loadPyodide)();
          pyodideRef.current = pyodide;
          setPyodideStatus("Python ready");
        } catch (err) {
          console.error("[v0] Failed to load Pyodide:", err);
          setPyodideStatus("Python failed to load");
        }
      }
    };
    
    // Wait for script to load
    const checkAndInit = () => {
      if ((window as Window & { loadPyodide?: unknown }).loadPyodide) {
        initPyodide();
      } else {
        setTimeout(checkAndInit, 500);
      }
    };
    
    // Start checking after a delay to let scripts load
    setTimeout(checkAndInit, 1000);
  }, [isClient]);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
  }, []);

  const appendOutput = useCallback((text: string, type: "stdout" | "stderr" = "stdout") => {
    setConsoleOutput(prev => [...prev, { text, type }]);
  }, []);

  const clearConsole = useCallback(() => {
    setConsoleOutput([]);
  }, []);

  const runCode = useCallback(async () => {
    if (isRunning || !pyodideRef.current) {
      if (!pyodideRef.current) {
        appendOutput("Python is still loading. Please wait...\n", "stderr");
      }
      return;
    }
    if (!code.trim()) {
      appendOutput("No code to run. Drag some blocks first!\n", "stderr");
      return;
    }

    setIsRunning(true);
    clearConsole();

    try {
      const pyodide = pyodideRef.current as { 
        runPythonAsync: (code: string) => Promise<unknown>;
        setStdout: (opts: { batched: (text: string) => void }) => void;
        setStderr: (opts: { batched: (text: string) => void }) => void;
      };
      
      // Capture stdout/stderr
      pyodide.setStdout({ batched: (text: string) => appendOutput(text, "stdout") });
      pyodide.setStderr({ batched: (text: string) => appendOutput(text, "stderr") });
      
      await pyodide.runPythonAsync(code);
      appendOutput("\n--- Program finished ---\n", "stdout");
    } catch (err) {
      appendOutput(`Error: ${err}\n`, "stderr");
    } finally {
      setIsRunning(false);
    }
  }, [code, isRunning, appendOutput, clearConsole]);

  const stopCode = useCallback(() => {
    setIsRunning(false);
    appendOutput("--- Execution stopped ---\n", "stderr");
  }, [appendOutput]);

  const cleanupBlocks = useCallback(() => {
    if (workspaceRef.current) {
      (workspaceRef.current as { cleanUp: () => void }).cleanUp();
    }
  }, []);

  return (
    <div 
      className={`h-screen ${theme === "dark" ? "dark" : ""}`}
      style={{ 
        display: "grid", 
        gridTemplateRows: "56px 48px 1fr 180px",
        overflow: "hidden",
        background: "var(--bg-base)"
      }}
    >
      <Navbar
        projectName={projectName}
        onProjectNameChange={setProjectName}
        theme={theme}
        onThemeChange={setTheme}
      />
      
      <SecondaryTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCleanup={cleanupBlocks}
        onRun={runCode}
        onStop={stopCode}
        isRunning={isRunning}
      />
      
      <div 
        className="relative overflow-hidden"
        style={{ 
          display: "grid", 
          gridTemplateColumns: isCodePanelVisible ? "1fr 380px" : "1fr",
          background: "var(--bg-deep)"
        }}
      >
        {isClient && (
          <BlocklyEditor
            onCodeChange={handleCodeChange}
            workspaceRef={workspaceRef}
          />
        )}
        
        <button
          onClick={() => setIsCodePanelVisible(!isCodePanelVisible)}
          className="absolute top-1/2 -translate-y-1/2 w-6 h-12 flex items-center justify-center text-white font-bold cursor-pointer z-10"
          style={{
            right: isCodePanelVisible ? "380px" : "0",
            background: "var(--accent)",
            borderRadius: "8px 0 0 8px",
            border: "none"
          }}
        >
          {isCodePanelVisible ? "›" : "‹"}
        </button>
        
        {isCodePanelVisible && isClient && (
          <StagePanel
            code={code}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            turtleCanvasRef={turtleCanvasRef}
            graphsCanvasRef={graphsCanvasRef}
            processingCanvasRef={processingCanvasRef}
          />
        )}
      </div>
      
      <Console
        output={consoleOutput}
        isRunning={isRunning}
        pyodideStatus={pyodideStatus}
        onRun={runCode}
        onStop={stopCode}
        onClear={clearConsole}
      />
    </div>
  );
}
