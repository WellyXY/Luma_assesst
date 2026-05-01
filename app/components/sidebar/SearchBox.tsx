import { Search } from "lucide-react";

export function SearchBox() {
  return (
    <div className="flex h-8 items-center gap-2 rounded-nav border border-border px-2.5 text-text-dim">
      <Search className="h-3.5 w-3.5" />
      <span className="flex-1 text-[12px]">Search</span>
      <kbd className="rounded bg-surface-active px-1.5 py-0.5 text-[10px] text-text-muted">⌘K</kbd>
    </div>
  );
}
