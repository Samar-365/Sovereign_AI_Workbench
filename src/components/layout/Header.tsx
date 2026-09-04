"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PanelLeft,
  PanelRight,
  ShieldCheck,
  Sliders,
  Download,
  UserCheck,
  ChevronDown,
  Sparkles,
  FileText,
  FileCode,
  FileSpreadsheet,
} from "lucide-react";
import { useTaskStore } from "@/store/useTaskStore";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { OperatorRole } from "@/types/task";

export function Header() {
  const {
    isSidebarOpen,
    toggleSidebar,
    isContextPanelOpen,
    toggleContextPanel,
    modelConfig,
    setModelModalOpen,
    operatorRole,
    setOperatorRole,
    operatorName,
    messages,
  } = useTaskStore();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

  const roles: OperatorRole[] = [
    "Lead Corrosion Specialist",
    "Field NDT Inspector",
    "Plant Safety Auditor",
    "Refinery Operations Chief",
  ];

  const handleExport = (format: "md" | "json") => {
    setIsExportDropdownOpen(false);
    let dataStr = "";
    let filename = `OnPremisAI_Task_Export_${Date.now()}`;

    if (format === "md") {
      dataStr = messages
        .map(
          (m) =>
            `## ${m.role.toUpperCase()} [${m.timestamp}]\n\n${m.content}\n\n---\n`
        )
        .join("\n");
      filename += ".md";
    } else {
      dataStr = JSON.stringify(messages, null, 2);
      filename += ".json";
    }

    const blob = new Blob([dataStr], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="h-14 bg-surface border-b border-border-subtle flex items-center justify-between px-4 z-30 select-none">
      {/* Left side actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg text-primary-secondary hover:text-primary hover:bg-surface-hover transition-colors"
          title="Toggle Sidebar (Ctrl+B)"
        >
          <PanelLeft className="w-5 h-5" />
        </button>

        <Link href="/" className="flex items-center gap-2 ml-1">
          <div className="w-7 h-7 rounded-lg bg-surface-card border border-border-medium flex items-center justify-center shadow-sm">
            <span className="text-accent-safety font-bold text-xs">OA</span>
          </div>
          <span className="font-bold text-sm text-primary tracking-tight hidden sm:inline">
            OnPremisAI
          </span>
        </Link>
      </div>

      {/* Center: Model Selector Pill & Air-gap Status */}
      <div className="flex items-center gap-3">
        {/* Model Selector Pill */}
        <button
          onClick={() => setModelModalOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-card border border-border-medium hover:border-accent-safety hover:bg-surface-hover text-xs font-mono text-primary transition-all shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent-safety" />
          <span className="font-semibold">{modelConfig.selectedModel.split(" ")[0]} 2.5 14B</span>
          <span className="text-[10px] text-primary-muted hidden md:inline">
            (Temp: {modelConfig.temperature})
          </span>
          <Sliders className="w-3 h-3 text-primary-secondary" />
        </button>

        {/* Air-Gap Verification Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-success/10 border border-status-success/20 text-status-success text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
          <span>AIR-GAP: 0 EGRESS</span>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-card border border-border-subtle hover:bg-surface-hover text-xs text-primary transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5 text-accent-safety" />
            <span className="hidden md:inline font-medium truncate max-w-[130px]">
              {operatorRole}
            </span>
            <ChevronDown className="w-3 h-3 text-primary-secondary" />
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-60 rounded-xl bg-surface-card border border-border-medium shadow-floating py-1.5 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 border-b border-border-subtle text-[11px] font-mono text-primary-muted">
                ACTIVE OPERATOR ROLE (RBAC)
              </div>
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setOperatorRole(r);
                    setIsRoleDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-surface-hover transition-colors ${
                    operatorRole === r
                      ? "text-accent-safety font-semibold bg-accent-safety/10"
                      : "text-primary"
                  }`}
                >
                  <span>{r}</span>
                  {operatorRole === r && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-safety" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Export Menu */}
        <div className="relative">
          <button
            onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
            className="p-1.5 rounded-lg text-primary-secondary hover:text-primary hover:bg-surface-hover transition-colors"
            title="Export Task"
          >
            <Download className="w-4 h-4" />
          </button>

          {isExportDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-surface-card border border-border-medium shadow-floating py-1.5 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 border-b border-border-subtle text-[11px] font-mono text-primary-muted">
                EXPORT ACTIVE SESSION
              </div>
              <button
                onClick={() => handleExport("md")}
                className="w-full text-left px-3 py-2 text-xs text-primary hover:bg-surface-hover flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-accent-safety" />
                <span>Export Markdown (.md)</span>
              </button>
              <button
                onClick={() => handleExport("json")}
                className="w-full text-left px-3 py-2 text-xs text-primary hover:bg-surface-hover flex items-center gap-2"
              >
                <FileCode className="w-3.5 h-3.5 text-status-info" />
                <span>Export Audit JSON (.json)</span>
              </button>
            </div>
          )}
        </div>

        {/* Context Panel Toggle */}
        <button
          onClick={toggleContextPanel}
          className={`p-1.5 rounded-lg transition-colors ${
            isContextPanelOpen
              ? "text-accent-safety bg-accent-safety/10"
              : "text-primary-secondary hover:text-primary hover:bg-surface-hover"
          }`}
          title="Toggle Context Panel"
        >
          <PanelRight className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
