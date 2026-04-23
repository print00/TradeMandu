"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useThemeStore } from "@/store/theme-store";

export function Providers({ children }: { children: React.ReactNode }) {
  const hydrate = useAuthStore((state) => state.hydrate);
  const hydrateTheme = useThemeStore((state) => state.hydrateTheme);

  useEffect(() => {
    hydrate();
    hydrateTheme();
  }, [hydrate, hydrateTheme]);

  return children;
}

