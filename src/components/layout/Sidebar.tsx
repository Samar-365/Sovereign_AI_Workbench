"use client";

import React, { useEffect } from "react";
import {
  Plus,
  MessageSquare,
  Database,
  FileCheck,
  ShieldCheck,
  Pin,
  Trash2,
  Settings,
  Flame,
  Activity,
  Layers,
} from "lucide-react";
import { useTaskStore, WorkspaceView } from "@/store/useTaskStore";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function Sidebar() {
  const {
    isSidebarOpen,
    toggleSidebar,
    activeView,
    setActiveView,
    tasks,
    activeTaskId,
    setActiveTaskId,
    createNewTask,
    deleteTask,
    pinTask,
    operatorName,
    operatorRole,
    setModelModalOpen,
  } = useTaskStore();

  // Keyboard shortcut: Ctrl + B / Cmd + B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  if (!isSidebarOpen) return null;

  const navItems: { view: WorkspaceView; label: string; icon: any; badge?: string }[] = [
    { view: "tasks", label: "Task Execution", icon: MessageSquare },
    { view: "knowledge", label: "Knowledge Base & SOPs", icon: Database, badge: "3 Docs" },
    { view: "audit", label: "Audit Trail & Ledger", icon: FileCheck, badge: "SHA-256" },
    { view: "network", label: "Network Sentinel", icon: ShieldCheck, badge: "0 Egress" },
  ];

  return (
    <aside className="w-[260px] h-[calc(100vh-3.5rem)] bg-surface border-r border-border-subtle flex flex-col justify-between shrink-0 select-none">
      {/* Top Section */}
      <div className="p-3 flex flex-col gap-3">
        {/* New Task Button */}
        <Button
          onClick={createNewTask}
          className="w-full justify-start gap-2 bg-accent-safety text-white hover:bg-accent-hover font-semibold shadow-sm"
          size="md"
        >
          <Plus className="w-4 h-4" />
          <span>New Sovereign Task</span>
        </Button>

        {/* View Navigation */}
        <div className="space-y-1 pt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => setActiveView(item.view)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-surface-raised text-accent-safety border border-border-subtle font-semibold"
                    : "text-primary-secondary hover:text-primary hover:bg-surface-hover"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-accent-safety" : "text-primary-muted"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface border border-border-subtle text-primary-muted">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Middle Section: Task History List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 border-t border-border-subtle">
        <div className="flex items-center justify-between px-1 mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-primary-muted">
            Task History
          </span>
          <span className="text-[10px] font-mono text-primary-muted">
            {tasks.length} Saved
          </span>
        </div>

        <div className="space-y-1">
          {tasks.map((task) => {
            const isSelected = activeTaskId === task.id;
            return (
              <div
                key={task.id}
                onClick={() => {
                  setActiveTaskId(task.id);
                  setActiveView("tasks");
                }}
                className={`group relative p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  isSelected
                    ? "bg-surface-card border-border-medium shadow-sm"
                    : "bg-transparent border-transparent hover:bg-surface-hover hover:border-border-subtle"
                }`}
              >
                <div className="flex items-start justify-between gap-1.5">
                  <span
                    className={`text-xs font-medium truncate ${
                      isSelected ? "text-primary font-semibold" : "text-primary-secondary"
                    }`}
                  >
                    {task.title}
                  </span>
                  {task.pinned && (
                    <Pin className="w-3 h-3 text-accent-safety shrink-0 mt-0.5 fill-accent-safety" />
                  )}
                </div>

                <div className="flex items-center justify-between mt-1.5 text-[10px] text-primary-muted font-mono">
                  <span className="truncate">{task.updatedAt.slice(11, 16)} UTC</span>
                  <Badge
                    size="sm"
                    variant={
                      task.status === "COMPLETED"
                        ? "success"
                        : task.status === "AWAITING_APPROVAL"
                        ? "warning"
                        : "default"
                    }
                  >
                    {task.status}
                  </Badge>
                </div>

                {/* Hover action bar */}
                <div className="absolute right-2 top-2 hidden group-hover:flex items-center gap-1 bg-surface-raised border border-border-medium rounded-md p-0.5 shadow-sm">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      pinTask(task.id);
                    }}
                    className="p-1 hover:text-accent-safety text-primary-secondary"
                    title="Pin Task"
                  >
                    <Pin className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(task.id);
                    }}
                    className="p-1 hover:text-status-danger text-primary-secondary"
                    title="Delete Task"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Operator Profile & Settings */}
      <div className="p-3 border-t border-border-subtle bg-surface/50">
        <div className="flex items-center justify-between p-2 rounded-xl bg-surface-card border border-border-subtle">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-accent-safety/15 border border-accent-safety/30 flex items-center justify-center text-accent-safety font-bold text-xs shrink-0">
              TR
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-primary truncate">
                {operatorName}
              </div>
              <div className="text-[10px] text-primary-muted truncate">
                {operatorRole}
              </div>
            </div>
          </div>
          <button
            onClick={() => setModelModalOpen(true)}
            className="p-1.5 text-primary-secondary hover:text-primary hover:bg-surface-hover rounded-lg transition-colors"
            title="Configure Enclave Parameters"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
