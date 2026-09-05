import { SecureKey, secureStorage } from "@/libs/secure-storage";
import { ApiError } from "./errors";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  method?: HttpMethod;
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  skipAuth?: boolean;
}

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// ── expired-token handling: registered once from the root layout ──
let onUnauthorized: (() => void) | null = null;
export const setUnauthorizedHandler = (fn: () => void) => {
  onUnauthorized = fn;
};

// Dedup concurrent 401s so only ONE refresh request is fired.
let refreshing: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = await secureStorage.get(SecureKey.REFRESH_TOKEN);
  if (!refreshToken) return null;

  const res = await fetch(`${BASE_URL}/v1/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) return null;

  const data = await res.json();
  await secureStorage.set(SecureKey.ACCESS_TOKEN, data.accessToken);
  return data.accessToken as string;
}

function buildUrl(path: string, params?: RequestOptions["params"]) {
  let url = `${BASE_URL}${path}`;
  if (params) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== "") qs.append(k, String(v));
    }
    const s = qs.toString();
    if (s) url += `?${s}`;
  }
  return url;
}

async function doFetch(
  url: string,
  opts: RequestOptions,
  token: string | null,
): Promise<Response> {
  return fetch(url, {
    method: opts.method ?? "GET",
    signal: opts.signal,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opts.headers,
    },
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });
}

export async function api<T>(
  path: string,
  opts: RequestOptions = {},
): Promise<T> {
  const url = buildUrl(path, opts.params);
  const token = opts.skipAuth
    ? null
    : await secureStorage.get(SecureKey.ACCESS_TOKEN);

  async function parse(res: Response): Promise<T> {
    const data = res.status === 204 ? null : await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 401 && !opts.skipAuth) {
        refreshing ??= refreshAccessToken().finally(() => {
          refreshing = null;
        });
        const newToken = await refreshing;
        if (newToken) {
          const retry = await doFetch(url, opts, newToken);
          if (retry.ok) return parse(retry);
        }
        await secureStorage.remove(SecureKey.ACCESS_TOKEN);
        onUnauthorized?.();
      }
      throw new ApiError(
        res.status,
        data?.code ?? "UNKNOWN",
        data?.message ?? res.statusText,
      );
    }

    return data as T;
  }

  return parse(await doFetch(url, opts, token));
}
