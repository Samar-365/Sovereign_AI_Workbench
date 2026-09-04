import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OnPremisAI — Sovereign AI Workbench for Confidential Industrial Intelligence",
  description:
    "Air-gapped agentic orchestration engineered for oil refineries, petrochemical complexes, and high-hazard continuous manufacturing. Zero external packets, local CUDA acceleration, and deterministic HITL validation.",
  icons: {
    icon: "/brand/logo-sovereign.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-canvas text-primary antialiased min-h-screen selection:bg-accent-safety/25 selection:text-white">
        {children}
      </body>
    </html>
  );
}
