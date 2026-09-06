/**
 * Utility function to conditionally join CSS class names
 * @param classes - Array of class names or falsy values
 * @returns Joined string of truthy class names
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  // Filter truthy values and join with space
  return classes.filter(Boolean).join(" ");
}

/**
 * Helper to get token value with fallback
 * @param tokens - Theme tokens object
 * @param key - Token key to look up
 * @param fallback - Fallback value if token not found
 * @returns Token value or fallback
 */
export function token<T = string>(
  tokens: Record<string, any>,
  key: string,
  fallback: T,
): T {
  return (tokens[key] as T) ?? fallback;
}

// Alternative with more specific typing for theme tokens
export function tokenStrict<TKey extends string, TValue = string>(
  tokens: Record<TKey, TValue>,
  key: TKey,
  fallback: TValue,
): TValue {
  return tokens[key] ?? fallback;
}

// Type guard version for better type safety
export function tokenSafe<T = string>(
  tokens: Record<string, unknown>,
  key: string,
  fallback: T,
): T {
  const value = tokens[key];
  return value !== undefined && value !== null ? (value as T) : fallback;
}

// Example usage with generic types
export interface ThemeTokens {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  [key: string]: any; // For additional custom tokens
}

// Helper with specific theme token type
export function getThemeToken<T = string>(
  tokens: ThemeTokens,
  key: keyof ThemeTokens | string,
  fallback: T,
): T {
  return (tokens[key as keyof ThemeTokens] as T) ?? fallback;
}
