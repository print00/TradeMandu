import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuthStore } from "@/store/auth-store";

export function AuthScreen() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const setSession = useAuthStore((state) => state.setSession);

  return (
    <LinearGradient colors={["#F5F1E8", "#E8DFCF"]} className="flex-1 px-5 pt-24">
      <Text className="text-4xl font-semibold text-ink">TradeMandu</Text>
      <Text className="mt-4 text-base leading-6 text-mist">
        OTP-first onboarding keeps the sign-in experience simple for first-time Nepali investors.
      </Text>

      <View className="mt-10 gap-4 rounded-[28px] border border-line bg-card p-5">
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          className="rounded-2xl border border-line bg-canvas px-4 py-4"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          value={otp}
          onChangeText={setOtp}
          placeholder="OTP"
          className="rounded-2xl border border-line bg-canvas px-4 py-4"
          keyboardType="number-pad"
        />
        <Pressable
          className="rounded-full bg-ink px-4 py-4"
          onPress={() => setSession("demo-session-token", email)}
        >
          <Text className="text-center text-base font-medium text-white">Continue</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

