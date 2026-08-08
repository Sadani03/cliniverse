"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
};

const ThemeContext =
  createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "cliniverse-theme";

function getSystemTheme():
  | "light"
  | "dark" {
  if (
    typeof window !== "undefined" &&
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
  ) {
    return "dark";
  }

  return "light";
}

function loadTheme(): Theme {
  if (typeof window === "undefined") {
    return "system";
  }

  const saved =
    window.localStorage.getItem(
      STORAGE_KEY
    );

  if (
    saved === "light" ||
    saved === "dark" ||
    saved === "system"
  ) {
    return saved;
  }

  return "system";
}

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [theme, setThemeState] =
    useState<Theme>(loadTheme);

  const [
    systemTheme,
    setSystemTheme,
  ] = useState<"light" | "dark">(
    getSystemTheme
  );

  const resolvedTheme =
    theme === "system"
      ? systemTheme
      : theme;

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

    function handleChange() {
      setSystemTheme(
        mediaQuery.matches
          ? "dark"
          : "light"
      );
    }

    mediaQuery.addEventListener(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);

  useEffect(() => {
    const root =
      document.documentElement;

    root.classList.remove(
      "light",
      "dark"
    );

    root.classList.add(
      resolvedTheme
    );

    root.style.colorScheme =
      resolvedTheme;

    window.localStorage.setItem(
      STORAGE_KEY,
      theme
    );
  }, [theme, resolvedTheme]);

  function setTheme(
    nextTheme: Theme
  ) {
    setThemeState(nextTheme);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}