// data/canvasSpecs.ts
import { cards, type DiscoverCardData } from "./cards";
import { presets, type Preset } from "./presets";
import type { FilterCategory } from "./filters";

export type CanvasStep = {
  title: string;
  body: string;
};

/**
 * Unified shape consumed by the Canvas page.
 * `card.image` and `card.category` keep the existing prop names so
 * `VariantPlaceholder` and `<Image src={card.image}>` keep working.
 */
export type CanvasAsset = {
  id: string;
  title: string;
  image: string;
  category: FilterCategory;
};

export type CanvasSpec = {
  cardId: string;
  displayTitle: string;
  description: string;
  steps: CanvasStep[];
  workspaceHint: string;
};

const overrides: Record<string, Partial<CanvasSpec>> = {
  "generate-product-variants": {
    displayTitle: "Consistent Product Variants",
    description:
      "Upload any product photo and I'll generate stunning color, texture, and finish variants — from sleek simple finishes like metallics to wild treatments like liquid metal — while preserving every detail of your product's shape.",
    steps: [
      {
        title: "Step 1",
        body: "I generate 10 surface treatments for your product: 5 refined finishes and 5 wild, unexpected textures — all in your original setting.",
      },
      {
        title: "Step 2",
        body: "You pick your favorite, and I shoot it from 6 different camera angles with dramatic lighting to find the hero shot.",
      },
    ],
    workspaceHint:
      'Drop your product image above, click to select it, tell me to "Use this one" in the chat and submit.',
  },
  "build-full-body-characters": {
    displayTitle: "Full-Body Character Studio",
    description:
      "Drop a single headshot and I'll spin up full-body character variants across body types, poses, and outfits — keeping the face consistent every time.",
    steps: [
      {
        title: "Step 1",
        body: "I extract identity cues from the headshot and generate 6 full-body looks in your chosen setting.",
      },
      {
        title: "Step 2",
        body: "Pick your favorite, and I'll render an expression sheet plus 4 hero angles ready for production.",
      },
    ],
    workspaceHint:
      'Drop a headshot above, then tell me the vibe — "1990s skater", "fantasy archer", "boardroom CEO" — and submit.',
  },
};

const fallback = (card: DiscoverCardData): CanvasSpec => ({
  cardId: card.id,
  displayTitle: card.title,
  description: `${card.outcome}. Use the canvas to drop in your inputs and the chat to give me direction — I'll produce ${card.templateCount} starting templates and we iterate from there.`,
  steps: [
    {
      title: "Step 1",
      body: `I generate a first wave of options based on your input and the ${card.templateCount} templates available for this preset.`,
    },
    {
      title: "Step 2",
      body: "Pick the direction you like, and I'll refine, upscale, and produce final deliverables ready to ship.",
    },
  ],
  workspaceHint: "Drop your reference above (or describe it in the chat) and tell me what you want.",
});

const presetToAsset = (p: Preset): CanvasAsset => {
  const heroImage =
    p.sample.kind === "crossfade" ? p.sample.images[0] : p.sample.poster ?? "";
  return {
    id: p.id,
    title: p.functionName,
    image: heroImage,
    category: "all",
  };
};

const presetToSpec = (p: Preset): CanvasSpec => ({
  cardId: p.id,
  displayTitle: p.canvasTitle,
  description: p.description,
  steps: p.steps,
  workspaceHint: p.workspaceHint,
});

export function getCanvasSpec(
  id: string,
): { card: CanvasAsset; spec: CanvasSpec } | null {
  const preset = presets.find((p) => p.id === id);
  if (preset) {
    return { card: presetToAsset(preset), spec: presetToSpec(preset) };
  }
  const card = cards.find((c) => c.id === id);
  if (!card) return null;
  const base = fallback(card);
  const ov = overrides[id];
  return {
    card: { id: card.id, title: card.title, image: card.image, category: card.category },
    spec: ov ? { ...base, ...ov } : base,
  };
}
