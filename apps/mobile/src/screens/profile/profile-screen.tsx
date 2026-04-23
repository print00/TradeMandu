import { Text, View } from "react-native";
import { lessons } from "@/constants/mock-data";
import { Screen } from "@/components/screen";

export function ProfileScreen() {
  return (
    <Screen
      title="Profile"
      subtitle="Investor profile, account preferences, and learning tracks tailored for Nepal-first onboarding."
    >
      <View className="rounded-[28px] border border-line bg-card p-5">
        <Text className="text-lg font-semibold text-ink">Shushil Karki</Text>
        <Text className="mt-2 text-sm text-mist">shushil@example.com</Text>
        <Text className="mt-1 text-sm text-mist">Risk level: Beginner</Text>
      </View>

      <View className="gap-3">
        <Text className="text-lg font-semibold text-ink">Learn the market</Text>
        {lessons.map((lesson) => (
          <View key={lesson.title} className="rounded-[24px] border border-line bg-card p-4">
            <Text className="text-base font-semibold text-ink">{lesson.title}</Text>
            <Text className="mt-2 text-sm leading-5 text-mist">{lesson.description}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

