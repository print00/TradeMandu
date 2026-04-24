"use client";

import { FormEvent, useEffect, useState } from "react";
import { Bell, MoonStar, Search, Sparkles, SunMedium } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useThemeStore } from "@/store/theme-store";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, clearSession } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (pathname === "/market") {
      setQuery(searchParams.get("q") ?? "");
      return;
    }

    setQuery("");
  }, [pathname, searchParams]);

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      router.push("/market");
      return;
    }

    router.push(`/market?q=${encodeURIComponent(normalizedQuery)}`);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-bg/70 px-4 py-4 backdrop-blur md:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <form
          className="flex min-w-0 flex-1 items-center gap-3 rounded-panel border border-line/80 bg-panel/85 px-4 py-3 shadow-panel"
          onSubmit={handleSearchSubmit}
        >
          <Search size={18} className="text-textMuted" />
          <input
            className="w-full bg-transparent text-sm text-text outline-none placeholder:text-textMuted"
            placeholder="Search stocks, sectors, or symbols"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-panel border border-line/80 bg-panel/85 px-3 py-2 text-sm text-textMuted md:inline-flex">
            <Sparkles size={16} className="text-accent" />
            Market pulse live
          </div>
          <button
            className="rounded-panel border border-line bg-panel p-3 text-text transition hover:bg-panelSoft"
            type="button"
          >
            <Bell size={18} />
          </button>
          <button
            className="rounded-panel border border-line bg-panel p-3 text-text transition hover:bg-panelSoft"
            onClick={toggleTheme}
            type="button"
          >
            {theme === "light" ? <MoonStar size={18} /> : <SunMedium size={18} />}
          </button>
          <div className="hidden rounded-panel border border-line bg-panel px-4 py-3 md:block">
            <p className="text-sm font-medium text-text">{user?.name ?? user?.email ?? "Investor"}</p>
            <p className="text-xs text-textMuted">Paper trading enabled</p>
          </div>
          <button
            className="primary-button"
            onClick={() => {
              clearSession();
              router.replace("/login");
            }}
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
