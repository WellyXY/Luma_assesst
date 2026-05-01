import { Minus, Plus } from "lucide-react";

export function CanvasZoom() {
  return (
    <div data-canvas-overlay className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-1">
      <div className="pointer-events-auto flex h-8 items-center gap-1 rounded-pill bg-surface/80 px-2 text-[12px] text-text-muted backdrop-blur">
        <span className="px-1 font-medium tabular-nums">100%</span>
        <button
          type="button"
          aria-label="Zoom out"
          className="grid h-6 w-6 place-items-center rounded-full text-text-dim hover:bg-surface-hover hover:text-text"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          className="grid h-6 w-6 place-items-center rounded-full text-text-dim hover:bg-surface-hover hover:text-text"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
