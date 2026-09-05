import { useAuthStore } from "@/stores/auth-store";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const status = useAuthStore((state) => state.status);
  if (status === "signedIn") return <Redirect href="/(app)/(tabs)" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
