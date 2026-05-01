// data/presets.ts
import type { Modality } from "./modalities";
import type { ScenarioId } from "./scenarios";

export type PresetSample =
  | { kind: "video"; src: string; poster?: string }
  | { kind: "crossfade"; images: string[]; intervalMs?: number };

export type PresetStep = {
  title: string;
  body: string;
};

export type Preset = {
  id: string;
  scenarioId: ScenarioId;
  functionName: string;
  modality: Modality;
  variantCount: number;
  sample: PresetSample;
  canvasTitle: string;
  description: string;
  steps: PresetStep[];
  workspaceHint: string;
  /** Hero CTA pulls a random preset from those flagged featured. */
  featured?: boolean;
};

const luma = (file: string) =>
  `https://cdn.sanity.io/images/2ylxvaa2/production/${file}?w=600&q=70&fit=crop&auto=format`;

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=70`;

export const presets: Preset[] = [
  {
    id: "marketing-video",
    scenarioId: "e-commerce",
    functionName: "Marketing Video",
    modality: "video",
    variantCount: 8,
    sample: {
      kind: "crossfade",
      images: [
        luma("c27b66480a1d1d45cee122082b87878e929e695b-750x422.png"),
        luma("03d98f51394617d4427e17692a60c7eb5df900b4-750x422.png"),
        luma("728e390759fdc756b96ee3464e51909a82468ba4-750x422.png"),
        luma("7548817b0c048bea8b9807abe15d1dd4bffdc93a-750x422.png"),
      ],
    },
    canvasTitle: "Product Marketing Video",
    description:
      "Drop a product photo and a one-line angle. I'll cut a 15-second campaign video tuned for TikTok, Reels, or YouTube Shorts — with motion, captions, and a hook that lands in the first 2 seconds.",
    steps: [
      {
        title: "Step 1",
        body: "I generate 3 video angles based on your product and target platform — fast cut, lifestyle, and demo.",
      },
      {
        title: "Step 2",
        body: "You pick the take, and I render the final 15s cut with on-brand text overlays and music.",
      },
    ],
    workspaceHint:
      'Drop your product image, type your tagline (e.g. "Made cold to last all day"), submit.',
    featured: true,
  },
  {
    id: "product-variants",
    scenarioId: "e-commerce",
    functionName: "Product Variants",
    modality: "image",
    variantCount: 14,
    sample: {
      kind: "crossfade",
      images: [
        luma("4c4a623ef498c910d39a433083331b2d702793f8-750x422.png"),
        luma("c27b66480a1d1d45cee122082b87878e929e695b-750x422.png"),
        luma("f2f02332f46a1a6c6f778719acca742cefa74ea0-750x422.png"),
      ],
    },
    canvasTitle: "Consistent Product Variants",
    description:
      "Upload any product photo and I'll generate stunning color, texture, and finish variants — from sleek metallics to wild liquid metal — while preserving every detail of your product's shape.",
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
    featured: true,
  },
  {
    id: "app-promotion",
    scenarioId: "e-commerce",
    functionName: "APP Promotion",
    modality: "video",
    variantCount: 6,
    sample: {
      kind: "crossfade",
      images: [
        luma("ec3a2c26b08c24735b69c5281fe9f047e159b363-750x422.png"),
        luma("03d98f51394617d4427e17692a60c7eb5df900b4-750x422.png"),
        luma("9932dd2d7fc5cb39ddaadfe266ed3658afe7ea6d-750x422.png"),
      ],
    },
    canvasTitle: "App Promotion Spot",
    description:
      "Drop your app screenshots. I'll spin them into a 10-second app store promo with smooth UI transitions, voiceover hook, and an end-card CTA.",
    steps: [
      {
        title: "Step 1",
        body: "I sequence your screenshots into a narrative arc — problem, feature, payoff — with motion between every screen.",
      },
      {
        title: "Step 2",
        body: "Pick a voiceover style (energetic / calm / premium) and I'll render the final spot with captions baked in.",
      },
    ],
    workspaceHint:
      "Drop 3–5 app screenshots above, type a one-line value prop, submit.",
    featured: true,
  },
  {
    id: "premium-hero-shot",
    scenarioId: "e-commerce",
    functionName: "Premium Hero Shot",
    modality: "image",
    variantCount: 9,
    sample: {
      kind: "crossfade",
      images: [
        luma("c27b66480a1d1d45cee122082b87878e929e695b-750x422.png"),
        luma("728e390759fdc756b96ee3464e51909a82468ba4-750x422.png"),
        luma("bcfc14f50736f6525fb6df72ff62550b5e6c2a16-750x422.png"),
      ],
    },
    canvasTitle: "Premium Hero Shot",
    description:
      "Turn a flat product photo into a magazine-grade hero: studio lighting, considered composition, and a backdrop that elevates the brand.",
    steps: [
      {
        title: "Step 1",
        body: "I propose 4 hero compositions (centered / off-axis / tabletop / floating) and apply each to your product.",
      },
      {
        title: "Step 2",
        body: "Pick one and I'll dial in lighting, depth-of-field, and color grading to magazine quality.",
      },
    ],
    workspaceHint: "Drop your product photo, optionally add a mood word, submit.",
  },
  {
    id: "vlog-selfie",
    scenarioId: "social-aesthetics",
    functionName: "Vlog Selfie",
    modality: "video",
    variantCount: 5,
    sample: {
      kind: "crossfade",
      images: [
        u("photo-1494790108377-be9c29b29330"),
        u("photo-1488161628813-04466f872be2"),
        u("photo-1607746882042-944635dfe10e"),
      ],
    },
    canvasTitle: "Vlog Selfie",
    description:
      "Turn a static selfie into a 9:16 vlog clip with subtle handheld motion, ambient room sound, and a soft cinematic look — ready to post.",
    steps: [
      {
        title: "Step 1",
        body: "I extend your selfie into a 6-second handheld vlog moment with natural movement.",
      },
      {
        title: "Step 2",
        body: "Pick a vibe (cozy / golden hour / minimal) and I'll color-grade and add ambient audio.",
      },
    ],
    workspaceHint: "Drop your selfie, type a vibe, submit.",
    featured: true,
  },
  {
    id: "make-up",
    scenarioId: "social-aesthetics",
    functionName: "Make Up",
    modality: "image",
    variantCount: 8,
    sample: {
      kind: "crossfade",
      images: [
        u("photo-1494790108377-be9c29b29330"),
        u("photo-1544005313-94ddf0286df2"),
        u("photo-1607746882042-944635dfe10e"),
      ],
    },
    canvasTitle: "Make Up",
    description:
      "Drop a portrait. I'll generate 8 makeup looks across moods — clean girl, glam, editorial, K-beauty — keeping your face structure intact.",
    steps: [
      {
        title: "Step 1",
        body: "I render 8 makeup directions on your portrait with consistent lighting.",
      },
      {
        title: "Step 2",
        body: "Pick favorites; I'll combine into a comparison sheet you can save or share.",
      },
    ],
    workspaceHint: "Drop a clear portrait facing camera, submit.",
  },
  {
    id: "transition",
    scenarioId: "social-aesthetics",
    functionName: "Transition",
    modality: "video",
    variantCount: 6,
    sample: {
      kind: "crossfade",
      images: [
        u("photo-1488161628813-04466f872be2"),
        u("photo-1535223289827-42f1e9919769"),
        u("photo-1494790108377-be9c29b29330"),
      ],
    },
    canvasTitle: "Outfit Transition",
    description:
      "Drop two photos. I'll stitch them with one of 6 viral transitions — spin, snap, glitch, mask wipe — synced to a beat drop.",
    steps: [
      {
        title: "Step 1",
        body: "I propose 6 transition styles synced to a 1-second beat drop.",
      },
      {
        title: "Step 2",
        body: "Pick one; I'll render the 4-second clip with audio baked in.",
      },
    ],
    workspaceHint: "Drop 2 photos in order, submit.",
  },
  {
    id: "dancing-preset",
    scenarioId: "media-trend",
    functionName: "Dancing Preset",
    modality: "video",
    variantCount: 12,
    sample: {
      kind: "crossfade",
      images: [
        u("photo-1535223289827-42f1e9919769"),
        u("photo-1488161628813-04466f872be2"),
        u("photo-1607746882042-944635dfe10e"),
      ],
    },
    canvasTitle: "Dancing Preset",
    description:
      "Drop a portrait or full-body photo. I'll animate it into a 6-second dance clip matched to a current trending sound.",
    steps: [
      {
        title: "Step 1",
        body: "I detect your subject and pick 3 trending dance moves that match the body shape.",
      },
      {
        title: "Step 2",
        body: "Pick one and I'll render the 6s clip with the trending audio attached.",
      },
    ],
    workspaceHint: "Drop a full-body or portrait photo, submit.",
    featured: true,
  },
  {
    id: "lipsync",
    scenarioId: "media-trend",
    functionName: "Lipsync",
    modality: "video",
    variantCount: 10,
    sample: {
      kind: "crossfade",
      images: [
        u("photo-1494790108377-be9c29b29330"),
        u("photo-1543258103-a62bdc069871"),
        u("photo-1607746882042-944635dfe10e"),
      ],
    },
    canvasTitle: "Lipsync",
    description:
      "Make any portrait sing. Drop a face + paste lyrics or pick from 50 trending audio clips, and I'll generate a synced lipsync video.",
    steps: [
      {
        title: "Step 1",
        body: "I lock onto your subject's mouth and pre-render 3 expression variants.",
      },
      {
        title: "Step 2",
        body: "Pick the audio and the expression; I'll render a clean 8s clip ready to post.",
      },
    ],
    workspaceHint: "Drop a portrait, paste lyrics or pick a clip, submit.",
  },
  {
    id: "social-trend",
    scenarioId: "media-trend",
    functionName: "Social Trend",
    modality: "video",
    variantCount: 7,
    sample: {
      kind: "crossfade",
      images: [
        luma("03d98f51394617d4427e17692a60c7eb5df900b4-750x422.png"),
        u("photo-1611605698335-8b1569810432"),
        u("photo-1488161628813-04466f872be2"),
      ],
    },
    canvasTitle: "Social Trend",
    description:
      "Pick a trending format (POV, day-in-life, transformation, get-ready-with-me). I'll templateize your inputs into the format and ship a clip.",
    steps: [
      {
        title: "Step 1",
        body: "I show 7 active trends and project your asset into each.",
      },
      {
        title: "Step 2",
        body: "Pick one; I'll render and caption the final clip.",
      },
    ],
    workspaceHint: "Drop your asset (photo, clip, or product), submit.",
  },
  {
    id: "character-create",
    scenarioId: "cinema-style",
    functionName: "Character Create",
    modality: "image",
    variantCount: 22,
    sample: {
      kind: "crossfade",
      images: [
        luma("97f67e5a2d71508ea393b791c2dce49693c30c3d-2688x1536.png"),
        luma("25fbac4414a3ec08b8cf55c4ff3cff13e878b4f8-750x422.png"),
        luma("728e390759fdc756b96ee3464e51909a82468ba4-750x422.png"),
      ],
    },
    canvasTitle: "Character Create",
    description:
      "Design original characters by exploring tons of visual options at once — silhouettes, costumes, expressions — without locking in too early.",
    steps: [
      {
        title: "Step 1",
        body: "Describe a vibe; I generate 8 silhouettes spanning very different directions.",
      },
      {
        title: "Step 2",
        body: "Pick a silhouette; I render full-body, expression sheet, and 3 hero angles.",
      },
    ],
    workspaceHint: 'Type a one-line vibe (e.g. "noir detective with a soft side"), submit.',
    featured: true,
  },
  {
    id: "scene-transition",
    scenarioId: "cinema-style",
    functionName: "Scene Transition",
    modality: "video",
    variantCount: 6,
    sample: {
      kind: "crossfade",
      images: [
        luma("728e390759fdc756b96ee3464e51909a82468ba4-750x422.png"),
        luma("6e8f2a45619239558ab91932747ede3cd70bd990-750x422.png"),
        luma("bcfc14f50736f6525fb6df72ff62550b5e6c2a16-750x422.png"),
      ],
    },
    canvasTitle: "Scene Transition",
    description:
      "Connect two shots with a cinematic transition: match-cut, whip-pan, light bridge, or speed-ramp. Editor-grade, no editor needed.",
    steps: [
      {
        title: "Step 1",
        body: "I analyze both shots and propose 4 transition treatments that respect continuity.",
      },
      {
        title: "Step 2",
        body: "Pick one; I render the 2-second bridge at 24fps cinematic.",
      },
    ],
    workspaceHint: "Drop two shots in order, submit.",
  },
];
