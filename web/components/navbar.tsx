"use client";

import { MoonStar, Search, SunMedium } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useThemeStore } from "@/store/theme-store";

export function Navbar() {
  const router = useRouter();
  const { user, clearSession } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-line bg-bg/80 px-4 py-4 backdrop-blur md:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-line bg-panel px-4 py-3 shadow-panel">
        <Search size={18} className="text-textMuted" />
        <input
          className="w-full bg-transparent text-sm text-text outline-none placeholder:text-textMuted"
          placeholder="Search stocks, sectors, or symbols"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          className="rounded-2xl border border-line bg-panel p-3 text-text transition hover:bg-panelSoft"
          onClick={toggleTheme}
          type="button"
        >
          {theme === "light" ? <MoonStar size={18} /> : <SunMedium size={18} />}
        </button>
        <div className="hidden rounded-2xl border border-line bg-panel px-4 py-3 md:block">
          <p className="text-sm font-medium text-text">{user?.name ?? user?.email ?? "Investor"}</p>
          <p className="text-xs text-textMuted">Paper trading enabled</p>
        </div>
        <button
          className="rounded-2xl bg-text px-4 py-3 text-sm font-medium text-bg"
          onClick={() => {
            clearSession();
            router.replace("/login");
          }}
          type="button"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

