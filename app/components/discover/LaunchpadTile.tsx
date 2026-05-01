// app/components/discover/LaunchpadTile.tsx
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Preset } from "@/data/presets";
import { modalityIcon } from "@/data/modalities";

type Badge = { label: string; tone: "lime" | "rose" };

const badgeClasses: Record<Badge["tone"], string> = {
  lime: "bg-lime-300 text-bg",
  rose: "bg-rose-400 text-white",
};

const taglines: Record<string, string> = {
  "marketing-video": "Cut a 15s campaign video, ready to ship",
  "product-variants": "Color, texture, finish — endless variants",
  "app-promotion": "App store promo with motion and CTA",
  "premium-hero-shot": "Magazine-grade product hero",
  "vlog-selfie": "Static selfie → 9:16 vlog clip",
  "make-up": "8 makeup looks on your portrait",
  "transition": "Viral 4s transitions, beat-synced",
  "dancing-preset": "Animate a still into a dance trend",
  "lipsync": "Make any portrait sing",
  "social-trend": "Project your asset into 7 trends",
  "character-create": "Original characters, infinite directions",
  "scene-transition": "Editor-grade match-cuts and whips",
};

export function BigTile({ preset }: { preset: Preset }) {
  const heroSrc =
    preset.sample.kind === "crossfade" ? preset.sample.images[0] : "";
  return (
    <Link
      href={`/canvas/${preset.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-gradient-to-br from-[#1a1024] via-[#0e0612] to-[#0a0a0a] p-5 transition-colors hover:border-border-strong"
    >
      <div className="relative z-10 flex flex-col gap-1.5">
        <h3 className="text-[22px] leading-[1.05] font-bold text-text">
          {preset.functionName}
        </h3>
        <p className="max-w-[180px] text-[12px] leading-snug text-text-muted">
          {taglines[preset.id] ?? preset.functionName}
        </p>
      </div>
      <div className="relative z-10 mt-auto">
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-text px-3.5 py-1.5 text-[12px] font-semibold text-bg group-hover:opacity-90">
          <Sparkles className="h-3 w-3" />
          Start Creating
        </span>
      </div>
      {heroSrc ? (
        <div className="pointer-events-none absolute inset-y-0 right-0 w-3/5">
          <Image
            src={heroSrc}
            alt=""
            fill
            sizes="320px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1024] via-[#1a1024]/70 to-transparent" />
        </div>
      ) : null}
    </Link>
  );
}

export function SmallTile({
  preset,
  badge,
}: {
  preset: Preset;
  badge?: Badge;
}) {
  const Icon = modalityIcon[preset.modality];
  return (
    <Link
      href={`/canvas/${preset.id}`}
      className="group relative flex h-full flex-col rounded-card border border-border bg-surface p-4 transition-colors hover:border-border-strong hover:bg-surface-hover"
    >
      <div className="flex items-start justify-between">
        <Icon className="h-4 w-4 text-text" />
        {badge ? (
          <span
            className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${badgeClasses[badge.tone]}`}
          >
            {badge.label}
          </span>
        ) : null}
      </div>
      <div className="mt-auto pt-8">
        <h3 className="text-[14px] font-semibold text-text">
          {preset.functionName}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-[12px] text-text-muted">
          {taglines[preset.id] ?? preset.functionName}
        </p>
      </div>
    </Link>
  );
}
