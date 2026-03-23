import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
      <body className="antialiased">
        {children}
        {/* Blockly */}
        <Script 
          src="https://unpkg.com/blockly/blockly_compressed.js" 
          strategy="beforeInteractive"
        />
        <Script 
          src="https://unpkg.com/blockly/python_compressed.js" 
          strategy="beforeInteractive"
        />
        <Script 
          src="https://unpkg.com/blockly/msg/en.js" 
          strategy="beforeInteractive"
        />
        {/* Pyodide for client-side Python execution */}
        <Script 
          src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js" 
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
