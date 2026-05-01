// app/components/discover/PromptBar.tsx
"use client";
import { useState } from "react";
import { ArrowUp, Mic, Paperclip, Sparkles } from "lucide-react";

export function PromptBar() {
  const [value, setValue] = useState("");

  return (
    <div className="rounded-card border border-border bg-surface-2 px-3 py-2.5 shadow-inner">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What do you want to create today?"
        maxLength={2000}
        rows={1}
        className="block min-h-[28px] w-full resize-none bg-transparent text-[13px] text-text placeholder:text-text-dim focus:outline-none"
      />
      <div className="mt-1 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Attach"
            className="grid h-7 w-7 place-items-center rounded-full text-text-dim hover:bg-surface-hover hover:text-text"
          >
            <Paperclip className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-pill border border-border px-2.5 py-1 text-[11px] text-text-muted hover:border-border-strong hover:text-text"
          >
            <Sparkles className="h-3 w-3" />
            Improve prompt
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Voice"
            className="grid h-7 w-7 place-items-center rounded-full text-text-dim hover:bg-surface-hover hover:text-text"
          >
            <Mic className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="Send"
            onClick={() => setValue("")}
            className="grid h-7 w-7 place-items-center rounded-full bg-text text-bg hover:opacity-90"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
