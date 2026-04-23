import { View } from "react-native";

type MiniChartProps = {
  points: number[];
  positive?: boolean;
};

export function MiniChart({ points, positive = true }: MiniChartProps) {
  const max = Math.max(...points);
  const min = Math.min(...points);

  return (
    <View className="h-12 flex-row items-end gap-1">
      {points.map((point, index) => {
        const height = ((point - min) / Math.max(max - min, 1)) * 36 + 10;
        return (
          <View
            key={`${point}-${index}`}
            className={`w-2 rounded-full ${positive ? "bg-gain" : "bg-loss"}`}
            style={{ height }}
          />
        );
      })}
    </View>
  );
}

