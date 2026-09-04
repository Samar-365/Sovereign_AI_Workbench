import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function LandingFooter() {
  return (
    <footer className="border-t border-border-medium bg-surface/60 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Pitch CTA Banner */}
        <div className="rounded-2xl bg-gradient-to-br from-surface-card to-surface-raised border border-accent/30 p-8 sm:p-10 mb-16 text-center shadow-glow">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-mono mb-4">
            <ShieldCheck className="w-4 h-4" />
            SMART INDIA HACKATHON 2026 — PS ID 26117
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary max-w-2xl mx-auto">
            Ready to Experience Air-Gapped Industrial Intelligence?
          </h2>
          <p className="mt-3 text-sm text-primary-secondary max-w-xl mx-auto">
            Launch the Sovereign Workbench to test real ultrasonic logs, run vibration FFT diagnostics, and experience deterministic human-in-the-loop validation.
          </p>
          <div className="mt-8">
            <Link href="/workbench">
              <Button size="lg" className="font-semibold px-8 shadow-glow">
                LAUNCH WORKBENCH NOW
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer info & credentials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border-subtle">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface border border-border-medium flex items-center justify-center">
              <span className="text-accent font-bold text-sm">OA</span>
            </div>
            <div>
              <div className="text-sm font-bold text-primary">OnPremisAI Sovereign Workbench</div>
              <div className="text-xs text-primary-muted font-mono">Mangalore Refinery and Petrochemicals Limited (MRPL) Enclave</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-primary-secondary font-mono">
            <Link href="/workbench" className="hover:text-accent transition-colors">
              Workbench Shell
            </Link>
            <a href="#pipeline" className="hover:text-accent transition-colors">
              LangGraph Pipeline
            </a>
            <a href="#threat-matrix" className="hover:text-accent transition-colors">
              Threat Matrix
            </a>
            <a href="#compliance" className="hover:text-accent transition-colors">
              OISD Compliance
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-[11px] text-primary-muted font-mono">
          © 2026 OnPremisAI Industrial Engineering Enclave. Engineered for Air-Gapped High-Hazard Reliability.
        </div>
      </div>
    </footer>
  );
}
