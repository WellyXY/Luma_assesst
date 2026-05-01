import {
  AudioLines,
  Circle,
  Image as ImageIcon,
  Maximize2,
  MousePointer2,
  Pencil,
  Plus,
  Play,
  StickyNote,
  Type,
  type LucideIcon,
} from "lucide-react";

const tools: { icon: LucideIcon; label: string; active?: boolean }[] = [
  { icon: MousePointer2, label: "Select", active: true },
  { icon: ImageIcon, label: "Image" },
  { icon: Play, label: "Video" },
  { icon: AudioLines, label: "Audio" },
  { icon: Maximize2, label: "Frame" },
  { icon: Pencil, label: "Draw" },
  { icon: Type, label: "Text" },
  { icon: StickyNote, label: "Note" },
  { icon: Circle, label: "Shape" },
  { icon: Plus, label: "More" },
];

export function CanvasToolbar() {
  return (
    <div data-canvas-overlay className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-1.5 shadow-lg">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.label}
              type="button"
              aria-label={tool.label}
              className={
                tool.active
                  ? "grid h-8 w-8 place-items-center rounded-full bg-surface-active text-text"
                  : "grid h-8 w-8 place-items-center rounded-full text-text-muted hover:bg-surface-hover hover:text-text"
              }
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
