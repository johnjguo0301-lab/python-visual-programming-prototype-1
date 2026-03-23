import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Python Visual Programming",
  description: "A Scratch-style visual programming environment for Python",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#855cd6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Blockly */}
        <script src="https://unpkg.com/blockly/blockly_compressed.js" defer></script>
        <script src="https://unpkg.com/blockly/python_compressed.js" defer></script>
        <script src="https://unpkg.com/blockly/msg/en.js" defer></script>
        {/* Pyodide for client-side Python execution */}
        <script src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js" defer></script>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
