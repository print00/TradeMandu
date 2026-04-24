"use client";

import { useMemo, useState } from "react";
import { api } from "@/lib/api";
import { formatCompactNumber, formatCurrency, formatDate, formatPercent } from "@/lib/utils";
import type { PaperTradingResponse, Stock } from "@/types";
import { ChartComponent } from "@/components/chart-component";

export function StockDetailClient({ stock }: { stock: Stock }) {
  const [quantity, setQuantity] = useState("10");
  const [tradeState, setTradeState] = useState<"idle" | "submitting">("idle");
  const [status, setStatus] = useState("");

  const history = useMemo(
    () =>
      (stock.priceHistory ?? [])
        .map((item) => ({
          date: item.date,
          close: item.close,
          volume: item.volume
        }))
        .reverse(),
    [stock.priceHistory]
  );

  async function submitTrade(type: "BUY" | "SELL") {
    try {
      setTradeState("submitting");
      await api.post<PaperTradingResponse>("/trades/paper", {
        stockId: stock.id,
        type,
        quantity: Number(quantity)
      });
      setStatus(`${type === "BUY" ? "Buy" : "Sell"} order placed in paper trading.`);
    } catch {
      setStatus("Trade request failed. Make sure you are logged in and the backend is reachable.");
    } finally {
      setTradeState("idle");
    }
  }

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="hero-band" />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{stock.sector}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text">{stock.symbol}</h1>
            <p className="mt-2 text-base text-textMuted">{stock.name}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-semibold tracking-tight text-text">{formatCurrency(stock.quote?.ltp ?? 0)}</p>
            <p className={(Number(stock.quote?.change ?? 0)) >= 0 ? "mt-2 text-gain" : "mt-2 text-loss"}>
              {formatCurrency(stock.quote?.change ?? 0)} • {formatPercent(stock.quote?.changePercent ?? 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr,0.8fr]">
        <div className="surface p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="section-title">Price History</h2>
              <p className="section-subtitle">Historical movement rendered as a cleaner, faster chart.</p>
            </div>
          </div>
          <ChartComponent data={history} />
        </div>

        <div className="space-y-6">
          <div className="surface p-6">
            <h2 className="section-title">Paper Trading</h2>
            <p className="mt-2 text-sm text-textMuted">
              Uses the existing `/trades/paper` endpoint. No brokerage execution.
            </p>
            <input
              className="mt-5 w-full rounded-panel border border-line bg-bg/75 px-4 py-3 text-sm outline-none"
              min="1"
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
            <div className="mt-4 flex gap-3">
              <button
                className="flex-1 rounded-panel bg-gain px-4 py-3 text-sm font-medium text-white"
                disabled={tradeState === "submitting"}
                onClick={() => submitTrade("BUY")}
                type="button"
              >
                Buy
              </button>
              <button
                className="flex-1 rounded-panel bg-loss px-4 py-3 text-sm font-medium text-white"
                disabled={tradeState === "submitting"}
                onClick={() => submitTrade("SELL")}
                type="button"
              >
                Sell
              </button>
            </div>
            {status ? <p className="mt-4 text-sm text-textMuted">{status}</p> : null}
          </div>

          <div className="surface p-6">
            <h2 className="section-title">Snapshot</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-textMuted">Volume</dt>
                <dd className="font-medium text-text">{formatCompactNumber(stock.quote?.volume ?? 0)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-textMuted">Open</dt>
                <dd className="font-medium text-text">{formatCurrency(stock.quote?.open ?? 0)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-textMuted">High</dt>
                <dd className="font-medium text-text">{formatCurrency(stock.quote?.high ?? 0)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-textMuted">Low</dt>
                <dd className="font-medium text-text">{formatCurrency(stock.quote?.low ?? 0)}</dd>
              </div>
              {stock.quote?.lastUpdatedAt ? (
                <div className="flex justify-between">
                  <dt className="text-textMuted">Updated</dt>
                  <dd className="font-medium text-text">{formatDate(stock.quote.lastUpdatedAt)}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </div>

      <div className="surface p-6">
        <h2 className="section-title">Company Info</h2>
        <p className="mt-3 text-sm leading-7 text-textMuted">
          {stock.description ??
            "Company fundamentals and narrative will appear here as the backend market provider expands."}
        </p>
      </div>
    </div>
  );
}
