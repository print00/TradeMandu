import { StockDetailClient } from "@/components/stock-detail-client";
import { getStockDetail } from "@/lib/server-api";

export default async function StockDetailPage({
  params
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const stock = await getStockDetail(symbol);
  return <StockDetailClient stock={stock} />;
}

