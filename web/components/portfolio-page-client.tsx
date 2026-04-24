"use client";

import { useEffect } from "react";
import { api } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { usePortfolioStore } from "@/store/portfolio-store";
import type { PortfolioResponse } from "@/types";
import { PortfolioTable } from "@/components/portfolio-table";
import { StatCard } from "@/components/stat-card";

export function PortfolioPageClient() {
  const { data, setData, loading, setLoading } = usePortfolioStore();

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const response = await api.get<PortfolioResponse>("/portfolio");
        if (mounted) setData(response.data);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [setData, setLoading]);

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="hero-band" />
        <h1 className="page-title">Portfolio depth with cleaner attribution.</h1>
        <p className="page-subtitle">Holdings, current prices, and P/L by stock in a more readable command view.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Market Value" value={formatCurrency(data?.summary.marketValue ?? 0)} />
        <StatCard
          label="Daily P/L"
          value={formatCurrency(data?.summary.dailyPl ?? 0)}
          tone={(data?.summary.dailyPl ?? 0) >= 0 ? "gain" : "loss"}
        />
        <StatCard
          label="Total P/L"
          value={formatCurrency(data?.summary.totalPl ?? 0)}
          tone={(data?.summary.totalPl ?? 0) >= 0 ? "gain" : "loss"}
          hint={loading ? "Refreshing latest data..." : undefined}
        />
      </div>

      <div className="surface p-5">
        <PortfolioTable positions={data?.positions ?? []} />
      </div>
    </div>
  );
}
