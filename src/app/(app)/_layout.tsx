import { useAuthStore } from "@/stores/auth-store";
import { useTheme } from "@/theme/ThemeProvider";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function AppLayout() {
  const { tokens, theme } = useTheme();

  const status = useAuthStore((state) => state.status);
  if (status === "signedOut") return <Redirect href="/(auth)/login" />;

  return (
    <>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={tokens.background}
      />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
