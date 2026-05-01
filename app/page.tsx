// app/page.tsx
import { MoreVertical } from "lucide-react";
import { Sidebar } from "./components/sidebar/Sidebar";
import { PromptBar } from "./components/discover/PromptBar";
import { Launchpad } from "./components/discover/Launchpad";
import { ScenarioSection } from "./components/discover/ScenarioSection";
import { scenarios } from "@/data/scenarios";

export default function DiscoverPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-6 py-5 md:px-8 lg:px-10">
        <div className="flex justify-end">
          <button
            type="button"
            aria-label="More"
            className="grid h-8 w-8 place-items-center rounded-full border border-border text-text-dim hover:bg-surface-hover hover:text-text"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>

        <div className="mx-auto mt-6 flex max-w-[1280px] flex-col gap-8">
          <section className="rounded-card border border-border bg-surface/40 p-3 shadow-xl backdrop-blur">
            <PromptBar />
            <div className="my-3 border-t border-border/40" />
            <Launchpad />
          </section>

          {scenarios.map((scenario) => (
            <ScenarioSection key={scenario.id} scenario={scenario} />
          ))}
        </div>
      </main>
    </div>
  );
}
