"use client";

import {
  MoonStar,
  Settings,
} from "lucide-react";

import { GlassCard } from "@/components/shared/GlassCard";
import { ThemeSelector } from "@/components/settings/ThemeSelector";

export function SettingsPage() {
  return (
    <div className="mt-8">
      <GlassCard strong className="p-5 sm:p-7">
        <header className="flex items-start gap-4 border-b border-white/55 pb-6">
          <div className="primary-gradient flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg">
            <Settings size={25} />
          </div>

          <div>
            <h2
              className="text-2xl font-bold sm:text-3xl"
              style={{
                fontFamily:
                  "var(--font-plus-jakarta), sans-serif",
              }}
            >
              Settings
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#85675E]">
              Control the appearance of your CliniVerse
              experience.
            </p>
          </div>
        </header>

        <section className="mt-6 rounded-[26px] border border-white/70 bg-white/30 p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FF9B45]/20 text-[#D5451B]">
              <MoonStar size={21} />
            </div>

            <div>
              <h3 className="text-lg font-bold">
                Appearance
              </h3>

              <p className="mt-1 text-sm leading-6 text-[#85675E]">
                Select light mode, dark mode, or follow your
                device settings.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <ThemeSelector />
          </div>
        </section>
      </GlassCard>
    </div>
  );
}