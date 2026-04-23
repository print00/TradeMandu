import { Text, View } from "react-native";

type StatCardProps = {
  label: string;
  value: string;
  tone?: "default" | "gain" | "loss";
};

export function StatCard({ label, value, tone = "default" }: StatCardProps) {
  const toneClass =
    tone === "gain" ? "text-gain" : tone === "loss" ? "text-loss" : "text-ink";

  return (
    <View className="flex-1 rounded-[28px] border border-line bg-card p-4">
      <Text className="text-xs uppercase tracking-[1.5px] text-mist">{label}</Text>
      <Text className={`mt-3 text-2xl font-semibold ${toneClass}`}>{value}</Text>
    </View>
  );
}

