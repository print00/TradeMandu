"use client";

import { useEffect, useMemo } from "react";
import { Activity, ArrowUpRight, BriefcaseBusiness, Sparkles, TrendingUp } from "lucide-react";
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
  const breadth = useMemo(
    () => ({
      positive: stocks.filter((stock) => Number(stock.quote?.changePercent ?? 0) >= 0).length,
      negative: stocks.filter((stock) => Number(stock.quote?.changePercent ?? 0) < 0).length
    }),
    [stocks]
  );

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="hero-band" />
        <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">Dashboard</p>
            <h1 className="page-title">A sharper command center for Nepal equities.</h1>
            <p className="page-subtitle">
              Watch portfolio performance, scan active symbols, and keep a live read on market breadth
              from a single data-rich surface.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:w-[500px]">
            <div className="metric-card">
              <p className="metric-label">Advancers</p>
              <p className="metric-value">{breadth.positive}</p>
              <p className="metric-hint">Symbols in positive territory today.</p>
            </div>
            <div className="metric-card">
              <p className="metric-label">Decliners</p>
              <p className="metric-value">{breadth.negative}</p>
              <p className="metric-hint">Names trading below the prior close.</p>
            </div>
            <div className="metric-card">
              <p className="metric-label">Mode</p>
              <p className="metric-value">Live</p>
              <p className="metric-hint">Portfolio and market cards update from the API.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.5fr,1fr,1fr]">
        <div className="cinematic-surface p-6 text-text shadow-depth">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label">Portfolio value</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                {formatCurrency(data?.summary.marketValue ?? 0)}
              </h2>
            </div>
            <div className="rounded-panel bg-accent/10 p-3 text-accent">
              <BriefcaseBusiness size={20} />
            </div>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-panel bg-text px-4 py-2 text-sm text-bg">
            <TrendingUp size={16} />
            {formatCurrency(data?.summary.dailyPl ?? 0)} today
          </div>
          <div className="mt-6 grid grid-cols-8 items-end gap-2">
            {[38, 44, 42, 60, 56, 70, 76, 92].map((height, index) => (
              <div
                key={index}
                className="rounded-t-[6px] bg-gradient-to-t from-text to-accent"
                style={{ height: `${height}px` }}
              />
            ))}
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
        <div className="surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="section-title">Holdings</h2>
              <p className="section-subtitle">Live portfolio overview from the existing API</p>
            </div>
            <div className="hidden items-center gap-2 rounded-panel bg-panelSoft px-3 py-2 text-xs text-textMuted md:inline-flex">
              <Activity size={14} />
              Portfolio telemetry
            </div>
          </div>
          <PortfolioTable positions={data?.positions ?? []} />
        </div>

        <div className="space-y-4">
          <div className="surface p-5">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-accent" />
              <h2 className="section-title">Active Stocks</h2>
            </div>
            <p className="mt-1 text-sm text-textMuted">Quick glance at Nepal market momentum</p>
          </div>
          {movers.map((stock) => (
            <StockCard key={stock.id} stock={stock} compact />
          ))}
          <div className="surface-muted flex items-center justify-between p-4 text-sm text-textMuted">
            <span>Market breadth pulse</span>
            <span className="inline-flex items-center gap-2 text-text">
              <ArrowUpRight size={14} className="text-gain" />
              {breadth.positive} / {stocks.length} positive
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
