import type { FilterCategory } from "@/data/filters";

const palettes: Record<FilterCategory, [string, string, string]> = {
  all: ["#27313f", "#3a4a63", "#5d7aa6"],
  "featured-uni-1": ["#3d2a4a", "#6a3f7a", "#a06bb8"],
  "art-illustration": ["#3a2540", "#7a3f5e", "#c47a8a"],
  branding: ["#2c2118", "#5e3a1f", "#a86b32"],
  "character-identity": ["#1f2a3c", "#3b5b8a", "#6f9bcf"],
  filmmaking: ["#1a1c22", "#2d2f38", "#4a4d5a"],
  "home-interior": ["#2a2820", "#56503e", "#8c8166"],
  "image-editing": ["#1d2c2a", "#3e6260", "#7da9a5"],
  "just-for-fun": ["#3d2c1a", "#a8662a", "#f0a040"],
  marketing: ["#2a1f3c", "#553e8a", "#8867d4"],
  "people-characters": ["#3a221d", "#7a3a30", "#c4685a"],
  "product-design": ["#2c2c2c", "#525252", "#9a9a9a"],
  "social-media": ["#1f3338", "#3f6e7a", "#6dadbb"],
  "style-transfer": ["#34203b", "#6a3a78", "#a866c0"],
};

export function VariantPlaceholder({
  category,
  seed,
}: {
  category: FilterCategory;
  seed: number;
}) {
  const [bg, mid, fg] = palettes[category];
  const id = `${category}-${seed}`;
  const variants = [
    <circle key="c" cx="32" cy="32" r="22" fill={`url(#g-${id})`} opacity="0.85" />,
    <g key="b">
      <rect x="10" y="14" width="44" height="8" rx="4" fill={fg} opacity="0.5" />
      <rect x="10" y="28" width="36" height="8" rx="4" fill={fg} opacity="0.4" />
      <rect x="10" y="42" width="28" height="8" rx="4" fill={fg} opacity="0.3" />
    </g>,
    <g key="d">
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3, 4].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={10 + col * 11}
            cy={10 + row * 11}
            r={(row + col) % 3 === 0 ? 3 : 1.6}
            fill={fg}
            opacity={0.25 + ((row * col) % 5) * 0.1}
          />
        )),
      )}
    </g>,
  ];
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={mid} />
          <stop offset="100%" stopColor={fg} />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill={bg} />
      {variants[seed % variants.length]}
    </svg>
  );
}
