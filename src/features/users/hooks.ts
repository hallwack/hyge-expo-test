import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "./api";
import { SecureKey, secureStorage } from "@/libs/secure-storage";
import { useAuthStore } from "@/stores/auth-store";

async function persistAuth(tokens: {
  accessToken: string;
  refreshToken: string;
  user: unknown;
}) {
  await secureStorage.set(SecureKey.ACCESS_TOKEN, tokens.accessToken);
  await secureStorage.setJSON(SecureKey.USER, tokens.user);
}

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async (tokens) => {
      console.log("Login successful, persisting auth tokens...");

      try {
        // 1. Simpan token ke secure storage lebih dulu
        await persistAuth(tokens);
      } catch (error) {
        console.error("Gagal menyimpan session auth:", error);
      } finally {
        // 2. Update state Zustand.
        // Perubahan status menjadi "signedIn" akan otomatis memicu <Redirect /> pada AuthLayout.
        setAuth(tokens.user);
        qc.clear();
      }
    },
  });
}

export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: async (tokens) => {
      await persistAuth(tokens);
      setAuth(tokens.user);
      qc.clear();
    },
  });
}

export function useLogout() {
  const setSignedOut = useAuthStore((s) => s.setSignedOut);
  const qc = useQueryClient();

  return async () => {
    await secureStorage.remove(SecureKey.ACCESS_TOKEN);
    await secureStorage.remove(SecureKey.USER);
    qc.clear();
    setSignedOut();
  };
}
