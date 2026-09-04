"use client";

import React from "react";
import Link from "next/link";
import { Shield, Cpu, Database, Activity, ArrowRight, Terminal, Lock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function LandingHero() {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent-safety/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Air-gap Verification Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-status-success/10 border border-status-success/30 text-status-success text-xs font-mono mb-8 animate-pulse-glow">
          <span className="w-2 h-2 rounded-full bg-status-success animate-ping" />
          <span>AIR-GAP ENCLAVE VERIFIED // 0 OUTBOUND BYTES DETECTED</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary max-w-4xl mx-auto leading-[1.15]">
          Sovereign AI Workbench for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-safety to-accent-hover">
            Confidential Industrial Intelligence
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-primary-secondary max-w-3xl mx-auto leading-relaxed">
          Air-gapped agentic orchestration engineered for oil refineries, petrochemical complexes, and high-hazard continuous manufacturing. Zero external packets, local CUDA acceleration, and deterministic human-in-the-loop validation.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/workbench">
            <Button size="lg" className="text-base font-semibold px-6 shadow-glow">
              ENTER SOVEREIGN WORKBENCH
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <a href="#pipeline">
            <Button size="lg" variant="outline" className="gap-2">
              <Terminal className="w-4 h-4 text-accent-safety" />
              EXPLORE TECHNICAL PIPELINE
            </Button>
          </a>
        </div>

        {/* Live Enclave Telemetry Simulator Card */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-surface-card border border-border-medium p-5 sm:p-6 shadow-floating text-left">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border-subtle">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-accent-safety animate-pulse" />
              <div>
                <div className="text-xs font-mono text-accent-safety font-bold tracking-wider">
                  NODE ID: MRPL-REFINERY-NODE-01 (MANGALORE)
                </div>
                <div className="text-[11px] text-primary-muted font-mono">
                  Continuous Kernel Socket Watcher Active (/proc/net/tcp)
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success">0 EXTERNAL SOCKETS</Badge>
              <Badge variant="accent">CUDA ACCELERATED</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-5">
            <div className="p-3.5 rounded-xl bg-surface border border-border-subtle">
              <div className="flex items-center gap-2 text-primary-secondary text-xs mb-1">
                <Cpu className="w-4 h-4 text-accent-safety" />
                <span>Active LLM Engine</span>
              </div>
              <div className="text-sm font-semibold text-primary font-mono truncate">
                Qwen 2.5 14B Industrial
              </div>
              <div className="text-[11px] text-primary-muted mt-0.5">Quant: Q4_K_M (CUDA)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface border border-border-subtle">
              <div className="flex items-center gap-2 text-primary-secondary text-xs mb-1">
                <Database className="w-4 h-4 text-status-info" />
                <span>Confidential Vector RAG</span>
              </div>
              <div className="text-sm font-semibold text-primary font-mono truncate">
                ChromaDB / Qdrant
              </div>
              <div className="text-[11px] text-primary-muted mt-0.5">Embed: BGE-M3 (1024-dim)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface border border-border-subtle">
              <div className="flex items-center gap-2 text-primary-secondary text-xs mb-1">
                <Shield className="w-4 h-4 text-status-success" />
                <span>Network Sentinel</span>
              </div>
              <div className="text-sm font-semibold text-status-success font-mono">
                0 Sockets / 0.00 KB
              </div>
              <div className="text-[11px] text-primary-muted mt-0.5">148 External Probes Dropped</div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface border border-border-subtle">
              <div className="flex items-center gap-2 text-primary-secondary text-xs mb-1">
                <Activity className="w-4 h-4 text-accent-hover" />
                <span>HITL Safety Gate</span>
              </div>
              <div className="text-sm font-semibold text-primary font-mono">
                Active & Enforced
              </div>
              <div className="text-[11px] text-primary-muted mt-0.5">SHA-256 Ledger Stamped</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
