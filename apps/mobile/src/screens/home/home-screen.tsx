import { LinearGradient } from "expo-linear-gradient";
import { Bell, Sparkles } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { usePortfolio } from "@/hooks/use-portfolio";
import { Screen } from "@/components/screen";
import { StatCard } from "@/components/stat-card";
import { portfolioPositions } from "@/constants/mock-data";

export function HomeScreen() {
  const { data } = usePortfolio();
  const summary = data?.summary;
  const positions = data?.positions ?? portfolioPositions;

  return (
    <Screen
      title="Your money, your pace."
      subtitle="Track NEPSE positions, virtual trades, and smart reminders in one calm dashboard."
      headerRight={
        <Pressable className="h-12 w-12 items-center justify-center rounded-full border border-line bg-card">
          <Bell size={20} color="#0E1726" />
        </Pressable>
      }
    >
      <LinearGradient
        colors={["#173D6D", "#305E97"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 28, padding: 20 }}
      >
        <Text className="text-sm uppercase tracking-[1.5px] text-white/70">Total Portfolio</Text>
        <Text className="mt-3 text-4xl font-semibold text-white">
          Rs. {(summary?.marketValue ?? 77186).toLocaleString()}
        </Text>
        <View className="mt-6 flex-row gap-3">
          <View className="rounded-2xl bg-white/15 px-4 py-3">
            <Text className="text-xs uppercase tracking-[1.2px] text-white/60">Daily P/L</Text>
            <Text className="mt-2 text-lg font-semibold text-white">
              +Rs. {(summary?.dailyPl ?? 1115).toLocaleString()}
            </Text>
          </View>
          <View className="rounded-2xl bg-white/15 px-4 py-3">
            <Text className="text-xs uppercase tracking-[1.2px] text-white/60">Total P/L</Text>
            <Text className="mt-2 text-lg font-semibold text-white">
              +Rs. {(summary?.totalPl ?? 4096).toLocaleString()}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View className="flex-row gap-3">
        <StatCard label="Paper Wallet" value="Rs. 100,000" />
        <StatCard label="Risk Level" value="Beginner" />
      </View>

      <View className="rounded-[28px] border border-line bg-card p-5">
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#F1E1BB]">
            <Sparkles size={22} color="#0E1726" />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-semibold text-ink">Daily insight</Text>
            <Text className="mt-1 text-sm leading-5 text-mist">
              Banking names are carrying today&apos;s momentum. Consider setting volume alerts on your top holdings.
            </Text>
          </View>
        </View>
      </View>

      <View className="gap-3">
        <Text className="text-lg font-semibold text-ink">Holdings</Text>
        {positions.map((position) => (
          <View key={position.symbol} className="rounded-[24px] border border-line bg-card p-4">
            <View className="flex-row items-start justify-between">
              <View>
                <Text className="text-lg font-semibold text-ink">{position.symbol}</Text>
                <Text className="mt-1 text-sm text-mist">{position.name}</Text>
              </View>
              <Text className="text-base font-medium text-gain">
                +Rs. {position.totalPl.toLocaleString()}
              </Text>
            </View>
            <View className="mt-4 flex-row justify-between">
              <Text className="text-sm text-mist">{position.quantity} shares</Text>
              <Text className="text-sm text-ink">Rs. {position.marketValue.toLocaleString()}</Text>
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

