"use client";

import {
  Check,
  Laptop,
  Moon,
  Sun,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";

const themeOptions = [
  {
    value: "light",
    label: "Light",
    description:
      "Use the warm light appearance.",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    description:
      "Use the darker evening appearance.",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    description:
      "Follow your device appearance.",
    icon: Laptop,
  },
] as const;

export function ThemeSelector() {
  const {
    theme,
    setTheme,
  } = useTheme();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {themeOptions.map(
        (option) => {
          const Icon =
            option.icon;

          const isSelected =
            theme === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                setTheme(
                  option.value
                )
              }
              className={cn(
                "relative rounded-[24px] border p-5 text-left transition duration-300",
                isSelected
                  ? "border-[#D5451B] bg-[#FF9B45]/20 shadow-md"
                  : "border-white/60 bg-white/35 hover:-translate-y-1 hover:bg-white/55"
              )}
            >
              {isSelected && (
                <span className="primary-gradient absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-white">
                  <Check
                    size={15}
                  />
                </span>
              )}

              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl",
                  isSelected
                    ? "primary-gradient text-white"
                    : "bg-white/50 text-[#D5451B]"
                )}
              >
                <Icon size={22} />
              </div>

              <h4 className="mt-4 font-bold">
                {option.label}
              </h4>

              <p className="mt-2 text-sm leading-6 text-[#85675E]">
                {
                  option.description
                }
              </p>
            </button>
          );
        }
      )}
    </div>
  );
}