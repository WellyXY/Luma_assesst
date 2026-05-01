// app/components/discover/Launchpad.tsx
import { Image as ImageIcon, Mic, Play, Sparkles, TrendingUp, type LucideIcon } from "lucide-react";
import { presets } from "@/data/presets";
import { BigTile } from "./LaunchpadTile";

const big = presets.find((p) => p.id === "marketing-video") ?? presets[0];

type StaticTile = {
  id: string;
  label: string;
  tagline: string;
  Icon: LucideIcon;
  badge?: { label: string; tone: "lime" | "rose" };
};

const staticTiles: StaticTile[] = [
  {
    id: "generate-video",
    label: "Generate Video",
    tagline: "High-quality videos in seconds",
    Icon: Play,
  },
  {
    id: "generate-image",
    label: "Generate Image",
    tagline: "Describe an image and ship it",
    Icon: ImageIcon,
  },
  {
    id: "aesthetics-post",
    label: "Aesthetics Post",
    tagline: "Mood-driven social posts",
    Icon: Sparkles,
    badge: { label: "New", tone: "lime" },
  },
  {
    id: "lipsync",
    label: "Lipsync",
    tagline: "Make any portrait sing",
    Icon: Mic,
  },
  {
    id: "social-trend",
    label: "Social Trend",
    tagline: "Project assets into 7 trends",
    Icon: TrendingUp,
  },
];

const badgeClasses = {
  lime: "bg-lime-300 text-bg",
  rose: "bg-rose-400 text-white",
} as const;

function StaticTile({ tile }: { tile: StaticTile }) {
  const Icon = tile.Icon;
  return (
    <div className="relative flex h-full flex-col rounded-card border border-border bg-surface p-4">
      <div className="flex items-start justify-between">
        <Icon className="h-4 w-4 text-text" />
        {tile.badge ? (
          <span
            className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${badgeClasses[tile.badge.tone]}`}
          >
            {tile.badge.label}
          </span>
        ) : null}
      </div>
      <div className="mt-auto pt-8">
        <h3 className="text-[14px] font-semibold text-text">{tile.label}</h3>
        <p className="mt-0.5 line-clamp-1 text-[12px] text-text-muted">
          {tile.tagline}
        </p>
      </div>
    </div>
  );
}

export function Launchpad() {
  return (
    <div className="scrollbar-hide -mx-2 overflow-x-auto px-2">
      <div className="flex h-[260px] min-w-max gap-3">
        <div className="w-[280px] shrink-0">
          <BigTile preset={big} />
        </div>
        {staticTiles.map((tile) => (
          <div key={tile.id} className="w-[200px] shrink-0">
            <StaticTile tile={tile} />
          </div>
        ))}
      </div>
    </div>
  );
}
