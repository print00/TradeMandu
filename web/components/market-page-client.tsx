"use client";

import { useMemo, useState } from "react";
import { StockCard } from "@/components/stock-card";
import type { Stock } from "@/types";

export function MarketPageClient({
  stocks,
  gainers,
  losers
}: {
  stocks: Stock[];
  gainers: Stock[];
  losers: Stock[];
}) {
  const [query, setQuery] = useState("");

  const filteredStocks = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) return stocks;

    return stocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(normalizedQuery) ||
        stock.name.toLowerCase().includes(normalizedQuery) ||
        stock.sector.toLowerCase().includes(normalizedQuery)
    );
  }, [query, stocks]);

  return (
    <div className="space-y-6">
      <div className="rounded-panel border border-line bg-panel p-6 shadow-panel">
        <h1 className="text-3xl font-semibold text-text">Market</h1>
        <p className="mt-2 text-sm text-textMuted">
          Search the NEPSE list, review movers, and drill into any symbol without changing the backend.
        </p>
        <input
          className="mt-5 w-full rounded-2xl border border-line bg-bg px-4 py-3 text-sm outline-none placeholder:text-textMuted"
          placeholder="Search by stock name, symbol, or sector"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <section className="grid gap-6 xl:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold text-text">Top Gainers</h2>
          <div className="space-y-4">
            {gainers.map((stock) => (
              <StockCard key={stock.id} stock={stock} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-semibold text-text">Top Losers</h2>
          <div className="space-y-4">
            {losers.map((stock) => (
              <StockCard key={stock.id} stock={stock} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-text">All Stocks</h2>
        <div className="grid gap-4 xl:grid-cols-2">
          {filteredStocks.map((stock) => (
            <StockCard key={stock.id} stock={stock} />
          ))}
        </div>
      </section>
    </div>
  );
}

