"use client";
import { navGroup1, navGroup2 } from "@/data/nav";
import { UserMenu } from "./UserMenu";
import { SearchBox } from "./SearchBox";
import { NavItem } from "./NavItem";
import { AccountSwitcher } from "./AccountSwitcher";
import { UpgradeButton } from "./UpgradeButton";

export function Sidebar() {
  return (
    <aside className="flex h-screen w-[232px] shrink-0 flex-col gap-1 border-r border-border bg-surface px-2.5 py-3">
      <UserMenu />
      <SearchBox />
      <nav className="mt-1 flex flex-col gap-0.5">
        {navGroup1.map((item) => (
          <NavItem key={item.label} icon={item.icon} label={item.label} />
        ))}
      </nav>

      <div className="mt-3">
        <AccountSwitcher />
      </div>

      <nav className="flex flex-col gap-0.5">
        {navGroup2.map((item) => (
          <NavItem key={item.label} icon={item.icon} label={item.label} active={item.active} />
        ))}
      </nav>

      <div className="mt-auto">
        <UpgradeButton />
      </div>
    </aside>
  );
}
