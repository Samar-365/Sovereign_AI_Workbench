"use client";

import React from "react";
import Link from "next/link";
import { Shield, ArrowRight, Activity, Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LandingHero } from "@/components/landing/LandingHero";
import { ThreatMatrix } from "@/components/landing/ThreatMatrix";
import { FeatureBentoGrid } from "@/components/landing/FeatureBentoGrid";
import { InteractivePipeline } from "@/components/landing/InteractivePipeline";
import { ComplianceShowcase } from "@/components/landing/ComplianceShowcase";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas text-primary">
      {/* Global Sovereign Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-canvas/80 backdrop-blur-md border-b border-border-subtle h-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface-card border border-border-medium flex items-center justify-center shadow-sm">
              <span className="text-accent-safety font-bold text-sm">OA</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-primary">
                  OnPremisAI
                </span>
                <Badge variant="accent" size="sm">
                  SOVEREIGN
                </Badge>
              </div>
              <span className="text-[10px] text-primary-muted font-mono -mt-0.5">
                MRPL ENCLAVE
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-primary-secondary">
            <a
              href="#threat-matrix"
              className="hover:text-primary transition-colors"
            >
              THREAT MATRIX
            </a>
            <a
              href="#capabilities"
              className="hover:text-primary transition-colors"
            >
              CAPABILITIES
            </a>
            <a
              href="#pipeline"
              className="hover:text-primary transition-colors"
            >
              PIPELINE
            </a>
            <a
              href="#compliance"
              className="hover:text-primary transition-colors"
            >
              COMPLIANCE
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-status-success/10 border border-status-success/20 text-status-success text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
              <span>0 EGRESS</span>
            </div>
            <Link href="/workbench">
              <Button size="sm" className="font-semibold shadow-glow">
                ENTER WORKBENCH
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Landing Page Content */}
      <main className="pt-16">
        <LandingHero />
        <ThreatMatrix />
        <FeatureBentoGrid />
        <InteractivePipeline />
        <ComplianceShowcase />
        <LandingFooter />
      </main>
    </div>
  );
}
