"use client";

import {
  Bot,
  House,
  LogOut,
  Settings,
  Stethoscope,
  UserRound,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navigationItems = [
  {
    label: "Dashboard",
    icon: House,
  },
  {
    label: "AI Chat",
    icon: Bot,
  },
  {
    label: "Symptom Checker",
    icon: Stethoscope,
  },
  {
    label: "Profile",
    icon: UserRound,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

type SidebarProps = {
  activeItem: string;
  onItemChange: (item: string) => void;
  onLogout: () => void;
};

export function Sidebar({
  activeItem,
  onItemChange,
  onLogout,
}: SidebarProps) {
  return (
    <aside className="glass-panel-strong flex min-h-[calc(100vh-32px)] w-[260px] flex-col rounded-[30px] p-5">
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 py-4">
        <div className="primary-gradient flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-lg">
          +
        </div>

        <div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{
              fontFamily:
                "var(--font-plus-jakarta), sans-serif",
            }}
          >
            Clini
            <span className="text-gradient">
              Verse
            </span>
          </h1>

          <p className="text-xs text-[#85675E]">
            AI Healthcare Assistant
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex flex-1 flex-col gap-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeItem === item.label;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() =>
                onItemChange(item.label)
              }
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold transition-all duration-300",
                isActive
                  ? "bg-[#FF9B45]/20 text-[#D5451B] shadow-sm"
                  : "text-[#521C0D]/75 hover:bg-white/35 hover:text-[#D5451B] dark:text-white/80"
              )}
            >
              <Icon size={20} />

              <span>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Support Card */}
      <div className="glass-panel mb-4 rounded-2xl p-4">
        <p className="text-sm font-semibold">
          Your health, our priority
        </p>

        <p className="mt-2 text-xs leading-5 text-[#85675E]">
          Nova is ready to support your health
          and well-being.
        </p>
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={onLogout}
        className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold text-[#D5451B] transition-all duration-300 hover:bg-[#D5451B]/10"
      >
        <LogOut size={20} />

        <span>
          Logout
        </span>
      </button>
    </aside>
  );
}