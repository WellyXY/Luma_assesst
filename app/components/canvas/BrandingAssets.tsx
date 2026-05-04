// app/components/canvas/BrandingAssets.tsx
"use client";
import Image from "next/image";
import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { Plus, Upload, X } from "lucide-react";
import { CanvasBlock } from "./CanvasBlock";

type ImageAsset = { id: string; label: string; src: string };

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=70`;
const luma = (file: string) =>
  `https://cdn.sanity.io/images/2ylxvaa2/production/${file}?w=400&q=70&fit=crop&auto=format`;

type GuideExample =
  | { kind: "image"; label: string; hint: string; src: string }
  | { kind: "logo"; label: string; hint: string; mark: string }
  | { kind: "palette"; label: string; hint: string; colors: string[] };

const GUIDE_EXAMPLES: GuideExample[] = [
  {
    kind: "logo",
    label: "Logo",
    hint: "Wordmark or icon, transparent if possible",
    mark: "AURA",
  },
  {
    kind: "image",
    label: "Hero product",
    hint: "Clean shot of the product on a plain backdrop",
    src: luma("c27b66480a1d1d45cee122082b87878e929e695b-750x422.png"),
  },
  {
    kind: "image",
    label: "Lifestyle",
    hint: "Person interacting with the product in context",
    src: u("photo-1488161628813-04466f872be2"),
  },
  {
    kind: "palette",
    label: "Color palette",
    hint: "3–5 swatches for primary and accent colors",
    colors: ["#0a0a0a", "#d9f99d", "#fef3c7", "#fb923c"],
  },
];

function GuideTile({ example }: { example: GuideExample }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative aspect-square overflow-hidden rounded-card border border-border/60 bg-surface-2">
        {example.kind === "image" ? (
          <Image
            src={example.src}
            alt={example.label}
            fill
            sizes="120px"
            className="object-cover"
          />
        ) : example.kind === "logo" ? (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
            <span className="text-[15px] font-bold tracking-[0.18em] text-text">
              {example.mark}
            </span>
          </div>
        ) : (
          <div className="grid h-full w-full grid-cols-2 grid-rows-2">
            {example.colors.map((c, i) => (
              <div key={i} style={{ backgroundColor: c }} />
            ))}
          </div>
        )}
      </div>
      <span className="text-[11px] font-medium text-text">
        {example.label}
      </span>
      <span className="text-[10px] leading-snug text-text-dim">
        {example.hint}
      </span>
    </div>
  );
}

function AssetTile({
  asset,
  onRemove,
}: {
  asset: ImageAsset;
  onRemove: () => void;
}) {
  return (
    <div className="group/asset flex flex-col gap-1.5">
      <div className="relative aspect-square overflow-hidden rounded-card bg-surface-2">
        <Image
          src={asset.src}
          alt={asset.label}
          fill
          sizes="180px"
          className="object-cover"
          unoptimized={asset.src.startsWith("blob:")}
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          aria-label={`Remove ${asset.label}`}
          className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full border border-border bg-surface/90 text-text-dim opacity-0 transition-opacity hover:text-text group-hover/asset:opacity-100"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
      <span className="truncate text-[11px] text-text-muted">{asset.label}</span>
    </div>
  );
}

export function BrandingAssets({ onDelete }: { onDelete: () => void }) {
  const [assets, setAssets] = useState<ImageAsset[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const incoming: ImageAsset[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f, i) => ({
        id: `upload-${Date.now()}-${i}`,
        label: f.name.replace(/\.[^.]+$/, "") || "Upload",
        src: URL.createObjectURL(f),
      }));
    if (incoming.length === 0) return;
    setAssets((prev) => [...prev, ...incoming]);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = "";
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => setDragOver(false);

  const removeAsset = (id: string) => {
    setAssets((prev) => {
      const target = prev.find((a) => a.id === id);
      if (target?.src.startsWith("blob:")) URL.revokeObjectURL(target.src);
      return prev.filter((a) => a.id !== id);
    });
  };

  const openPicker = () => inputRef.current?.click();

  return (
    <CanvasBlock onDelete={onDelete} className="px-4 py-4 -mx-4 -my-4">
      <div
        className="flex flex-col gap-5"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-[22px] font-bold leading-tight text-text">
              Brand kit
            </h2>
            <p className="text-[13px] leading-relaxed text-text-muted">
              Drop in your logos, products, and reference shots — I&apos;ll keep
              them consistent across every generation.
            </p>
          </div>
          {assets.length > 0 ? (
            <button
              type="button"
              onClick={openPicker}
              onMouseDown={(e) => e.stopPropagation()}
              className="flex shrink-0 items-center gap-1.5 rounded-pill bg-text px-3 py-1.5 text-[12px] font-semibold text-bg hover:opacity-90"
            >
              <Plus className="h-3.5 w-3.5" />
              Add more
            </button>
          ) : null}
        </div>

        {assets.length === 0 ? (
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={
              "flex flex-col gap-5 rounded-card border border-dashed p-5 transition-colors " +
              (dragOver
                ? "border-text bg-surface-hover"
                : "border-border bg-surface-2/40")
            }
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-text-dim">
                What to upload
              </span>
              <p className="text-[12px] leading-relaxed text-text-muted">
                Add 4–6 images that capture your brand&apos;s look and feel.
                The richer the kit, the more on-brand each generation.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {GUIDE_EXAMPLES.map((ex) => (
                <GuideTile key={ex.label} example={ex} />
              ))}
            </div>

            <div className="flex flex-col items-center gap-2 pt-1">
              <button
                type="button"
                onClick={openPicker}
                onMouseDown={(e) => e.stopPropagation()}
                className="flex items-center gap-2 rounded-pill bg-lime-300 px-5 py-2.5 text-[13px] font-semibold text-bg shadow-lg transition-opacity hover:opacity-90"
              >
                <Upload className="h-4 w-4" />
                Upload your brand kit
              </button>
              <span className="text-[11px] text-text-dim">
                or drop images anywhere in this box
              </span>
            </div>
          </div>
        ) : (
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={
              "rounded-card transition-colors " +
              (dragOver ? "ring-2 ring-text/60" : "")
            }
          >
            <div className="grid grid-cols-3 gap-3">
              {assets.map((a) => (
                <AssetTile
                  key={a.id}
                  asset={a}
                  onRemove={() => removeAsset(a.id)}
                />
              ))}
              <button
                type="button"
                onClick={openPicker}
                onMouseDown={(e) => e.stopPropagation()}
                className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-card border border-dashed border-border bg-surface-2/40 text-text-dim transition-colors hover:border-border-strong hover:text-text"
              >
                <Plus className="h-5 w-5" />
                <span className="text-[10px] font-medium uppercase tracking-wider">
                  Add
                </span>
              </button>
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onChange}
        />
      </div>
    </CanvasBlock>
  );
}
