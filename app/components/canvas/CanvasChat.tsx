// app/components/canvas/CanvasChat.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, ChevronDown, Mic, Minus, Plus, Sparkles } from "lucide-react";

export type ChatMessage = {
  role: "user" | "agent";
  content: string;
};

const TOKEN_RE = /(@\w+)/g;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function highlightTokens(text: string): string {
  return escapeHtml(text).replace(
    TOKEN_RE,
    '<span class="rounded bg-lime-300/20 px-1 font-semibold text-lime-300">$1</span>',
  );
}

function renderInline(text: string) {
  const parts = text.split(TOKEN_RE);
  return parts.map((part, i) =>
    TOKEN_RE.test(part) ? (
      <span
        key={i}
        className="rounded bg-lime-300/20 px-1 font-semibold text-lime-300"
      >
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function CanvasChat({
  title,
  onSend,
  initialValue = "",
  initialMessages = [],
}: {
  title: string;
  onSend?: (value: string) => void;
  initialValue?: string;
  initialMessages?: ChatMessage[];
}) {
  const inputRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);

  // Pre-fill the prompt with highlighted @-tokens once on mount.
  useEffect(() => {
    if (inputRef.current && initialValue) {
      inputRef.current.innerHTML = highlightTokens(initialValue);
    }
  }, [initialValue]);

  const handleSend = () => {
    const text = inputRef.current?.innerText ?? "";
    onSend?.(text);
    if (inputRef.current) inputRef.current.innerHTML = "";
  };

  return (
    <aside
      data-canvas-overlay
      className="absolute top-3 right-3 bottom-3 flex w-[300px] flex-col overflow-hidden rounded-card border border-border bg-surface shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="flex flex-1 items-center gap-1.5 text-left text-[12px] font-medium text-text"
        >
          <span className="truncate">{title}</span>
          <ChevronDown className="h-3.5 w-3.5 text-text-dim" />
        </button>
        <button
          type="button"
          aria-label="Minimize"
          onClick={() => setCollapsed((c) => !c)}
          className="grid h-5 w-5 place-items-center rounded text-text-dim hover:bg-surface-hover hover:text-text"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
      </div>

      {collapsed ? null : (
        <>
          {initialMessages.length > 0 ? (
            <div className="flex-1 space-y-3 overflow-y-auto p-3">
              {initialMessages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user" ? "flex justify-end" : "flex justify-start"
                  }
                >
                  {m.role === "agent" ? (
                    <div className="mt-0.5 mr-2 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-surface-2">
                      <Sparkles className="h-3 w-3 text-text-dim" />
                    </div>
                  ) : null}
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-card bg-text px-3 py-2 text-[12px] leading-snug whitespace-pre-wrap text-bg"
                        : "max-w-[85%] rounded-card bg-surface-2 px-3 py-2 text-[12px] leading-snug whitespace-pre-wrap text-text"
                    }
                  >
                    {renderInline(m.content)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid flex-1 place-items-center text-[12px] text-text-dim">
              No messages
            </div>
          )}

          <div data-coach="prompt" className="border-t border-border bg-surface-2 p-3">
            <div
              ref={inputRef}
              contentEditable
              suppressContentEditableWarning
              role="textbox"
              aria-multiline="true"
              data-placeholder="What do you want to do?"
              className="block max-h-[120px] min-h-[44px] w-full overflow-y-auto bg-transparent text-[13px] leading-snug text-text outline-none empty:before:text-text-dim empty:before:content-[attr(data-placeholder)]"
            />
            <div className="mt-2 flex items-center justify-between">
              <button
                type="button"
                className="flex items-center gap-1 rounded-pill border border-border px-2 py-1 text-[11px] text-text-muted hover:border-border-strong hover:text-text"
              >
                <Plus className="h-3 w-3" />
                Create
                <ChevronDown className="h-3 w-3" />
              </button>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Voice input"
                  className="grid h-7 w-7 place-items-center rounded-full text-text-dim hover:bg-surface-hover hover:text-text"
                >
                  <Mic className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  aria-label="Send"
                  onClick={handleSend}
                  className="grid h-7 w-7 place-items-center rounded-full bg-text text-bg hover:opacity-90"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
