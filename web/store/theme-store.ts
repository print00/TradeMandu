"use client";

import { create } from "zustand";
import { storage } from "@/lib/storage";

type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
  hydrateTheme: () => void;
  toggleTheme: () => void;
};

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
  storage.setTheme(theme);
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "light",
  hydrateTheme: () => {
    const savedTheme = (storage.getTheme() as Theme | null) ?? "light";
    applyTheme(savedTheme);
    set({ theme: savedTheme });
  },
  toggleTheme: () => {
    const nextTheme = get().theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    set({ theme: nextTheme });
  }
}));

