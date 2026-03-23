"use client";

import { useEffect, useRef, MutableRefObject } from "react";
import { toolbox } from "@/lib/toolbox";
import { registerBlocks } from "@/lib/blocks";
import "@/lib/types"; // Import type declarations
import type { BlocklyWorkspace, BlocklyBlock } from "@/lib/types";

interface BlocklyEditorProps {
  onCodeChange: (code: string) => void;
  workspaceRef: MutableRefObject<unknown>;
}

export default function BlocklyEditor({ onCodeChange, workspaceRef }: BlocklyEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    
    const initBlockly = () => {
      if (!containerRef.current) return;
      if (typeof window === "undefined") return;
      if (!window.Blockly || !window.python) {
        setTimeout(initBlockly, 100);
        return;
      }

      initialized.current = true;
      
      const Blockly = window.Blockly;

      // Register custom blocks
      registerBlocks();

      // Create theme
      const scratchTheme = Blockly.Theme.defineTheme("scratchTheme", {
        base: Blockly.Themes.Classic,
        componentStyles: {
          workspaceBackgroundColour: "#ffffff",
          toolboxBackgroundColour: "#f9f9f9",
          toolboxForegroundColour: "#575e75",
          flyoutBackgroundColour: "#e9eef2",
          flyoutForegroundColour: "#575e75",
          flyoutOpacity: 0.95,
          scrollbarColour: "#d9d9d9",
          scrollbarOpacity: 0.7,
        },
      });

      // Initialize workspace
      const workspace = Blockly.inject(containerRef.current, {
        toolbox: toolbox,
        grid: { spacing: 20, length: 3, colour: "#e8e8e8", snap: true },
        zoom: { 
          controls: true, 
          wheel: true, 
          startScale: 1.0, 
          maxScale: 3, 
          minScale: 0.3, 
          scaleSpeed: 1.2 
        },
        trashcan: true,
        renderer: "zelos",
        theme: scratchTheme,
      });

      workspaceRef.current = workspace;

      // Event blocks that act as entry points
      const EVENT_BLOCKS = ["event_start", "event_key_pressed"];

      // Generate code from event blocks
      const generateCode = () => {
        const generator = window.python.pythonGenerator;
        generator.init(workspace);

        const topBlocks = workspace.getTopBlocks(true);
        const codeChunks: string[] = [];

        for (const block of topBlocks) {
          if (!EVENT_BLOCKS.includes(block.type)) continue;

          if (block.type === "event_start") {
            const next = block.getNextBlock();
            if (next) {
              const code = generator.blockToCode(next);
              if (typeof code === "string" && code.trim()) {
                codeChunks.push(code);
              } else if (Array.isArray(code)) {
                codeChunks.push(code[0] || "");
              }
            }
          } else {
            const code = generator.blockToCode(block);
            if (typeof code === "string" && code.trim()) {
              codeChunks.push(code);
            }
          }
        }

        let raw = codeChunks.join("");
        // Remove inline imports
        raw = raw.replace(/^import (time|sys|math|random)\n/gm, "");
        
        // Auto-add imports
        const imports: string[] = [];
        if (/\bmath\./.test(raw) && !/^import math$/m.test(raw)) imports.push("import math");
        if (/\brandom\./.test(raw) && !/^import random$/m.test(raw)) imports.push("import random");
        if (/\btime\./.test(raw) && !/^import time$/m.test(raw)) imports.push("import time");
        if (/\bsys\./.test(raw) && !/^import sys$/m.test(raw)) imports.push("import sys");
        
        if (imports.length > 0) {
          raw = imports.join("\n") + "\n\n" + raw;
        }

        return raw;
      };

      // Listen for changes
      workspace.addChangeListener(() => {
        const code = generateCode();
        onCodeChange(code);
      });

      // Handle resize
      const handleResize = () => {
        Blockly.svgResize(workspace);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    };

    initBlockly();
  }, [onCodeChange, workspaceRef]);

  // Resize on container size change
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (workspaceRef.current && window.Blockly) {
        window.Blockly.svgResize(workspaceRef.current as BlocklyWorkspace);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [workspaceRef]);

  return (
    <div 
      className="relative flex-1"
      style={{ 
        background: "var(--bg-surface)",
        borderRight: "1px solid var(--border)"
      }}
    >
      <div 
        ref={containerRef}
        className="absolute inset-0"
        style={{ background: "white" }}
      />
    </div>
  );
}
