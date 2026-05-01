// data/scenarios.ts
export type ScenarioId =
  | "e-commerce"
  | "social-aesthetics"
  | "media-trend"
  | "cinema-style";

export type Scenario = {
  id: ScenarioId;
  label: string;
  cardAspect: "9:16" | "1:1";
  presetIds: string[];
};

export const scenarios: Scenario[] = [
  {
    id: "e-commerce",
    label: "E-commerce",
    cardAspect: "1:1",
    presetIds: [
      "marketing-video",
      "product-variants",
      "app-promotion",
      "premium-hero-shot",
    ],
  },
  {
    id: "social-aesthetics",
    label: "Social aesthetics",
    cardAspect: "9:16",
    presetIds: ["vlog-selfie", "make-up", "transition"],
  },
  {
    id: "media-trend",
    label: "Media trend",
    cardAspect: "9:16",
    presetIds: ["dancing-preset", "lipsync", "social-trend"],
  },
  {
    id: "cinema-style",
    label: "Cinema style",
    cardAspect: "1:1",
    presetIds: ["character-create", "scene-transition"],
  },
];
