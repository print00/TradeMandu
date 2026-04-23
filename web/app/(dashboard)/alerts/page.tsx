import { AlertsPageClient } from "@/components/alerts-page-client";
import { getStocks } from "@/lib/server-api";

export default async function AlertsPage() {
  const stocks = await getStocks();
  return <AlertsPageClient stocks={stocks} />;
}
