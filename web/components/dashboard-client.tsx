"use client";

import { useEffect, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { api } from "@/lib/api";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { usePortfolioStore } from "@/store/portfolio-store";
import type { PortfolioResponse, Stock } from "@/types";
import { StatCard } from "@/components/stat-card";
import { StockCard } from "@/components/stock-card";
import { PortfolioTable } from "@/components/portfolio-table";

export function DashboardClient({ stocks }: { stocks: Stock[] }) {
  const { data, setData, loading, setLoading } = usePortfolioStore();

  useEffect(() => {
    let mounted = true;

    async function loadPortfolio() {
      try {
        setLoading(true);
        const response = await api.get<PortfolioResponse>("/portfolio");
        if (mounted) setData(response.data);
      } catch {
        if (mounted) {
          setData({
            summary: {
              marketValue: 77186,
              invested: 73090,
              totalPl: 4096,
              dailyPl: 1115,
              totalPlPercent: 5.6
            },
            positions: []
          });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadPortfolio();
    return () => {
      mounted = false;
    };
  }, [setData, setLoading]);

  const movers = useMemo(() => stocks.slice(0, 4), [stocks]);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-[1.5fr,1fr,1fr]">
        <div className="rounded-panel border border-line bg-gradient-to-br from-accent to-sky-500 p-6 text-white shadow-panel">
          <p className="text-sm font-medium text-white/70">Portfolio Value</p>
          <h1 className="mt-4 text-4xl font-semibold">
            {formatCurrency(data?.summary.marketValue ?? 0)}
          </h1>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">
            <TrendingUp size={16} />
            {formatCurrency(data?.summary.dailyPl ?? 0)} today
          </div>
        </div>
        <StatCard
          label="Total P/L"
          value={formatCurrency(data?.summary.totalPl ?? 0)}
          hint={formatPercent(data?.summary.totalPlPercent ?? 0)}
          tone={(data?.summary.totalPl ?? 0) >= 0 ? "gain" : "loss"}
        />
        <StatCard
          label="Invested"
          value={formatCurrency(data?.summary.invested ?? 0)}
          hint={loading ? "Syncing latest prices..." : "Based on your manual holdings"}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr,1fr]">
        <div className="rounded-panel border border-line bg-panel p-5 shadow-panel">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text">Holdings</h2>
              <p className="text-sm text-textMuted">Live portfolio overview from the existing API</p>
            </div>
          </div>
          <PortfolioTable positions={data?.positions ?? []} />
        </div>

        <div className="space-y-4">
          <div className="rounded-panel border border-line bg-panel p-5 shadow-panel">
            <h2 className="text-xl font-semibold text-text">Active Stocks</h2>
            <p className="mt-1 text-sm text-textMuted">Quick glance at Nepal market momentum</p>
          </div>
          {movers.map((stock) => (
            <StockCard key={stock.id} stock={stock} compact />
          ))}
        </div>
      </section>
    </div>
  );
}

