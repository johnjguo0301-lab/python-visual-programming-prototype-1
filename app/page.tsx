"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Navbar from "@/components/navbar";
import SecondaryTabs from "@/components/secondary-tabs";
import BlocklyEditor from "@/components/blockly-editor";
import StagePanel from "@/components/stage-panel";
import Console from "@/components/console";

export default function Home() {
  const [code, setCode] = useState<string>("");
  const [isCodePanelVisible, setIsCodePanelVisible] = useState(true);
  const [activeTab, setActiveTab] = useState<"code" | "canvas" | "graphs" | "processing">("code");
  const [projectName, setProjectName] = useState("Untitled Project");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [consoleOutput, setConsoleOutput] = useState<Array<{ text: string; type: "stdout" | "stderr" }>>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideStatus, setPyodideStatus] = useState("Loading Python...");
  
  // Canvas refs for turtle, graphs, processing
  const turtleCanvasRef = useRef<HTMLCanvasElement>(null);
  const graphsCanvasRef = useRef<HTMLCanvasElement>(null);
  const processingCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Pyodide instance ref
  const pyodideRef = useRef<unknown>(null);
  const workspaceRef = useRef<unknown>(null);

  // Initialize Pyodide
  useEffect(() => {
    const initPyodide = async () => {
      if (typeof window !== "undefined" && (window as unknown as { loadPyodide: unknown }).loadPyodide) {
        try {
          const pyodide = await ((window as unknown as { loadPyodide: () => Promise<unknown> }).loadPyodide)();
          pyodideRef.current = pyodide;
          setPyodideStatus("Python ready");
        } catch (err) {
          console.error("Failed to load Pyodide:", err);
          setPyodideStatus("Python failed to load");
        }
      }
    };
    
    // Wait for script to load
    const checkAndInit = () => {
      if ((window as unknown as { loadPyodide: unknown }).loadPyodide) {
        initPyodide();
      } else {
        setTimeout(checkAndInit, 100);
      }
    };
    
    checkAndInit();
  }, []);

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
    if (isRunning || !pyodideRef.current) return;
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
    } catch (err) {
      appendOutput(`Error: ${err}\n`, "stderr");
    } finally {
      setIsRunning(false);
    }
  }, [code, isRunning, appendOutput, clearConsole]);

  const stopCode = useCallback(() => {
    // Pyodide doesn't support interruption directly, but we can signal to stop
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
      className={`h-screen flex flex-col ${theme === "dark" ? "dark" : ""}`}
      style={{ 
        display: "grid", 
        gridTemplateRows: "56px 48px 1fr 180px",
        overflow: "hidden"
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
        <BlocklyEditor
          onCodeChange={handleCodeChange}
          workspaceRef={workspaceRef}
        />
        
        <button
          onClick={() => setIsCodePanelVisible(!isCodePanelVisible)}
          className="absolute top-1/2 -translate-y-1/2 w-6 h-12 flex items-center justify-center text-white font-bold cursor-pointer z-10"
          style={{
            right: isCodePanelVisible ? "380px" : "0",
            background: "var(--accent)",
            borderRadius: "var(--radius-sm) 0 0 var(--radius-sm)",
            border: "none"
          }}
        >
          {isCodePanelVisible ? "›" : "‹"}
        </button>
        
        {isCodePanelVisible && (
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
