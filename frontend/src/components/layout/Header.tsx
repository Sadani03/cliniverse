"use client";

import {
  Bell,
  ChevronDown,
  Menu,
  Search,
} from "lucide-react";

import { ThemeToggle } from "@/components/settings/ThemeToggle";

type HeaderProps = {
  onOpenMobileMenu: () => void;
    userName: string;
};

export function Header({
  onOpenMobileMenu,
  userName,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="glass-panel flex h-11 w-11 items-center justify-center rounded-2xl lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>

        <div>
          <h2
            className="text-2xl font-bold tracking-tight sm:text-3xl"
            style={{
              fontFamily:
                "var(--font-plus-jakarta), sans-serif",
            }}
          >
            Healthy Day, {userName.split(" ")[0]} !👋
          </h2>

          <p className="mt-1 text-sm text-[#85675E]">
            Your health, our priority.
          </p>
        </div>
      </div>

      <div className="hidden items-center gap-4 md:flex">
        <div className="glass-panel flex h-12 w-[280px] items-center gap-3 rounded-2xl px-4">
          <Search size={19} className="text-[#85675E]" />

          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#85675E]/70"
          />
        </div>

        <ThemeToggle />

        <button
          type="button"
          className="glass-panel relative flex h-12 w-12 items-center justify-center rounded-2xl"
          aria-label="Notifications"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-[#F4E7E1] bg-[#D5451B]" />
        </button>

        <button
          type="button"
          className="flex items-center gap-3 rounded-2xl px-2 py-1.5 transition hover:bg-white/25"
        >
          <div className="primary-gradient flex h-11 w-11 items-center justify-center rounded-full font-bold text-white">
            SS
          </div>

          <div className="text-left">
            <p className="text-sm font-semibold">{userName}</p>
            <p className="text-xs text-[#85675E]">Patient</p>
          </div>

          <ChevronDown size={18} />
        </button>
      </div>
    </header>
  );
}