import { User } from "@/types/auth";
import { create } from "zustand";

interface AuthState {
  status: "loading" | "signedOut" | "signedIn";
  user: User | null;
  setAuth: (user: User) => void;
  setSignedOut: () => void;
  setRestored: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  status: "loading",
  user: null,
  setAuth: (user) => set({ status: "signedIn", user }),
  setSignedOut: () => set({ status: "signedOut", user: null }),
  setRestored: (user) => set({ status: user ? "signedIn" : "signedOut", user }),
}));
