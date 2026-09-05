type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

type SemanticScale = {
  DEFAULT: string;
  foreground: string;
};

type SuccessScale = {
  50: string;
  100: string;
  500: string;
  600: string;
};

type WarningScale = {
  50: string;
  100: string;
  500: string;
  600: string;
};

export type Colors = {
  white: string;
  black: string;
  transparent: string;
  slate: ColorScale;
  primary: ColorScale;
  destructive: ColorScale;
  success: SuccessScale;
  warning: WarningScale;
  muted: SemanticScale;
};

export const colors: Colors = {
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",

  slate: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
    950: "#020617",
  },

  primary: {
    50: "#EEF2FF",
    100: "#E0E7FF",
    200: "#C7D2FE",
    300: "#A5B4FC",
    400: "#818CF8",
    500: "#6366F1",
    600: "#4F46E5",
    700: "#4338CA",
    800: "#3730A3",
    900: "#312E81",
    950: "#1E1B4B",
  },

  destructive: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
    950: "#450A0A",
  },

  success: {
    50: "#ECFDF5",
    100: "#D1FAE5",
    500: "#10B981",
    600: "#059669",
  },

  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    500: "#F59E0B",
    600: "#D97706",
  },

  muted: {
    DEFAULT: "#F1F5F9",
    foreground: "#64748B",
  },
};
