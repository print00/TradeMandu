import { WatchlistPageClient } from "@/components/watchlist-page-client";
import { getStocks } from "@/lib/server-api";

export default async function WatchlistPage() {
  const stocks = await getStocks();
  return <WatchlistPageClient stocks={stocks} />;
}

