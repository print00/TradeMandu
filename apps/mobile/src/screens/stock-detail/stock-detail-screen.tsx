import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MiniChart } from "@/components/mini-chart";
import { Screen } from "@/components/screen";
import { marketQuotes } from "@/constants/mock-data";

export function StockDetailScreen() {
  const params = useLocalSearchParams<{ symbol: string }>();
  const stock = marketQuotes.find((item) => item.symbol === params.symbol) ?? marketQuotes[0];
  const positive = stock.change >= 0;

  return (
    <Screen
      title={stock.symbol}
      subtitle={`${stock.name} • Detailed quote view, mini chart, and quick context for research before paper trades.`}
    >
      <View className="rounded-[28px] border border-line bg-card p-5">
        <Text className="text-sm uppercase tracking-[1.5px] text-mist">Last Traded Price</Text>
        <Text className="mt-3 text-4xl font-semibold text-ink">Rs. {stock.price.toFixed(2)}</Text>
        <Text className={`mt-2 text-base ${positive ? "text-gain" : "text-loss"}`}>
          {positive ? "+" : ""}
          {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
        </Text>
        <View className="mt-8">
          <MiniChart points={stock.points} positive={positive} />
        </View>
      </View>

      <View className="flex-row gap-3">
        <View className="flex-1 rounded-[24px] border border-line bg-card p-4">
          <Text className="text-xs uppercase tracking-[1.5px] text-mist">Volume</Text>
          <Text className="mt-3 text-xl font-semibold text-ink">{stock.volume.toLocaleString()}</Text>
        </View>
        <View className="flex-1 rounded-[24px] border border-line bg-card p-4">
          <Text className="text-xs uppercase tracking-[1.5px] text-mist">Sector</Text>
          <Text className="mt-3 text-xl font-semibold text-ink">Core Large Cap</Text>
        </View>
      </View>

      <View className="rounded-[28px] border border-line bg-card p-5">
        <Text className="text-lg font-semibold text-ink">Company snapshot</Text>
        <Text className="mt-3 text-sm leading-6 text-mist">
          This screen is designed for deeper market context. In the live version, plug this into candle data,
          disclosures, fundamentals, and alerts from the `/stocks/:symbol` endpoint.
        </Text>
      </View>
    </Screen>
  );
}

