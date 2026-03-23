// Global type declarations for Blockly and Python generator

export interface BlocklyWorkspace {
  addChangeListener: (callback: () => void) => void;
  getTopBlocks: (ordered: boolean) => BlocklyBlock[];
  clear: () => void;
  cleanUp: () => void;
  getFlyout: () => { isVisible: () => boolean; hide: () => void; autoClose: boolean };
  getToolbox: () => {
    setSelectedItem: (oldItem: unknown, newItem: unknown) => void;
    getSelectedItem: () => unknown;
    clearSelection: () => void;
  };
  getParentSvg: () => SVGElement;
}

export interface BlocklyBlock {
  type: string;
  getNextBlock: () => BlocklyBlock | null;
  getFieldValue: (name: string) => string;
}

export interface PythonGenerator {
  forBlock: Record<string, (block: BlockType, generator: GeneratorType) => string | [string, number]>;
  init: (workspace: unknown) => void;
  statementToCode: (block: unknown, name: string) => string;
  valueToCode: (block: unknown, name: string, order: number) => string;
  blockToCode: (block: unknown) => string | [string, number];
  ORDER_NONE: number;
  ORDER_ATOMIC: number;
  ORDER_FUNCTION_CALL: number;
  INDENT: string;
}

export interface BlockType {
  getFieldValue: (name: string) => string;
  getNextBlock: () => BlockType | null;
}

export interface GeneratorType {
  statementToCode: (block: BlockType, name: string) => string;
  valueToCode: (block: BlockType, name: string, order: number) => string;
  ORDER_NONE: number;
  ORDER_ATOMIC: number;
  ORDER_FUNCTION_CALL: number;
  INDENT: string;
}

export interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: { batched: (text: string) => void }) => void;
  setStderr: (opts: { batched: (text: string) => void }) => void;
}

// Augment the Window interface
declare global {
  interface Window {
    Blockly: {
      inject: (container: string | Element, options: unknown) => BlocklyWorkspace;
      Theme: {
        defineTheme: (name: string, options: unknown) => unknown;
      };
      Themes: {
        Classic: unknown;
      };
      svgResize: (workspace: BlocklyWorkspace) => void;
      serialization: {
        workspaces: {
          save: (workspace: BlocklyWorkspace) => unknown;
          load: (state: unknown, workspace: BlocklyWorkspace) => void;
        };
      };
      common: {
        defineBlocksWithJsonArray: (blocks: unknown[]) => void;
      };
    };
    python: {
      pythonGenerator: PythonGenerator;
    };
    loadPyodide: () => Promise<PyodideInterface>;
  }
}

// This empty export makes this file a module
export {};
