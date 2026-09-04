import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive" | "flat";
}

export function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  const variants = {
    default: "bg-surface-card border border-border-subtle rounded-xl",
    elevated: "bg-surface-raised border border-border-medium shadow-floating rounded-xl",
    interactive:
      "bg-surface-card border border-border-subtle hover:border-border-medium hover:bg-surface-hover transition-all duration-150 cursor-pointer rounded-xl",
    flat: "bg-surface border border-border-subtle rounded-xl",
  };

  return (
    <div className={cn(variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
