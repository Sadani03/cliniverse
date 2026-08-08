"use client";

import {
  Moon,
  Sun,
} from "lucide-react";

import { useTheme } from "@/providers/ThemeProvider";

export function ThemeToggle() {
  const {
    resolvedTheme,
    setTheme,
  } = useTheme();

  const isDark =
    resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() =>
        setTheme(
          isDark
            ? "light"
            : "dark"
        )
      }
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="glass-panel flex h-13 w-13 items-center justify-center rounded-2xl text-[#521C0D] transition hover:scale-[1.03]"
    >
      {isDark ? (
        <Sun size={21} />
      ) : (
        <Moon size={21} />
      )}
    </button>
  );
}