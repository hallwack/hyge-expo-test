import { colors } from "./colors";

export type Theme = "light" | "dark";

export type Radius = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
};

export type Tokens = {
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  border: string;
  input: string;
  ring: string;
  radius: Radius;
};

export const lightTokens: Tokens = {
  background: colors.white,
  foreground: colors.slate[900],
  card: colors.white,
  "card-foreground": colors.slate[900],
  popover: colors.white,
  "popover-foreground": colors.slate[900],
  primary: colors.primary[600],
  "primary-foreground": colors.white,
  secondary: colors.slate[100],
  "secondary-foreground": colors.slate[900],
  muted: colors.slate[100],
  "muted-foreground": colors.slate[500],
  accent: colors.slate[100],
  "accent-foreground": colors.slate[900],
  destructive: colors.destructive[600],
  "destructive-foreground": colors.white,
  border: colors.slate[200],
  input: colors.slate[200],
  ring: colors.primary[600],
  radius: {
    sm: 6,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
};

export const darkTokens: Tokens = {
  background: colors.slate[950],
  foreground: colors.slate[50],
  card: colors.slate[900],
  "card-foreground": colors.slate[50],
  popover: colors.slate[900],
  "popover-foreground": colors.slate[50],
  primary: colors.primary[500],
  "primary-foreground": colors.white,
  secondary: colors.slate[800],
  "secondary-foreground": colors.slate[50],
  muted: colors.slate[800],
  "muted-foreground": colors.slate[400],
  accent: colors.slate[800],
  "accent-foreground": colors.slate[50],
  destructive: colors.destructive[500],
  "destructive-foreground": colors.white,
  border: colors.slate[800],
  input: colors.slate[800],
  ring: colors.primary[500],
  radius: lightTokens.radius,
};
