"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellRing,
  BriefcaseBusiness,
  ChartCandlestick,
  House,
  LayoutGrid,
  ScrollText,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: House },
  { href: "/market", label: "Market", icon: ChartCandlestick },
  { href: "/portfolio", label: "Portfolio", icon: BriefcaseBusiness },
  { href: "/watchlist", label: "Watchlist", icon: Star },
  { href: "/ipo", label: "IPO", icon: ScrollText },
  { href: "/alerts", label: "Alerts", icon: BellRing }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-line/80 bg-panel/75 px-5 py-6 backdrop-blur xl:block">
      <div className="cinematic-surface p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-panel bg-text text-bg shadow-panel">
            <LayoutGrid size={18} />
          </div>
          <div>
            <p className="eyebrow">TradeMandu</p>
            <p className="mt-1 text-lg font-semibold text-text">Market Command</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-textMuted">
          Nepal market intelligence, portfolio tracking, and IPO monitoring in one live workspace.
        </p>
      </div>

      <div className="ticker-wrap mt-5 rounded-panel">
        <div className="ticker-track">
          {["NEPSE", "HYDRO", "BANKING", "FINANCE", "INSURANCE", "MICRO"].map((item, index) => (
            <span key={`${item}-${index}`} className="ticker-item">
              <span className="ticker-symbol">{item}</span>
              <span>{index % 2 === 0 ? "+1.8%" : "-0.6%"}</span>
            </span>
          ))}
          {["NEPSE", "HYDRO", "BANKING", "FINANCE", "INSURANCE", "MICRO"].map((item, index) => (
            <span key={`${item}-repeat-${index}`} className="ticker-item">
              <span className="ticker-symbol">{item}</span>
              <span>{index % 2 === 0 ? "+1.8%" : "-0.6%"}</span>
            </span>
          ))}
        </div>
      </div>

      <nav className="mt-6 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between rounded-panel border px-4 py-3 text-sm font-medium transition-all duration-200",
                active
                  ? "border-accent/25 bg-accent text-white shadow-glow"
                  : "border-transparent bg-transparent text-textMuted hover:border-line/80 hover:bg-panel/90 hover:text-text"
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-panel transition-colors",
                    active ? "bg-white/16 text-white" : "bg-panelSoft text-text"
                  )}
                >
                  <Icon size={17} />
                </span>
                {item.label}
              </span>
              <span className={cn("text-xs", active ? "text-white/75" : "text-textMuted")}>0{items.indexOf(item) + 1}</span>
            </Link>
          );
        })}
      </nav>

      <div className="surface-muted mt-6 p-4">
        <p className="metric-label">Mode</p>
        <p className="mt-2 text-sm font-medium text-text">Paper trading live</p>
        <p className="mt-2 text-xs leading-5 text-textMuted">
          Use this workspace to explore flows, validate alerts, and pressure-test portfolio views.
        </p>
      </div>
    </aside>
  );
}
