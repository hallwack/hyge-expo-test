import { darkTokens, lightTokens, Theme } from "@/theme/tokens";
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

export type AlertVariant =
  "default" | "info" | "success" | "warning" | "destructive";
export type AlertTone = "solid" | "soft" | "outline";

export type AlertProps = {
  variant?: AlertVariant;
  tone?: AlertTone;
  theme?: Theme;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
};

type Palette = {
  bg: string;
  border: string;
  title: string;
  description: string;
};

function getPalette(
  variant: AlertVariant,
  tone: AlertTone,
  theme: Theme,
): Palette {
  const tokens = theme === "dark" ? darkTokens : lightTokens;

  const base: Record<AlertVariant, Omit<Palette, "bg">> = {
    default: {
      border: tokens.border,
      title: tokens.foreground,
      description: tokens["muted-foreground"],
    },
    info: {
      border: "#6366F1",
      title: theme === "dark" ? "#A5B4FC" : "#4338CA",
      description: theme === "dark" ? "#C7D2FE" : "#4F46E5",
    },
    success: {
      border: "#10B981",
      title: theme === "dark" ? "#6EE7B7" : "#047857",
      description: theme === "dark" ? "#A7F3D0" : "#059669",
    },
    warning: {
      border: "#F59E0B",
      title: theme === "dark" ? "#FCD34D" : "#B45309",
      description: theme === "dark" ? "#FDE68A" : "#D97706",
    },
    destructive: {
      border: "#EF4444",
      title: theme === "dark" ? "#FCA5A5" : "#B91C1C",
      description: theme === "dark" ? "#FECACA" : "#DC2626",
    },
  };

  const softBg: Record<AlertVariant, string> = {
    default: tokens.muted,
    info: theme === "dark" ? "#312E81" : "#EEF2FF",
    success: theme === "dark" ? "#064E3B" : "#ECFDF5",
    warning: theme === "dark" ? "#78350F" : "#FFFBEB",
    destructive: theme === "dark" ? "#7F1D1D" : "#FEF2F2",
  };

  const { border, title, description } = base[variant];

  switch (tone) {
    case "solid":
      return {
        bg: border,
        border: "transparent",
        title: "#FFFFFF",
        description: theme === "dark" ? "#FFFFFF" : "#FFFFFF",
      };
    case "outline":
      return { bg: tokens.card, border, title, description };
    case "soft":
    default:
      return { bg: softBg[variant], border, title, description };
  }
}

export function Alert({
  variant = "default",
  tone = "soft",
  theme = "light",
  title,
  description,
  icon,
  style,
  titleStyle,
  descriptionStyle,
}: AlertProps) {
  const tokens = theme === "dark" ? darkTokens : lightTokens;
  const palette = getPalette(variant, tone, theme);

  return (
    <View
      accessibilityRole="alert"
      style={[
        styles.container,
        {
          backgroundColor: palette.bg,
          borderColor: palette.border,
          borderRadius: tokens.radius.md,
        },
        style,
      ]}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <View style={styles.content}>
        {title ? (
          <Text style={[styles.title, { color: palette.title }, titleStyle]}>
            {title}
          </Text>
        ) : null}
        {description ? (
          <Text
            style={[
              styles.description,
              { color: palette.description },
              descriptionStyle,
            ]}
          >
            {description}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: StyleSheet.hairlineWidth * 2,
    gap: 10,
  },
  icon: {
    marginTop: 1,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
});
