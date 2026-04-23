import { formatCurrency, formatDate } from "@/lib/utils";
import type { IpoOffer } from "@/types";

export function IpoPage({ ipos }: { ipos: IpoOffer[] }) {
  const upcoming = ipos.filter((ipo) => ipo.status === "UPCOMING");
  const open = ipos.filter((ipo) => ipo.status === "OPEN");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-text">IPO Radar</h1>
        <p className="mt-2 text-sm text-textMuted">
          Upcoming and open IPOs powered by the existing backend offer feed.
        </p>
      </div>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-text">Open IPOs</h2>
        <div className="grid gap-4 xl:grid-cols-2">
          {open.map((ipo) => (
            <div key={ipo.id} className="rounded-panel border border-line bg-panel p-5 shadow-panel">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-text">{ipo.companyName}</p>
                  <p className="mt-1 text-sm text-textMuted">{ipo.symbol ?? "Primary issue"}</p>
                </div>
                <span className="rounded-full bg-gain/10 px-3 py-1 text-xs font-semibold text-gain">OPEN</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-textMuted">Window</p>
                  <p className="mt-1 font-medium text-text">
                    {formatDate(ipo.openingDate)} - {formatDate(ipo.closingDate)}
                  </p>
                </div>
                <div>
                  <p className="text-textMuted">Price</p>
                  <p className="mt-1 font-medium text-text">{formatCurrency(ipo.pricePerUnit)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-text">Upcoming IPOs</h2>
        <div className="grid gap-4 xl:grid-cols-2">
          {upcoming.map((ipo) => (
            <div key={ipo.id} className="rounded-panel border border-line bg-panel p-5 shadow-panel">
              <p className="text-lg font-semibold text-text">{ipo.companyName}</p>
              <p className="mt-2 text-sm text-textMuted">
                Opens {formatDate(ipo.openingDate)} • {ipo.units.toLocaleString("en-NP")} units
              </p>
              <p className="mt-4 text-sm text-textMuted">{ipo.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

