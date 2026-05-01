// app/components/discover/PresetSample.tsx
import Image from "next/image";
import type { PresetSample as PresetSampleData } from "@/data/presets";

export function PresetSample({
  sample,
  alt,
  sizes,
}: {
  sample: PresetSampleData;
  alt: string;
  sizes: string;
}) {
  if (sample.kind === "video") {
    return (
      <video
        src={sample.src}
        poster={sample.poster}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  const src = sample.images[0];
  if (!src) return null;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
