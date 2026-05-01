// app/components/canvas/StepBlock.tsx
"use client";
import { Download, Loader2, RefreshCw, Share2, Split } from "lucide-react";
import { CanvasBlock } from "./CanvasBlock";

export type StepKind = "generate" | "refine" | "deliver";
export type StepStatus = "pending" | "running" | "done" | "error";

const titles: Record<StepKind, string> = {
  generate: "Step 1: Generate",
  refine: "Step 2: Refine",
  deliver: "Step 3: Deliver",
};

export function StepBlock({
  kind,
  status,
  thumbs,
  onRetry,
  onFork,
  onDelete,
}: {
  kind: StepKind;
  status: StepStatus;
  thumbs: string[];
  onRetry: () => void;
  onFork?: () => void;
  onDelete: () => void;
}) {
  const isRunning = status === "running";
  const isDone = status === "done";
  return (
    <CanvasBlock onDelete={onDelete} className="px-4 py-4">
      <div className="flex w-[440px] flex-col gap-3" onMouseDown={(e) => e.stopPropagation()}>
        <header className="flex items-center justify-between">
          <h3 className="text-[14px] font-semibold text-text">{titles[kind]}</h3>
          <StatusPill status={status} />
        </header>

        <div
          className={
            kind === "generate"
              ? "grid grid-cols-2 gap-2"
              : kind === "refine"
                ? "grid grid-cols-3 gap-2"
                : "grid grid-cols-1"
          }
        >
          {thumbs.map((src, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-md bg-surface-2"
            >
              {isRunning ? (
                <div className="absolute inset-0 grid place-items-center">
                  <Loader2 className="h-4 w-4 animate-spin text-text-dim" />
                </div>
              ) : (
                <img
                  src={src}
                  alt={`${titles[kind]} output ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          ))}
        </div>

        {isDone ? (
          <footer className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onRetry}
                className="flex items-center gap-1 rounded-pill border border-border px-2.5 py-1 text-[11px] text-text-muted hover:border-border-strong hover:text-text"
              >
                <RefreshCw className="h-3 w-3" />
                Retry
              </button>
              {onFork ? (
                <button
                  type="button"
                  onClick={onFork}
                  className="flex items-center gap-1 rounded-pill border border-border px-2.5 py-1 text-[11px] text-text-muted hover:border-border-strong hover:text-text"
                >
                  <Split className="h-3 w-3" />
                  Fork
                </button>
              ) : null}
            </div>
            {kind === "deliver" ? (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-pill bg-text px-2.5 py-1 text-[11px] font-medium text-bg hover:opacity-90"
                >
                  <Download className="h-3 w-3" />
                  Download
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-pill border border-border px-2.5 py-1 text-[11px] text-text-muted hover:border-border-strong hover:text-text"
                >
                  <Share2 className="h-3 w-3" />
                  Share
                </button>
              </div>
            ) : null}
          </footer>
        ) : null}
      </div>
    </CanvasBlock>
  );
}

function StatusPill({ status }: { status: StepStatus }) {
  const map: Record<StepStatus, { label: string; cls: string }> = {
    pending: { label: "Pending", cls: "bg-surface-2 text-text-dim" },
    running: { label: "Running…", cls: "bg-amber-500/15 text-amber-300" },
    done: { label: "Done", cls: "bg-emerald-500/15 text-emerald-300" },
    error: { label: "Error", cls: "bg-rose-500/15 text-rose-300" },
  };
  const { label, cls } = map[status];
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${cls}`}>
      {label}
    </span>
  );
}
