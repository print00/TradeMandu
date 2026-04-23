import { formatCurrency, formatPercent } from "@/lib/utils";
import type { PortfolioPosition } from "@/types";

export function PortfolioTable({ positions }: { positions: PortfolioPosition[] }) {
  if (positions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line px-4 py-10 text-center text-sm text-textMuted">
        Your holdings will appear here once the authenticated portfolio endpoint returns data.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-[0.18em] text-textMuted">
            <th className="pb-3 font-medium">Stock</th>
            <th className="pb-3 font-medium">Qty</th>
            <th className="pb-3 font-medium">Avg Price</th>
            <th className="pb-3 font-medium">Current</th>
            <th className="pb-3 font-medium">Market Value</th>
            <th className="pb-3 font-medium">P/L</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position.id} className="border-b border-line/70 text-sm text-text">
              <td className="py-4">
                <div>
                  <p className="font-medium">{position.symbol}</p>
                  <p className="text-xs text-textMuted">{position.name}</p>
                </div>
              </td>
              <td className="py-4">{position.quantity}</td>
              <td className="py-4">{formatCurrency(position.avgPrice)}</td>
              <td className="py-4">{formatCurrency(position.currentPrice)}</td>
              <td className="py-4">{formatCurrency(position.marketValue)}</td>
              <td className={`py-4 ${position.totalPl >= 0 ? "text-gain" : "text-loss"}`}>
                {formatCurrency(position.totalPl)}
                <div className="text-xs">{formatPercent(position.totalPlPercent)}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

