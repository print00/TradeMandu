"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { useWatchlistStore } from "@/store/watchlist-store";
import type { Stock, WatchlistItem } from "@/types";

export function WatchlistPageClient({ stocks }: { stocks: Stock[] }) {
  const { items, setItems, loading, setLoading } = useWatchlistStore();
  const [selectedStockId, setSelectedStockId] = useState(stocks[0]?.id ?? "");

  useEffect(() => {
    let mounted = true;

    async function loadWatchlist() {
      try {
        setLoading(true);
        const response = await api.get<WatchlistItem[]>("/watchlist");
        if (mounted) setItems(response.data);
      } catch {
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadWatchlist();
    return () => {
      mounted = false;
    };
  }, [setItems, setLoading]);

  const availableStocks = useMemo(
    () => stocks.filter((stock) => !items.some((item) => item.stockId === stock.id)),
    [items, stocks]
  );

  async function addToWatchlist() {
    if (!selectedStockId) return;
    await api.post("/watchlist", { stockId: selectedStockId });
    const stock = stocks.find((item) => item.id === selectedStockId);
    if (!stock) return;
    setItems([
      ...items,
      {
        id: `${selectedStockId}-${Date.now()}`,
        stockId: selectedStockId,
        stock,
        createdAt: new Date().toISOString()
      }
    ]);
    setSelectedStockId(availableStocks[1]?.id ?? "");
  }

  async function removeFromWatchlist(stockId: string) {
    await api.delete(`/watchlist/${stockId}`);
    setItems(items.filter((item) => item.stockId !== stockId));
  }

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="hero-band" />
        <h1 className="page-title">Build a faster watchlist.</h1>
        <p className="page-subtitle">Save stocks, sync them to the backend, and revisit high-interest names quickly.</p>
        <div className="mt-5 flex flex-col gap-3 md:flex-row">
          <select
            className="min-w-0 flex-1 rounded-panel border border-line bg-bg/75 px-4 py-3 text-sm outline-none"
            value={selectedStockId}
            onChange={(event) => setSelectedStockId(event.target.value)}
          >
            {availableStocks.map((stock) => (
              <option key={stock.id} value={stock.id}>
                {stock.symbol} • {stock.name}
              </option>
            ))}
          </select>
          <button className="accent-button" onClick={addToWatchlist} type="button">
            <Plus size={16} />
            Add stock
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {items.map((item) => {
          const positive = Number(item.stock.quote?.change ?? 0) >= 0;
          return (
            <div key={item.id} className="surface p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-text">{item.stock.symbol}</p>
                  <p className="mt-1 text-sm text-textMuted">{item.stock.name}</p>
                </div>
                <button
                  className="rounded-panel border border-line p-2 text-textMuted transition hover:bg-panelSoft hover:text-loss"
                  onClick={() => removeFromWatchlist(item.stockId)}
                  type="button"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="mt-5 flex items-end justify-between border-t border-line/70 pt-4">
                <div>
                  <p className="text-2xl font-semibold text-text">{formatCurrency(item.stock.quote?.ltp ?? 0)}</p>
                  <p className="mt-1 text-xs text-textMuted">{item.stock.sector}</p>
                </div>
                <div className={positive ? "text-gain" : "text-loss"}>
                  <p className="text-sm font-medium">{formatCurrency(item.stock.quote?.change ?? 0)}</p>
                  <p className="text-xs">{formatPercent(item.stock.quote?.changePercent ?? 0)}</p>
                </div>
              </div>
            </div>
          );
        })}

        {!items.length && !loading ? (
          <div className="surface border-dashed p-10 text-sm text-textMuted">
            Your watchlist is empty. Add a stock above to start tracking it.
          </div>
        ) : null}
      </div>
    </div>
  );
}
