"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { StockCard } from "@/components/stock-card";
import type { Stock } from "@/types";

export function MarketPageClient({
  stocks,
  gainers,
  losers,
  initialQuery = ""
}: {
  stocks: Stock[];
  gainers: Stock[];
  losers: Stock[];
  initialQuery?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

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

  useEffect(() => {
    const normalizedQuery = query.trim();
    const currentQuery = searchParams.get("q") ?? "";

    if (normalizedQuery === currentQuery) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams.toString());

    if (normalizedQuery) {
      nextParams.set("q", normalizedQuery);
    } else {
      nextParams.delete("q");
    }

    const nextUrl = nextParams.toString() ? `/market?${nextParams.toString()}` : "/market";
    router.replace(nextUrl, { scroll: false });
  }, [query, router, searchParams]);

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="hero-band" />
        <h1 className="page-title">Read the whole market at a glance.</h1>
        <p className="page-subtitle">
          Search the NEPSE list, review movers, and drill into any symbol without changing the backend.
        </p>
        <input
          className="mt-5 w-full rounded-panel border border-line bg-bg/75 px-4 py-3 text-sm outline-none placeholder:text-textMuted"
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
