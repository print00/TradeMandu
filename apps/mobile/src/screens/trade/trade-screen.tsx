import { Pressable, Text, View } from "react-native";
import { portfolioPositions } from "@/constants/mock-data";
import { Screen } from "@/components/screen";

export function TradeScreen() {
  return (
    <Screen
      title="Paper Trading"
      subtitle="Practice with virtual money before risking capital. Build confidence, not regret."
    >
      <View className="rounded-[28px] bg-ink p-5">
        <Text className="text-sm uppercase tracking-[1.5px] text-white/60">Virtual Cash</Text>
        <Text className="mt-3 text-4xl font-semibold text-white">Rs. 100,000</Text>
        <Text className="mt-2 text-sm text-white/70">Resettable simulator with real portfolio-style P/L.</Text>
      </View>

      <View className="gap-3">
        {portfolioPositions.map((position) => (
          <View key={position.symbol} className="rounded-[24px] border border-line bg-card p-4">
            <View className="flex-row justify-between">
              <View>
                <Text className="text-lg font-semibold text-ink">{position.symbol}</Text>
                <Text className="mt-1 text-sm text-mist">{position.quantity} shares held</Text>
              </View>
              <View className="flex-row gap-2">
                <Pressable className="rounded-full bg-gain px-4 py-2">
                  <Text className="text-sm font-medium text-white">Buy</Text>
                </Pressable>
                <Pressable className="rounded-full bg-loss px-4 py-2">
                  <Text className="text-sm font-medium text-white">Sell</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

