// app/components/discover/Hero.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { presets } from "@/data/presets";
import { HeroCollage } from "./HeroCollage";

const featuredIds = presets.filter((p) => p.featured).map((p) => p.id);
const FALLBACK_ID = featuredIds[0] ?? presets[0]?.id ?? "marketing-video";

export function Hero() {
  const [featuredId, setFeaturedId] = useState(FALLBACK_ID);

  useEffect(() => {
    if (featuredIds.length > 1) {
      setFeaturedId(
        featuredIds[Math.floor(Math.random() * featuredIds.length)],
      );
    }
  }, []);

  return (
    <section className="relative overflow-hidden rounded-card border border-border bg-gradient-to-br from-[#1f0f1d] via-[#15080f] to-[#0a0a0a]">
      <div className="grid grid-cols-12 gap-6 p-6 md:p-8">
        <div className="col-span-12 flex flex-col gap-5 md:col-span-5">
          <h1 className="text-[42px] leading-[1.0] font-bold tracking-tight text-text uppercase md:text-[50px]">
            One drop in.
            <br />
            Campaign out.
          </h1>
          <p className="max-w-[420px] text-[14px] leading-relaxed text-text-muted">
            Create UGC, product shots, ads, and lifestyle scenes across every
            channel — from a single input.
          </p>
          <div>
            <Link
              href={`/canvas/${featuredId}`}
              className="inline-flex items-center gap-1.5 rounded-pill bg-text px-4 py-2 text-[13px] font-semibold text-bg hover:opacity-90"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Start creating
            </Link>
          </div>
        </div>
        <div className="col-span-12 h-[280px] md:col-span-7 md:h-auto">
          <HeroCollage />
        </div>
      </div>
    </section>
  );
}
