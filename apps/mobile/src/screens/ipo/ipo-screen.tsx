import { Pressable, Text, View } from "react-native";
import { ipoCards } from "@/constants/mock-data";
import { Screen } from "@/components/screen";

export function IpoScreen() {
  return (
    <Screen
      title="IPO Radar"
      subtitle="Upcoming issues, open windows, and quick reminders built for Nepali retail investors."
    >
      {ipoCards.map((ipo) => (
        <View key={ipo.companyName} className="rounded-[28px] border border-line bg-card p-5">
          <View className="flex-row items-start justify-between">
            <View className="max-w-[75%]">
              <Text className="text-lg font-semibold text-ink">{ipo.companyName}</Text>
              <Text className="mt-2 text-sm text-mist">
                {ipo.openingDate} to {ipo.closingDate}
              </Text>
            </View>
            <View className="rounded-full bg-[#F1E1BB] px-3 py-2">
              <Text className="text-xs font-semibold text-ink">{ipo.status}</Text>
            </View>
          </View>
          <View className="mt-5 flex-row justify-between">
            <Text className="text-sm text-mist">{ipo.units.toLocaleString()} units</Text>
            <Text className="text-sm font-medium text-ink">Rs. {ipo.pricePerUnit}</Text>
          </View>
          <Pressable className="mt-5 rounded-full bg-accent px-4 py-3">
            <Text className="text-center text-sm font-medium text-white">Set reminder</Text>
          </Pressable>
        </View>
      ))}
    </Screen>
  );
}

