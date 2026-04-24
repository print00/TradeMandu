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
        "block rounded-panel border border-line/80 bg-panel/88 p-5 shadow-panel backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-glow",
        compact && "p-4"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold text-text">{stock.symbol}</p>
            <span className="rounded-panel bg-panelSoft px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-textMuted">
              {stock.sector}
            </span>
          </div>
          <p className="mt-2 text-sm text-textMuted">{stock.name}</p>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-panel",
            positive ? "bg-gain/10 text-gain" : "bg-loss/10 text-loss"
          )}
        >
          {positive ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
        </div>
      </div>
      <div className="mt-5 flex items-end justify-between border-t border-line/70 pt-4">
        <div>
          <p className="text-2xl font-semibold tracking-tight text-text">{formatCurrency(stock.quote?.ltp ?? 0)}</p>
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
