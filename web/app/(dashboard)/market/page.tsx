import { MarketPageClient } from "@/components/market-page-client";
import { getStocks, getTopGainers, getTopLosers } from "@/lib/server-api";

export default async function MarketPage() {
  const [stocks, gainers, losers] = await Promise.all([getStocks(), getTopGainers(), getTopLosers()]);
  return <MarketPageClient stocks={stocks} gainers={gainers} losers={losers} />;
}

