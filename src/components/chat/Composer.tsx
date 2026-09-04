"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Paperclip,
  Mic,
  MicOff,
  ArrowRight,
  X,
  FileText,
  Lock,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useTaskStore } from "@/store/useTaskStore";
import { AttachedFile } from "@/types/chat";
import { SlashCommandMenu, SlashCommand } from "./SlashCommandMenu";
import { formatBytes } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface ComposerProps {
  onSendMessage: (content: string, attachments: AttachedFile[]) => void;
}

export function Composer({ onSendMessage }: ComposerProps) {
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState<AttachedFile[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [slashFilter, setSlashFilter] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isExecuting, modelConfig } = useTaskStore();

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [content]);

  // Handle Slash command trigger
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setContent(val);

    if (val.startsWith("/")) {
      setSlashFilter(val.slice(1));
    } else {
      setSlashFilter(null);
    }
  };

  const handleSelectSlashCommand = (cmd: SlashCommand) => {
    setContent(cmd.prompt);
    setSlashFilter(null);
    if (cmd.key === "ut-audit") {
      // Auto attach sample hydrocracker UT log if not already attached
      if (!attachments.some((a) => a.name.includes("hydrocracker"))) {
        setAttachments((prev) => [
          ...prev,
          {
            id: `att-${Date.now()}`,
            name: "hydrocracker_ut_log.pdf",
            size: 2450000,
            type: "application/pdf",
          },
        ]);
      }
    }
    textareaRef.current?.focus();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAttachments: AttachedFile[] = Array.from(files).map((file) => ({
      id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleVoiceToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate Whisper.cpp offline transcription
      setTimeout(() => {
        setContent(
          "Analyze the pump P-102B vibration frequency spectrum and flag bearing outer race defects."
        );
        setIsRecording(false);
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!content.trim() && attachments.length === 0) || isExecuting) return;

    onSendMessage(content.trim(), attachments);
    setContent("");
    setAttachments([]);
    setSlashFilter(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && slashFilter === null) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 pb-6 select-none">
      {/* Slash command floating popup */}
      {slashFilter !== null && (
        <SlashCommandMenu
          filter={slashFilter}
          onSelect={handleSelectSlashCommand}
          onClose={() => setSlashFilter(null)}
        />
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.png,.jpg,.jpeg,.xlsx,.docx,.json"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Elevated Floating Composer Box */}
      <div className="relative rounded-2xl bg-surface-card border border-border-medium shadow-floating focus-within:border-accent-safety/70 focus-within:shadow-glow transition-all duration-200">
        {/* Attachment Chips */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 pb-0">
            {attachments.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-surface border border-border-medium text-xs font-mono text-primary"
              >
                <FileText className="w-3.5 h-3.5 text-accent-safety" />
                <span className="font-medium truncate max-w-[180px]">
                  {file.name}
                </span>
                <span className="text-[10px] text-primary-muted">
                  ({formatBytes(file.size)})
                </span>
                <button
                  type="button"
                  onClick={() => removeAttachment(file.id)}
                  className="p-0.5 hover:text-status-danger text-primary-muted rounded"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={content}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Describe sovereign refinery task or type '/' for industrial SOP macros..."
          className="w-full bg-transparent px-4 py-3.5 text-sm text-primary placeholder:text-primary-muted focus:outline-none resize-none min-h-[52px] max-h-[200px]"
        />

        {/* Bottom Action Bar */}
        <div className="flex items-center justify-between px-3.5 py-2.5 border-t border-border-subtle/50 bg-surface/30 rounded-b-2xl">
          {/* Left Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-lg text-primary-secondary hover:text-primary hover:bg-surface-hover transition-colors"
              title="Attach Inspection Log / PDF / JSON"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`p-2 rounded-lg transition-colors ${
                isRecording
                  ? "text-status-danger bg-status-danger/15 animate-pulse"
                  : "text-primary-secondary hover:text-primary hover:bg-surface-hover"
              }`}
              title="Air-Gapped Voice Dictation (Whisper.cpp)"
            >
              {isRecording ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>

            {/* Model & Security Badges */}
            <div className="hidden sm:flex items-center gap-2 pl-1 border-l border-border-subtle">
              <span className="text-[11px] font-mono text-primary-muted px-2 py-0.5 rounded bg-surface border border-border-subtle">
                {modelConfig.selectedModel.split(" ")[0]} 2.5 14B
              </span>
              <div className="flex items-center gap-1 text-[11px] font-mono text-status-success px-2 py-0.5 rounded bg-status-success/10 border border-status-success/20">
                <Lock className="w-3 h-3" />
                <span>ZERO EGRESS</span>
              </div>
            </div>
          </div>

          {/* Right Action: Run Task Button */}
          <Button
            type="button"
            onClick={() => handleSubmit()}
            disabled={
              (!content.trim() && attachments.length === 0) || isExecuting
            }
            size="sm"
            className="font-semibold gap-1.5 px-4 shadow-glow"
          >
            {isExecuting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>EXECUTING...</span>
              </>
            ) : (
              <>
                <span>RUN TASK</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
