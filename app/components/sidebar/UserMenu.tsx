import { ChevronDown } from "lucide-react";

export function UserMenu({ name = "welly Luo" }: { name?: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-2.5 rounded-nav px-2 py-2 text-text hover:bg-surface-hover"
    >
      <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-orange-400 to-orange-600 text-[11px] font-bold text-white">
        {name.charAt(0).toUpperCase()}
      </span>
      <span className="text-[13px] font-medium">{name}</span>
      <ChevronDown className="ml-auto h-3.5 w-3.5 text-text-dim" />
    </button>
  );
}
