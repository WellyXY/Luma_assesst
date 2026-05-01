import { ChevronDown } from "lucide-react";

export function AccountSwitcher({ email = "welly.xy@gmail.com" }: { email?: string }) {
  const truncated = email.length > 18 ? `${email.slice(0, 18)}...` : email;
  return (
    <button
      type="button"
      className="flex w-full items-center gap-2.5 rounded-nav px-2.5 py-2 hover:bg-surface-hover"
    >
      <span className="grid h-5 w-5 place-items-center rounded bg-gradient-to-br from-orange-400 to-orange-600 text-[10px] font-bold text-white">
        {email.charAt(0).toUpperCase()}
      </span>
      <span className="text-[12px] text-text-muted">{truncated}</span>
      <ChevronDown className="ml-auto h-3 w-3 text-text-dim" />
    </button>
  );
}
