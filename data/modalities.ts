import { Image as ImageIcon, Play, Music, Layers, type LucideIcon } from "lucide-react";

export type Modality = "image" | "video" | "audio" | "multi";

export const modalities: { key: "all" | Modality; label: string; icon?: LucideIcon }[] = [
  { key: "all", label: "All" },
  { key: "image", label: "Image", icon: ImageIcon },
  { key: "video", label: "Video", icon: Play },
  { key: "audio", label: "Audio", icon: Music },
  { key: "multi", label: "Multi-modal", icon: Layers },
];

export const modalityIcon: Record<Modality, LucideIcon> = {
  image: ImageIcon,
  video: Play,
  audio: Music,
  multi: Layers,
};

export const modalityLabel: Record<Modality, string> = {
  image: "Image",
  video: "Video",
  audio: "Audio",
  multi: "Multi-modal",
};
