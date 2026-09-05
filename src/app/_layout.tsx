import { setUnauthorizedHandler } from "@/api/client";
import { ApiError } from "@/api/errors";
import { SecureKey, secureStorage } from "@/libs/secure-storage";
import { useAuthStore } from "@/stores/auth-store";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { User } from "@/types/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (count, err) =>
        !(err instanceof ApiError && err.isUnauthorized) && count < 2,
      staleTime: 30_000,
    },
  },
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const setRestored = useAuthStore((state) => state.setRestored);
  const setSignedOut = useAuthStore((state) => state.setSignedOut);

  useEffect(() => {
    setUnauthorizedHandler(setSignedOut);
    secureStorage.getJSON<User>(SecureKey.USER).then(setRestored);
  }, []);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="light">
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
