import type { PropsWithChildren, ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  headerRight?: ReactNode;
}>;

export function Screen({ children, title, subtitle, headerRight }: ScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, gap: 18 }}>
        <View className="flex-row items-start justify-between">
          <View className="max-w-[80%]">
            <Text className="text-3xl font-semibold text-ink">{title}</Text>
            {subtitle ? <Text className="mt-2 text-sm leading-5 text-mist">{subtitle}</Text> : null}
          </View>
          {headerRight}
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

