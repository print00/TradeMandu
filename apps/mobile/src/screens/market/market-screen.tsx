import { Text, View } from "react-native";
import { Screen } from "@/components/screen";
import { StockRow } from "@/components/stock-row";
import { useMarketOverview } from "@/hooks/use-market-overview";

export function MarketScreen() {
  const { data } = useMarketOverview();
  const stocks = data ?? [];

  const gainers = [...stocks].sort((a, b) => b.changePercent - a.changePercent).slice(0, 2);
  const losers = [...stocks].sort((a, b) => a.changePercent - b.changePercent).slice(0, 2);

  return (
    <Screen
      title="Market"
      subtitle="Fast, readable NEPSE discovery with movers, watch signals, and symbol drill-down."
    >
      <View className="gap-3">
        <Text className="text-lg font-semibold text-ink">Top Gainers</Text>
        {gainers.map((item) => (
          <StockRow key={item.symbol} item={item} />
        ))}
      </View>

      <View className="gap-3">
        <Text className="text-lg font-semibold text-ink">Top Losers</Text>
        {losers.map((item) => (
          <StockRow key={item.symbol} item={item} />
        ))}
      </View>

      <View className="gap-3">
        <Text className="text-lg font-semibold text-ink">All Stocks</Text>
        {stocks.map((item) => (
          <StockRow key={item.symbol} item={item} />
        ))}
      </View>
    </Screen>
  );
}

