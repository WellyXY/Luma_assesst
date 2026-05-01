export type FilterCategory =
  | "all"
  | "featured-uni-1"
  | "art-illustration"
  | "branding"
  | "character-identity"
  | "filmmaking"
  | "home-interior"
  | "image-editing"
  | "just-for-fun"
  | "marketing"
  | "people-characters"
  | "product-design"
  | "social-media"
  | "style-transfer";

export const filters: { key: FilterCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "featured-uni-1", label: "Featured: UNI-1" },
  { key: "art-illustration", label: "Art & Illustration" },
  { key: "branding", label: "Branding" },
  { key: "character-identity", label: "Character & Identity" },
  { key: "filmmaking", label: "Filmmaking" },
  { key: "home-interior", label: "Home & Interior Design" },
  { key: "image-editing", label: "Image Editing" },
  { key: "just-for-fun", label: "Just for fun" },
  { key: "marketing", label: "Marketing" },
  { key: "people-characters", label: "People & Characters" },
  { key: "product-design", label: "Product Design" },
  { key: "social-media", label: "Social Media" },
  { key: "style-transfer", label: "Style Transfer" },
];
