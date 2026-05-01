// app/components/discover/PresetCard.tsx
"use client";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Preset } from "@/data/presets";
import { modalityIcon, modalityLabel } from "@/data/modalities";

function padThumbs(images: string[], target: number): string[] {
  if (images.length === 0) return [];
  const out: string[] = [];
  for (let i = 0; i < target; i++) out.push(images[i % images.length]);
  return out;
}

const defaultVideoPool = [
  "https://res.cloudinary.com/demo/video/upload/q_auto:low,f_auto/v1689698989/samples/cld-sample-video.mp4",
  "https://res.cloudinary.com/demo/video/upload/q_auto:low,f_auto/dog.mp4",
  "https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_25fps.mp4",
  "https://res.cloudinary.com/demo/video/upload/q_auto:low,f_auto/sea_turtle.mp4",
  "https://res.cloudinary.com/demo/video/upload/q_auto:low,f_auto/elephants.mp4",
];

// Preset-specific local video assets served from /public/videos/.
// Falls back to defaultVideoPool when a preset isn't listed here.
const presetVideoPools: Record<string, string[]> = {
  "marketing-video": [
    "/videos/marketing/01.mp4",
    "/videos/marketing/02.mp4",
    "/videos/marketing/03.mp4",
    "/videos/marketing/04.mp4",
    "/videos/marketing/05.mp4",
  ],
  "product-variants": [
    "/videos/product-variants/01.mp4",
    "/videos/product-variants/02.mp4",
    "/videos/product-variants/03.mp4",
    "/videos/product-variants/04.mp4",
  ],
  "app-promotion": [
    "/videos/app-promotion/01.mp4",
    "/videos/app-promotion/02.mp4",
    "/videos/app-promotion/03.mp4",
    "/videos/app-promotion/04.mp4",
  ],
  "premium-hero-shot": [
    "/videos/premium-hero-shot/01.mp4",
    "/videos/premium-hero-shot/02.mp4",
    "/videos/premium-hero-shot/03.mp4",
    "/videos/premium-hero-shot/04.mp4",
  ],
  "vlog-selfie": [
    "/videos/vlog-selfie/01.mp4",
    "/videos/vlog-selfie/02.mp4",
    "/videos/vlog-selfie/03.mp4",
  ],
  "make-up": [
    "/videos/make-up/01.mp4",
    "/videos/make-up/02.mp4",
    "/videos/make-up/03.mp4",
  ],
  transition: [
    "/videos/transition/01.mp4",
    "/videos/transition/02.mp4",
    "/videos/transition/03.mp4",
    "/videos/transition/04.mp4",
  ],
  "dancing-preset": [
    "/videos/dancing-preset/01.mp4",
    "/videos/dancing-preset/02.mp4",
    "/videos/dancing-preset/03.mp4",
    "/videos/dancing-preset/04.mp4",
  ],
  lipsync: [
    "/videos/lipsync/01.mp4",
    "/videos/lipsync/02.mp4",
    "/videos/lipsync/03.mp4",
    "/videos/lipsync/04.mp4",
  ],
  "social-trend": [
    "/videos/social-trend/01.mp4",
    "/videos/social-trend/02.mp4",
    "/videos/social-trend/03.mp4",
    "/videos/social-trend/04.mp4",
  ],
  "character-create": [
    "/videos/character-create/01.mp4",
    "/videos/character-create/02.mp4",
    "/videos/character-create/03.mp4",
    "/videos/character-create/04.mp4",
  ],
  "scene-transition": [
    "/videos/scene-transition/01.mp4",
    "/videos/scene-transition/02.mp4",
    "/videos/scene-transition/03.mp4",
    "/videos/scene-transition/04.mp4",
  ],
};

// Per-column top/bottom flex-grow ratios. Each column has its split at a
// different point so the horizontal seams form a staggered rhythm rather
// than a straight line.
const columnSplits: { top: number; bottom: number }[] = [
  { top: 6, bottom: 4 },
  { top: 7, bottom: 3 },
  { top: 5, bottom: 5 },
  { top: 7, bottom: 3 },
];

function VideoTile({
  poster,
  videoSrc,
}: {
  poster: string;
  videoSrc: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="group/tile relative h-full w-full overflow-hidden rounded-[14px] bg-surface">
      <video
        ref={ref}
        src={videoSrc}
        poster={poster}
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition-opacity group-hover/tile:opacity-100">
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-lime-300 px-3 py-1.5 text-[11px] font-semibold text-bg shadow-xl">
          Run the preset
          <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
}

export function PresetCard({ preset }: { preset: Preset }) {
  const Icon = modalityIcon[preset.modality];
  const thumbs =
    preset.sample.kind === "crossfade"
      ? padThumbs(preset.sample.images, columnSplits.length * 2)
      : [];

  const pool = presetVideoPools[preset.id] ?? defaultVideoPool;
  const seedOffset =
    preset.id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    pool.length;
  const videoFor = (i: number) => pool[(seedOffset + i) % pool.length];

  return (
    <Link
      href={`/canvas/${preset.id}`}
      className="group block overflow-hidden rounded-card border border-border bg-gradient-to-br from-[#1a1024] via-[#11070d] to-[#0a0a0a] transition-colors hover:border-border-strong"
    >
      <div className="grid grid-cols-12 gap-4 p-4 md:gap-6 md:p-6">
        <div className="col-span-12 flex flex-col gap-4 md:col-span-4">
          <h3 className="text-[26px] leading-[1.05] font-bold tracking-tight text-text uppercase md:text-[30px]">
            {preset.functionName}
          </h3>
          <p className="line-clamp-3 text-[13px] leading-relaxed text-text-muted">
            {preset.description}
          </p>
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-text px-4 py-2 text-[12px] font-semibold text-bg group-hover:opacity-90">
              <Sparkles className="h-3.5 w-3.5" />
              Try {preset.functionName}
            </span>
          </div>
          <div className="mt-auto flex items-center gap-2 text-[11px] text-text-dim">
            <Icon className="h-3 w-3" />
            <span>
              {modalityLabel[preset.modality]} · {preset.variantCount} templates
            </span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-8">
          <div className="relative h-[300px] [mask-image:linear-gradient(to_right,black_82%,transparent_100%)]">
            <div className="grid h-full grid-cols-4 gap-2">
              {columnSplits.map((split, col) => {
                const topIdx = col * 2;
                const bottomIdx = col * 2 + 1;
                return (
                  <div key={col} className="flex h-full flex-col gap-2">
                    <div
                      className="min-h-0 basis-0"
                      style={{ flexGrow: split.top }}
                    >
                      <VideoTile
                        poster={thumbs[topIdx]}
                        videoSrc={videoFor(topIdx)}
                      />
                    </div>
                    <div
                      className="min-h-0 basis-0"
                      style={{ flexGrow: split.bottom }}
                    >
                      <VideoTile
                        poster={thumbs[bottomIdx]}
                        videoSrc={videoFor(bottomIdx)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
