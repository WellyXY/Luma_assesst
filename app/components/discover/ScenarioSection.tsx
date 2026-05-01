// app/components/discover/ScenarioSection.tsx
import { ChevronRight } from "lucide-react";
import { presets } from "@/data/presets";
import type { Scenario } from "@/data/scenarios";
import { PresetCard } from "./PresetCard";

export function ScenarioSection({ scenario }: { scenario: Scenario }) {
  const items = scenario.presetIds
    .map((id) => presets.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (items.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <h2 className="text-[13px] uppercase tracking-[0.12em] text-text-muted">
          {scenario.label}
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 text-[12px] text-text-dim hover:text-text"
        >
          View all
          <ChevronRight className="h-3 w-3" />
        </button>
      </header>
      <div className="flex flex-col gap-4">
        {items.map((preset) => (
          <PresetCard key={preset.id} preset={preset} />
        ))}
      </div>
    </section>
  );
}
