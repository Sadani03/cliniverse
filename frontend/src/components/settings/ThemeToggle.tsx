"use client";

import {
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const {
    resolvedTheme,
    setTheme,
  } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() =>
        setTheme(isDark ? "light" : "dark")
      }
      className="glass-panel flex h-12 w-12 items-center justify-center rounded-2xl transition hover:scale-105"
      aria-label={
        isDark
          ? "Switch to light theme"
          : "Switch to dark theme"
      }
      title={
        isDark
          ? "Switch to light theme"
          : "Switch to dark theme"
      }
    >
      {isDark ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
}