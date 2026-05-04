// app/components/canvas/CanvasBoard.tsx
"use client";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type WheelEvent,
} from "react";
import type { CanvasAsset, CanvasSpec } from "@/data/canvasSpecs";
import { BrandingAssets } from "./BrandingAssets";
import { Draggable } from "./Draggable";
import { CanvasChat } from "./CanvasChat";
import { CanvasToolbar } from "./CanvasToolbar";
import { CanvasZoom } from "./CanvasZoom";
import { StepBlock, type StepStatus } from "./StepBlock";
import { MarketingExtras, MarketingCoachMark } from "./marketing/MarketingExtras";
import type { ChatMessage } from "./CanvasChat";

const MARKETING_PROMPT =
  "Change the character to @avatar running the script on @product";

const MARKETING_MESSAGES: ChatMessage[] = [
  {
    role: "user",
    content: "Generate marketing video for @aura with @avatar1",
  },
  {
    role: "agent",
    content: `Running the script:

A young stylish female influencer @avatars in a cozy modern apartment with soft natural daylight. She records herself using the front camera of her phone (selfie mode), holding the phone in one hand and the AURA @product in the other. The camera has slight natural hand movement, casual framing, and feels real and unpolished.

She looks directly into the camera, relaxed and natural, like talking to a friend. While speaking, she casually rotates the tumbler, shows the handle and lid, lightly taps it, and takes a small sip.

Dialogue (natural, calm, ~15 sec):
"I've been using this tumbler every day lately, and I didn't expect to like it this much. My drinks stay cold literally all day, which is kind of crazy. It doesn't leak, it fits in my car, and the handle is actually super comfortable. I just end up taking it with me everywhere now."`,
  },
];

type BlockId = "branding" | "pipe-1" | "pipe-2" | "pipe-3";

type PipelinePhase =
  | { kind: "idle" }
  | { kind: "running"; current: 1 | 2 | 3 }
  | { kind: "done" };

const STEP_RUN_MS = 900;

export function CanvasBoard({
  card,
  spec,
}: {
  card: CanvasAsset;
  spec: CanvasSpec;
}) {
  const [removed, setRemoved] = useState<Set<BlockId>>(new Set());
  const [phase, setPhase] = useState<PipelinePhase>({ kind: "idle" });
  const [retrySeed, setRetrySeed] = useState(0);

  const remove = (id: BlockId) => setRemoved((s) => new Set(s).add(id));
  const visible = (id: BlockId) => !removed.has(id);

  // Drive the running animation forward.
  useEffect(() => {
    if (phase.kind !== "running") return;
    const t = window.setTimeout(() => {
      setPhase((p) => {
        if (p.kind !== "running") return p;
        if (p.current === 3) return { kind: "done" };
        return { kind: "running", current: (p.current + 1) as 1 | 2 | 3 };
      });
    }, STEP_RUN_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  const handleSend = () => {
    if (phase.kind !== "idle") {
      // already pipelined: bump retry seed so thumbnails refresh
      setRetrySeed((s) => s + 1);
      return;
    }
    setPhase({ kind: "running", current: 1 });
  };

  const stepStatus = (n: 1 | 2 | 3): StepStatus => {
    if (phase.kind === "idle") return "pending";
    if (phase.kind === "done") return "done";
    if (phase.current === n) return "running";
    if (phase.current > n) return "done";
    return "pending";
  };

  const thumbsFor = (n: 1 | 2 | 3): string[] => {
    // Mock thumbs — reuse the hero asset image so step blocks are non-empty.
    const base = card.image;
    if (n === 1) return [base, base, base, base];
    if (n === 2) return [base, base, base];
    return [base];
  };

  // Pan
  const innerRef = useRef<HTMLDivElement>(null);
  const pan = useRef({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const [grabbing, setGrabbing] = useState(false);
  const applyTransform = () => {
    const el = innerRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${pan.current.x}px, ${pan.current.y}px, 0)`;
  };
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest("[data-canvas-block]") || target.closest("[data-canvas-overlay]")) return;
    drag.current = { x: e.clientX, y: e.clientY, px: pan.current.x, py: pan.current.y };
    setGrabbing(true);
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    pan.current.x = d.px + (e.clientX - d.x);
    pan.current.y = d.py + (e.clientY - d.y);
    applyTransform();
  };
  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    drag.current = null;
    setGrabbing(false);
    (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
  };

  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    pan.current.x -= e.deltaX;
    pan.current.y -= e.deltaY;
    applyTransform();
  };

  return (
    <div className="relative flex-1 overflow-hidden">
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onWheel={onWheel}
        onPointerCancel={endDrag}
        className={
          grabbing
            ? "absolute inset-0 cursor-grabbing select-none touch-none"
            : "absolute inset-0 cursor-grab touch-none"
        }
      >
        <div
          ref={innerRef}
          className="will-change-transform"
          style={{ transform: "translate3d(0px, 0px, 0)" }}
        >
          <div className="flex w-max items-start gap-12 px-12 py-10 pr-[340px]">
            <div className="flex w-[560px] shrink-0 flex-col gap-7">
              <p className="text-[10px] uppercase tracking-[0.14em] text-text-dim">
                Branding assets
              </p>

              {visible("branding") ? (
                <Draggable>
                  <BrandingAssets onDelete={() => remove("branding")} />
                </Draggable>
              ) : null}
            </div>


            {phase.kind !== "idle" ? (
              <div key={retrySeed} className="flex flex-col gap-4">
                {visible("pipe-1") ? (
                  <Draggable>
                    <StepBlock
                      kind="generate"
                      status={stepStatus(1)}
                      thumbs={thumbsFor(1)}
                      onRetry={() => setRetrySeed((s) => s + 1)}
                      onFork={() => {}}
                      onDelete={() => remove("pipe-1")}
                    />
                  </Draggable>
                ) : null}
                {visible("pipe-2") && (phase.kind === "done" || (phase.kind === "running" && phase.current >= 2)) ? (
                  <Draggable>
                    <StepBlock
                      kind="refine"
                      status={stepStatus(2)}
                      thumbs={thumbsFor(2)}
                      onRetry={() => setRetrySeed((s) => s + 1)}
                      onFork={() => {}}
                      onDelete={() => remove("pipe-2")}
                    />
                  </Draggable>
                ) : null}
                {visible("pipe-3") && (phase.kind === "done" || (phase.kind === "running" && phase.current >= 3)) ? (
                  <Draggable>
                    <StepBlock
                      kind="deliver"
                      status={stepStatus(3)}
                      thumbs={thumbsFor(3)}
                      onRetry={() => setRetrySeed((s) => s + 1)}
                      onDelete={() => remove("pipe-3")}
                    />
                  </Draggable>
                ) : null}
              </div>
            ) : null}

            {card.id === "marketing-video" ? <MarketingExtras /> : null}
          </div>
        </div>
      </div>
      <CanvasZoom />
      <CanvasToolbar />
      <CanvasChat
        title={spec.displayTitle}
        onSend={handleSend}
        initialValue={card.id === "marketing-video" ? MARKETING_PROMPT : ""}
        initialMessages={card.id === "marketing-video" ? MARKETING_MESSAGES : []}
      />
      {card.id === "marketing-video" ? <MarketingCoachMark /> : null}
    </div>
  );
}
