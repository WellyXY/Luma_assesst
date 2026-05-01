"use client";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = { icon: LucideIcon; label: string; active?: boolean };

export function NavItem({ icon: Icon, label, active }: Props) {
  const [internalActive, setInternalActive] = useState(false);
  const isActive = active ?? internalActive;
  return (
    <button
      type="button"
      onClick={() => setInternalActive((v) => !v)}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-nav px-2.5 py-1.5 text-[13px]",
        isActive
          ? "bg-surface-active font-medium text-text"
          : "text-text-muted hover:bg-surface-hover hover:text-text",
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}
