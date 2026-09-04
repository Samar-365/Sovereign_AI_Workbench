"use client";

import React from "react";
import {
  Activity,
  BookOpen,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  Download,
  Copy,
  Check,
} from "lucide-react";
import { useTaskStore } from "@/store/useTaskStore";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { truncateHash, formatBytes } from "@/lib/utils";

export function ContextPanel() {
  const {
    isContextPanelOpen,
    activeContextTab,
    setActiveContextTab,
    activeTraceSteps,
    isExecuting,
    currentRunningNode,
    knowledgeDocs,
    messages,
  } = useTaskStore();

  const [copiedHash, setCopiedHash] = React.useState(false);

  if (!isContextPanelOpen) return null;

  // Find active deliverable if available
  const activeDeliverable = [...messages].reverse().find((m) => m.deliverable)?.deliverable;

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <aside className="w-[340px] h-[calc(100vh-3.5rem)] bg-surface border-l border-border-subtle flex flex-col shrink-0 select-none overflow-hidden">
      {/* Header Tabs */}
      <div className="p-2 border-b border-border-subtle bg-surface-raised flex items-center justify-between gap-1">
        <button
          onClick={() => setActiveContextTab("timeline")}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
            activeContextTab === "timeline"
              ? "bg-surface-card text-accent-safety border border-border-subtle font-semibold shadow-sm"
              : "text-primary-secondary hover:text-primary hover:bg-surface-hover"
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Trace Stepper</span>
        </button>

        <button
          onClick={() => setActiveContextTab("context")}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
            activeContextTab === "context"
              ? "bg-surface-card text-accent-safety border border-border-subtle font-semibold shadow-sm"
              : "text-primary-secondary hover:text-primary hover:bg-surface-hover"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>SOP Context</span>
        </button>

        <button
          onClick={() => setActiveContextTab("deliverable")}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
            activeContextTab === "deliverable"
              ? "bg-surface-card text-accent-safety border border-border-subtle font-semibold shadow-sm"
              : "text-primary-secondary hover:text-primary hover:bg-surface-hover"
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Deliverable</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Tab 1: Execution Timeline */}
        {activeContextTab === "timeline" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
              <span className="text-xs font-mono uppercase text-primary-muted font-bold">
                LangGraph Node Sequence
              </span>
              <Badge variant={isExecuting ? "warning" : "success"} size="sm">
                {isExecuting ? "RUNNING" : "READY"}
              </Badge>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-border-medium">
              {activeTraceSteps.map((step, idx) => {
                const isCompleted = step.status === "completed";
                const isRunning = step.status === "running";
                const isWaiting = step.status === "waiting_approval";
                const isFailed = step.status === "failed";

                return (
                  <div key={step.id} className="relative group">
                    {/* Node status dot */}
                    <div
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border flex items-center justify-center ${
                        isCompleted
                          ? "bg-status-success/20 border-status-success text-status-success"
                          : isRunning
                          ? "bg-accent-safety/20 border-accent-safety text-accent-safety animate-pulse"
                          : isWaiting
                          ? "bg-status-warning/20 border-status-warning text-status-warning animate-bounce"
                          : isFailed
                          ? "bg-status-danger/20 border-status-danger text-status-danger"
                          : "bg-surface-card border-border-medium text-primary-muted"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <span className="text-[10px] font-mono font-bold">
                          {idx + 1}
                        </span>
                      )}
                    </div>

                    <div className="bg-surface-card border border-border-subtle rounded-xl p-3 shadow-card">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-semibold text-primary">
                          {step.label}
                        </span>
                        {step.durationMs && (
                          <span className="text-[10px] font-mono text-primary-muted">
                            {step.durationMs}ms
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] font-mono text-accent-hover mb-1">
                        node: {step.node}
                      </div>

                      <p className="text-xs text-primary-secondary leading-relaxed">
                        {step.description}
                      </p>

                      {step.outputSummary && (
                        <div className="mt-2 p-2 rounded-lg bg-surface border border-border-subtle text-[11px] font-mono text-status-success">
                          ✓ {step.outputSummary}
                        </div>
                      )}

                      {step.logs.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {step.logs.map((log, logIdx) => (
                            <div
                              key={logIdx}
                              className="text-[10px] font-mono text-primary-muted truncate"
                            >
                              &gt; {log}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Document Context */}
        {activeContextTab === "context" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
              <span className="text-xs font-mono uppercase text-primary-muted font-bold">
                Retrieved Vector Grounding
              </span>
              <Badge variant="info" size="sm">
                BGE-M3 (0.94+)
              </Badge>
            </div>

            <div className="space-y-3">
              {knowledgeDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-xl bg-surface-card border border-border-subtle hover:border-border-medium transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-primary break-all">
                      {doc.name}
                    </span>
                    <Badge variant="accent" size="sm">
                      {doc.category}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {doc.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface border border-border-subtle text-primary-secondary"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-primary-muted pt-2 border-t border-border-subtle">
                    <span>{doc.vectorChunksCount} Vector Chunks</span>
                    <span className="text-status-success font-semibold">
                      Score: {doc.similarityScore || "0.92"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Deliverable Card */}
        {activeContextTab === "deliverable" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
              <span className="text-xs font-mono uppercase text-primary-muted font-bold">
                Cryptographic Deliverable
              </span>
              <Badge variant="success" size="sm">
                SHA-256 SEALED
              </Badge>
            </div>

            {activeDeliverable ? (
              <div className="p-4 rounded-xl bg-surface-card border border-border-medium shadow-floating space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-safety/15 border border-accent-safety/30 flex items-center justify-center text-accent-safety">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary">
                      {activeDeliverable.filename}
                    </h4>
                    <span className="text-[11px] font-mono text-primary-muted">
                      {formatBytes(activeDeliverable.fileSize)} • Stamped {activeDeliverable.generatedAt.slice(11, 19)}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-surface border border-border-subtle">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase text-primary-muted font-bold">
                      SHA-256 Ledger Stamp
                    </span>
                    <button
                      onClick={() => handleCopyHash(activeDeliverable.sha256)}
                      className="text-primary-secondary hover:text-accent-safety flex items-center gap-1 text-[10px] font-mono"
                    >
                      {copiedHash ? (
                        <>
                          <Check className="w-3 h-3 text-status-success" />
                          <span className="text-status-success">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Hash</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="text-[11px] font-mono text-accent-safety break-all leading-relaxed">
                    {activeDeliverable.sha256}
                  </div>
                </div>

                <Button
                  onClick={() => {
                    alert(
                      `Downloading verified deliverable:\n${activeDeliverable.filename}\n\nSHA-256: ${activeDeliverable.sha256}\n\nSigned by Lead Corrosion Specialist.`
                    );
                  }}
                  className="w-full justify-center gap-2 font-semibold shadow-glow"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Verified .docx Report</span>
                </Button>
              </div>
            ) : (
              <div className="p-8 text-center text-primary-muted border border-dashed border-border-medium rounded-xl">
                <FileCheck className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-xs">No active deliverable generated yet.</p>
                <p className="text-[11px] mt-1 text-primary-muted">
                  Execute an inspection task and approve at the HITL gate to synthesize an official signed report.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
