import { Tabs } from "expo-router";
import { ChartCandlestick, House, ListStar, ScrollText, User2, Wallet } from "lucide-react-native";
import { colors } from "@/theme/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.ink,
        tabBarInactiveTintColor: colors.mist,
        tabBarStyle: {
          height: 74,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: colors.card,
          borderTopColor: colors.line
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: "Market",
          tabBarIcon: ({ color, size }) => <ChartCandlestick color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: "Watchlist",
          tabBarIcon: ({ color, size }) => <ListStar color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="trade"
        options={{
          title: "Trade",
          tabBarIcon: ({ color, size }) => <Wallet color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="ipo"
        options={{
          title: "IPO",
          tabBarIcon: ({ color, size }) => <ScrollText color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User2 color={color} size={size} />
        }}
      />
    </Tabs>
  );
}

