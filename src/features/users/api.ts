import { api } from "@/api/client";
import { AuthTokens } from "@/types/auth";

export const authApi = {
  register: (input: { name: string; email: string; password: string }) =>
    api<AuthTokens>("/v1/auth/register", {
      method: "POST",
      body: input,
      skipAuth: true,
    }),

  login: (input: { email: string; password: string }) =>
    api<AuthTokens>("/v1/auth/login", {
      method: "POST",
      body: input,
      skipAuth: true,
    }),
};
