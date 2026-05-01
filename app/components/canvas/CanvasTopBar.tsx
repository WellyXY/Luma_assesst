import Link from "next/link";
import { ArrowLeft, ChevronDown, Settings, Sparkles } from "lucide-react";

export function CanvasTopBar({ title }: { title: string }) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-bg px-4">
      <div className="flex items-center gap-3 text-text-muted">
        <Link
          href="/"
          aria-label="Back to Discover"
          className="grid h-7 w-7 place-items-center rounded-full hover:bg-surface-hover hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <button
          type="button"
          className="flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.08em] uppercase text-text hover:text-text"
        >
          <span>{title}</span>
          <ChevronDown className="h-3.5 w-3.5 text-text-dim" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-8 items-center gap-1.5 rounded-pill border border-border-strong bg-surface px-3 text-[12px] font-medium text-text hover:bg-surface-hover"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Upgrade
        </button>
        <button
          type="button"
          aria-label="Settings"
          className="grid h-8 w-8 place-items-center rounded-full text-text-dim hover:bg-surface-hover hover:text-text"
        >
          <Settings className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="h-8 rounded-pill bg-text px-4 text-[12px] font-medium text-bg hover:opacity-90"
        >
          Share
        </button>
      </div>
    </header>
  );
}
