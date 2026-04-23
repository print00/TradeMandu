import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { Stock } from "@/types";
import { cn, formatCompactNumber, formatCurrency, formatPercent } from "@/lib/utils";

export function StockCard({ stock, compact = false }: { stock: Stock; compact?: boolean }) {
  const change = stock.quote?.change ?? 0;
  const positive = change >= 0;

  return (
    <Link
      href={`/market/${stock.symbol}`}
      className={cn(
        "block rounded-panel border border-line bg-panel p-5 shadow-panel transition hover:-translate-y-0.5 hover:border-accent/40",
        compact && "p-4"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-text">{stock.symbol}</p>
          <p className="mt-1 text-sm text-textMuted">{stock.name}</p>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-2xl",
            positive ? "bg-gain/10 text-gain" : "bg-loss/10 text-loss"
          )}
        >
          {positive ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
        </div>
      </div>
      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold text-text">{formatCurrency(stock.quote?.ltp ?? 0)}</p>
          <p className="mt-1 text-xs text-textMuted">Vol. {formatCompactNumber(stock.quote?.volume ?? 0)}</p>
        </div>
        <div className={positive ? "text-gain" : "text-loss"}>
          <p className="text-sm font-medium">{formatCurrency(change)}</p>
          <p className="text-xs">{formatPercent(stock.quote?.changePercent ?? 0)}</p>
        </div>
      </div>
    </Link>
  );
}

