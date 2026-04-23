import { Redirect } from "expo-router";
import { AuthScreen } from "@/screens/auth/auth-screen";
import { useAuthStore } from "@/store/auth-store";

export default function AuthRoute() {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (accessToken) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <AuthScreen />;
}

