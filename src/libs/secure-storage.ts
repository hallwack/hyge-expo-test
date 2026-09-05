import * as SecureStore from "expo-secure-store";

export enum SecureKey {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
  USER = "user",
}

const OPTIONS: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
};

export const secureStorage = {
  set: (key: SecureKey, value: string) =>
    SecureStore.setItemAsync(key, value, OPTIONS),
  get: (key: SecureKey) => SecureStore.getItemAsync(key, OPTIONS),
  remove: (key: SecureKey) => SecureStore.deleteItemAsync(key, OPTIONS),

  setJSON: async <T>(key: SecureKey, value: T) => {
    await SecureStore.setItemAsync(key, JSON.stringify(value), OPTIONS);
  },
  getJSON: async <T>(key: SecureKey): Promise<T | null> => {
    const raw = await SecureStore.getItemAsync(key, OPTIONS);
    return raw ? (JSON.parse(raw) as T) : null;
  },
};
