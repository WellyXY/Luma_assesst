import {
  FileClock,
  Users,
  Bell,
  FolderClosed,
  Lightbulb,
  User,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { icon: LucideIcon; label: string; active?: boolean };

export const navGroup1: NavItem[] = [
  { icon: FileClock, label: "Recents" },
  { icon: Users, label: "Shared With You" },
  { icon: Bell, label: "Notifications" },
];

export const navGroup2: NavItem[] = [
  { icon: FolderClosed, label: "Boards" },
  { icon: Lightbulb, label: "Discover", active: true },
  { icon: User, label: "Team" },
  { icon: BarChart3, label: "Usage" },
];
