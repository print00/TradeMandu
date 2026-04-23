"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Alert, Stock } from "@/types";

export function AlertsPageClient({ stocks }: { stocks: Stock[] }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedStockId, setSelectedStockId] = useState(stocks[0]?.id ?? "");
  const [type, setType] = useState<Alert["type"]>("PRICE");
  const [target, setTarget] = useState("700");

  useEffect(() => {
    let mounted = true;

    async function loadAlerts() {
      try {
        const response = await api.get<Alert[]>("/alerts");
        if (mounted) setAlerts(response.data);
      } catch {
        if (mounted) setAlerts([]);
      }
    }

    loadAlerts();
    return () => {
      mounted = false;
    };
  }, []);

  async function createAlert() {
    const payload =
      type === "PRICE"
        ? { stockId: selectedStockId, type, direction: "ABOVE", targetPrice: Number(target) }
        : type === "PERCENT_CHANGE"
          ? { stockId: selectedStockId, type, direction: "ABOVE", targetPercent: Number(target) }
          : { stockId: selectedStockId, type, direction: "ABOVE", targetVolume: Number(target) };

    const response = await api.post<Alert>("/alerts", payload);
    const stock = stocks.find((item) => item.id === selectedStockId);
    setAlerts([...alerts, { ...response.data, stock }]);
  }

  async function deleteAlert(id: string) {
    await api.delete(`/alerts/${id}`);
    setAlerts(alerts.filter((alert) => alert.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="rounded-panel border border-line bg-panel p-6 shadow-panel">
        <h1 className="text-3xl font-semibold text-text">Alerts</h1>
        <p className="mt-2 text-sm text-textMuted">
          Create price, percent-change, and volume alerts using the current backend contracts.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <select
            className="rounded-2xl border border-line bg-bg px-4 py-3 text-sm outline-none"
            value={selectedStockId}
            onChange={(event) => setSelectedStockId(event.target.value)}
          >
            {stocks.map((stock) => (
              <option key={stock.id} value={stock.id}>
                {stock.symbol}
              </option>
            ))}
          </select>
          <select
            className="rounded-2xl border border-line bg-bg px-4 py-3 text-sm outline-none"
            value={type}
            onChange={(event) => setType(event.target.value as Alert["type"])}
          >
            <option value="PRICE">Price</option>
            <option value="PERCENT_CHANGE">% Change</option>
            <option value="VOLUME">Volume</option>
          </select>
          <input
            className="rounded-2xl border border-line bg-bg px-4 py-3 text-sm outline-none"
            value={target}
            onChange={(event) => setTarget(event.target.value)}
            placeholder="Target"
          />
          <button
            className="rounded-2xl bg-accent px-4 py-3 text-sm font-medium text-white"
            onClick={createAlert}
            type="button"
          >
            Create Alert
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {alerts.map((alert) => (
          <div key={alert.id} className="rounded-panel border border-line bg-panel p-5 shadow-panel">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-text">{alert.stock?.symbol ?? alert.stockId}</p>
                <p className="mt-1 text-sm text-textMuted">{alert.type.replace("_", " ")}</p>
              </div>
              <button className="text-sm text-loss" onClick={() => deleteAlert(alert.id)} type="button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

