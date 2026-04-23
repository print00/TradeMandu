import { DashboardClient } from "@/components/dashboard-client";
import { getStocks } from "@/lib/server-api";

export default async function DashboardPage() {
  const stocks = await getStocks();
  return <DashboardClient stocks={stocks} />;
}

