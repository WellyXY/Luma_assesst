// app/components/discover/HeroCollage.tsx
import Image from "next/image";

const luma = (file: string) =>
  `https://cdn.sanity.io/images/2ylxvaa2/production/${file}?w=600&q=80&fit=crop&auto=format`;
const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

const tiles = [
  {
    src: luma("c27b66480a1d1d45cee122082b87878e929e695b-750x422.png"),
    alt: "Marketing product visual",
  },
  {
    src: u("photo-1494790108377-be9c29b29330"),
    alt: "Portrait sample",
  },
  {
    src: luma("97f67e5a2d71508ea393b791c2dce49693c30c3d-2688x1536.png"),
    alt: "Character create sample",
  },
  {
    src: u("photo-1535223289827-42f1e9919769"),
    alt: "Full body subject",
  },
];

export function HeroCollage() {
  return (
    <div className="grid h-full grid-cols-4 gap-2">
      {tiles.map((tile) => (
        <div
          key={tile.src}
          className="relative overflow-hidden rounded-[14px] bg-surface"
        >
          <Image
            src={tile.src}
            alt={tile.alt}
            fill
            sizes="(max-width: 1024px) 25vw, 200px"
            className="object-cover"
            priority
          />
        </div>
      ))}
    </div>
  );
}
