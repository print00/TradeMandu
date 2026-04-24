"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellRing, BriefcaseBusiness, ChartCandlestick, House, ScrollText, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Home", icon: House },
  { href: "/market", label: "Market", icon: ChartCandlestick },
  { href: "/portfolio", label: "Portfolio", icon: BriefcaseBusiness },
  { href: "/watchlist", label: "Watchlist", icon: Star },
  { href: "/ipo", label: "IPO", icon: ScrollText },
  { href: "/alerts", label: "Alerts", icon: BellRing }
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-20 grid grid-cols-6 border-t border-line/80 bg-panel/90 px-2 py-2 backdrop-blur xl:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 rounded-panel px-2 py-2 text-[11px] font-medium transition-colors",
              active ? "bg-accent text-white" : "text-textMuted"
            )}
          >
            <Icon size={16} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
