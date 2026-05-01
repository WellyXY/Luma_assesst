"use client";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function CanvasBlock({
  children,
  onDelete,
  className,
}: {
  children: ReactNode;
  onDelete: () => void;
  className?: string;
}) {
  return (
    <div
      data-canvas-block
      className={cn(
        "group/block relative rounded-card border border-transparent transition-colors hover:border-border",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Delete block"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute -top-2 -right-2 z-10 grid h-6 w-6 place-items-center rounded-full border border-border bg-surface text-text-dim opacity-0 transition-opacity hover:text-text group-hover/block:opacity-100"
      >
        <X className="h-3 w-3" />
      </button>
      {children}
    </div>
  );
}
