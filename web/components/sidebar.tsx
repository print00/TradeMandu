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
    <aside className="hidden w-72 shrink-0 border-r border-line bg-panel px-5 py-6 lg:block">
      <div className="flex items-center gap-3 px-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white">
          <LayoutGrid size={20} />
        </div>
        <div>
          <p className="text-lg font-semibold text-text">TradeMandu</p>
          <p className="text-sm text-textMuted">Nepal investing dashboard</p>
        </div>
      </div>

      <nav className="mt-10 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                active
                  ? "bg-accent text-white"
                  : "text-textMuted hover:bg-panelSoft hover:text-text"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

