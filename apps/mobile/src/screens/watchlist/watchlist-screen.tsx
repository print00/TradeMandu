import { Text, View } from "react-native";
import { marketQuotes } from "@/constants/mock-data";
import { Screen } from "@/components/screen";
import { StockRow } from "@/components/stock-row";

export function WatchlistScreen() {
  const items = marketQuotes.slice(0, 3);

  return (
    <Screen
      title="Watchlist"
      subtitle="Save likely entries, keep an eye on momentum, and move fast when alerts fire."
    >
      <View className="rounded-[28px] border border-line bg-card p-5">
        <Text className="text-lg font-semibold text-ink">Pinned today</Text>
        <Text className="mt-2 text-sm leading-5 text-mist">
          Banking strength is standing out. Cement names are still active on volume.
        </Text>
      </View>
      {items.map((item) => (
        <StockRow key={item.symbol} item={item} />
      ))}
    </Screen>
  );
}

