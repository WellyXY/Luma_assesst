// app/components/canvas/marketing/MarketingExtras.tsx
"use client";
import Image from "next/image";
import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  ChevronDown,
  Plus,
  ShoppingBag,
  Sparkles,
  User,
  X,
  type LucideProps,
} from "lucide-react";
import { CanvasBlock } from "../CanvasBlock";
import { Draggable } from "../Draggable";

function PortalLayer({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=70`;
const luma = (file: string) =>
  `https://cdn.sanity.io/images/2ylxvaa2/production/${file}?w=400&q=70&fit=crop&auto=format`;

type Asset = { id: string; label: string; image: string };

const characterOptions: Asset[] = [
  { id: "avatar1", label: "@avatar1", image: u("photo-1494790108377-be9c29b29330") },
  { id: "avatar2", label: "@avatar2", image: u("photo-1488161628813-04466f872be2") },
  { id: "avatar3", label: "@avatar3", image: u("photo-1607746882042-944635dfe10e") },
  { id: "avatar4", label: "@avatar4", image: u("photo-1543258103-a62bdc069871") },
  { id: "avatar5", label: "@avatar5", image: u("photo-1544005313-94ddf0286df2") },
  { id: "avatar6", label: "@avatar6", image: u("photo-1535223289827-42f1e9919769") },
];

const productOptions: Asset[] = [
  { id: "aura", label: "@aura", image: luma("c27b66480a1d1d45cee122082b87878e929e695b-750x422.png") },
  { id: "luna", label: "@luna", image: luma("f2f02332f46a1a6c6f778719acca742cefa74ea0-750x422.png") },
  { id: "vega", label: "@vega", image: luma("4c4a623ef498c910d39a433083331b2d702793f8-750x422.png") },
  { id: "atlas", label: "@atlas", image: luma("25fbac4414a3ec08b8cf55c4ff3cff13e878b4f8-750x422.png") },
  { id: "nova", label: "@nova", image: luma("7548817b0c048bea8b9807abe15d1dd4bffdc93a-750x422.png") },
  { id: "iris", label: "@iris", image: luma("bcfc14f50736f6525fb6df72ff62550b5e6c2a16-750x422.png") },
];

function AssetBlock({
  title,
  asset,
  onPick,
}: {
  title: string;
  asset: Asset;
  onPick: () => void;
}) {
  return (
    <CanvasBlock onDelete={() => {}} className="px-3 py-3">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPick();
        }}
        onMouseDown={(e) => e.stopPropagation()}
        className="flex w-[280px] flex-col gap-3 text-left"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.14em] text-text-dim">
            {title}
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-text-dim" />
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-surface">
          <Image
            src={asset.image}
            alt={asset.label}
            fill
            sizes="280px"
            className="object-cover"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold text-text">
            {asset.label}
          </span>
          <span className="rounded-pill border border-border px-2 py-0.5 text-[11px] text-text-muted">
            Change
          </span>
        </div>
      </button>
    </CanvasBlock>
  );
}

function OutputBlock({ src }: { src: string }) {
  return (
    <CanvasBlock onDelete={() => {}} className="px-3 py-3">
      <div
        className="flex w-[280px] flex-col gap-3"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.14em] text-text-dim">
            Output Video
          </span>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
            Done
          </span>
        </div>
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-card bg-surface">
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </CanvasBlock>
  );
}

function AssetPickerModal({
  title,
  options,
  onSelect,
  onClose,
}: {
  title: string;
  options: Asset[];
  onSelect: (asset: Asset) => void;
  onClose: () => void;
}) {
  return (
    <PortalLayer>
      <div
        data-canvas-overlay
        className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-6 backdrop-blur"
        onClick={onClose}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          className="max-h-[80vh] w-[640px] overflow-auto rounded-card border border-border bg-surface p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[18px] font-bold text-text">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-full text-text-dim hover:bg-surface-hover hover:text-text"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                onSelect(opt);
                onClose();
              }}
              className="group flex flex-col gap-2 rounded-card p-2 text-left transition-colors hover:bg-surface-hover"
            >
              <div className="relative aspect-square overflow-hidden rounded-md bg-bg">
                <Image
                  src={opt.image}
                  alt={opt.label}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>
              <span className="text-[12px] font-medium text-text">{opt.label}</span>
            </button>
          ))}
          <button
            type="button"
            className="flex flex-col items-center gap-2 rounded-card p-2 text-text-dim hover:text-text"
          >
            <div className="grid aspect-square w-full place-items-center rounded-md border border-dashed border-border bg-bg hover:border-border-strong">
              <Plus className="h-6 w-6" />
            </div>
            <span className="text-[12px]">Create new</span>
          </button>
        </div>
        </div>
      </div>
    </PortalLayer>
  );
}

type CoachStep = {
  selector: string;
  title: string;
  body: string;
  Icon: ComponentType<LucideProps>;
  side: "left" | "right" | "bottom" | "top";
};

const COACH_STEPS: CoachStep[] = [
  {
    selector: '[data-coach="character"]',
    title: "Choose your character",
    body: "Pick the avatar that performs the script. Click to swap or create a new one anytime.",
    Icon: User,
    side: "left",
  },
  {
    selector: '[data-coach="product"]',
    title: "Choose your product",
    body: "Drop in the product the avatar holds. We keep its shape consistent across every shot.",
    Icon: ShoppingBag,
    side: "left",
  },
  {
    selector: '[data-coach="prompt"]',
    title: "Run the script",
    body: "Hit Send to kick off the pipeline — I'll generate, refine, and deliver in seconds.",
    Icon: Sparkles,
    side: "top",
  },
];

const TOOLTIP_W = 320;
const TOOLTIP_GAP = 20;
const SPOTLIGHT_PAD = 8;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function MarketingCoachMark() {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!visible) return;
    const update = () => {
      const target = document.querySelector(COACH_STEPS[idx].selector);
      if (target) setRect(target.getBoundingClientRect());
    };
    update();
    const id = window.setTimeout(update, 80);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [visible, idx]);

  const dismiss = () => setVisible(false);

  const next = () => {
    if (idx === COACH_STEPS.length - 1) dismiss();
    else setIdx((i) => i + 1);
  };

  if (!visible || !rect) return null;

  const step = COACH_STEPS[idx];
  const Icon = step.Icon;
  const isLast = idx === COACH_STEPS.length - 1;

  const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;

  let tooltipTop = rect.top;
  let tooltipLeft = rect.left;

  const TOOLTIP_H_EST = 200;
  if (step.side === "right") {
    tooltipLeft = rect.right + TOOLTIP_GAP;
  } else if (step.side === "left") {
    tooltipLeft = rect.left - TOOLTIP_W - TOOLTIP_GAP;
  } else if (step.side === "top") {
    tooltipTop = rect.top - TOOLTIP_GAP - TOOLTIP_H_EST;
    tooltipLeft = rect.left - TOOLTIP_W - TOOLTIP_GAP;
  } else {
    tooltipTop = rect.bottom + TOOLTIP_GAP;
  }

  tooltipTop = clamp(tooltipTop, 16, vh - 220);
  tooltipLeft = clamp(tooltipLeft, 16, vw - TOOLTIP_W - 16);

  return (
    <>
      {/* Spotlight cutout — dim everything except a rounded hole around the target */}
      <div
        className="pointer-events-none fixed z-[100] rounded-card transition-all duration-200"
        style={{
          top: rect.top - SPOTLIGHT_PAD,
          left: rect.left - SPOTLIGHT_PAD,
          width: rect.width + SPOTLIGHT_PAD * 2,
          height: rect.height + SPOTLIGHT_PAD * 2,
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.78)",
        }}
      />

      {/* Tooltip card with floating icon bubble */}
      <div
        className="fixed z-[110] w-[320px] rounded-card border border-border bg-surface p-4 shadow-2xl"
        style={{ top: tooltipTop, left: tooltipLeft }}
      >
        <div className="-mt-9 mb-2 grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-2 shadow-lg">
          <Icon className="h-4 w-4 text-text" />
        </div>
        <h4 className="mb-1 text-[15px] font-bold text-text">{step.title}</h4>
        <p className="mb-4 text-[12px] leading-relaxed text-text-muted">
          {step.body}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-text-dim">
            {idx + 1} / {COACH_STEPS.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={dismiss}
              className="text-[12px] text-text-dim hover:text-text"
            >
              Skip
            </button>
            <button
              type="button"
              onClick={next}
              className="rounded-pill bg-lime-300 px-3 py-1.5 text-[12px] font-semibold text-bg shadow-lg hover:opacity-90"
            >
              {isLast ? "Got it" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function MarketingExtras() {
  const [character, setCharacter] = useState(characterOptions[0]);
  const [product, setProduct] = useState(productOptions[0]);
  const [picking, setPicking] = useState<"character" | "product" | null>(null);

  return (
    <>
      <div className="flex w-[300px] shrink-0 flex-col gap-5">
        <p className="text-[10px] uppercase tracking-[0.14em] text-text-dim">
          Marketing kit
        </p>
        <Draggable>
          <div data-coach="character">
            <AssetBlock
              title="Character"
              asset={character}
              onPick={() => setPicking("character")}
            />
          </div>
        </Draggable>
        <Draggable>
          <div data-coach="product">
            <AssetBlock
              title="Product"
              asset={product}
              onPick={() => setPicking("product")}
            />
          </div>
        </Draggable>
        <Draggable>
          <OutputBlock src="/videos/marketing/01.mp4" />
        </Draggable>
      </div>

      {picking === "character" ? (
        <AssetPickerModal
          title="Choose a character"
          options={characterOptions}
          onSelect={setCharacter}
          onClose={() => setPicking(null)}
        />
      ) : null}
      {picking === "product" ? (
        <AssetPickerModal
          title="Choose a product"
          options={productOptions}
          onSelect={setProduct}
          onClose={() => setPicking(null)}
        />
      ) : null}
    </>
  );
}
