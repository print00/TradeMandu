import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { MiniChart } from "./mini-chart";
import type { Quote } from "@/types";

type StockRowProps = {
  item: Quote;
};

export function StockRow({ item }: StockRowProps) {
  const positive = item.change >= 0;

  return (
    <Pressable
      className="rounded-[28px] border border-line bg-card p-4"
      onPress={() => router.push(`/stock/${item.symbol}`)}
    >
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-lg font-semibold text-ink">{item.symbol}</Text>
          <Text className="mt-1 text-sm text-mist">{item.name}</Text>
        </View>
        <MiniChart points={item.points} positive={positive} />
      </View>
      <View className="mt-4 flex-row items-end justify-between">
        <Text className="text-2xl font-semibold text-ink">Rs. {item.price.toFixed(2)}</Text>
        <View className="items-end">
          <Text className={`text-base font-medium ${positive ? "text-gain" : "text-loss"}`}>
            {positive ? "+" : ""}
            {item.change.toFixed(2)}
          </Text>
          <Text className={`mt-1 text-sm ${positive ? "text-gain" : "text-loss"}`}>
            {positive ? "+" : ""}
            {item.changePercent.toFixed(2)}%
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

