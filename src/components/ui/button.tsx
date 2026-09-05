import { useTheme } from "@/theme/ThemeProvider";
import { Tokens } from "@/theme/tokens";
import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from "react-native";

export type ButtonVariant =
  "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

type VariantStyle = {
  backgroundColor: string;
  color: string;
  borderColor: string;
  textDecorationLine?: "none" | "underline";
};

const getVariantStyles = (
  tokens: Tokens,
): Record<ButtonVariant, VariantStyle> => ({
  default: {
    backgroundColor: tokens.primary,
    color: tokens["primary-foreground"],
    borderColor: tokens.primary,
  },
  destructive: {
    backgroundColor: tokens.destructive,
    color: tokens["destructive-foreground"],
    borderColor: tokens.destructive,
  },
  outline: {
    backgroundColor: tokens.background,
    color: tokens.foreground,
    borderColor: tokens.border,
  },
  secondary: {
    backgroundColor: tokens.secondary,
    color: tokens["secondary-foreground"],
    borderColor: tokens.secondary,
  },
  ghost: {
    backgroundColor: "transparent",
    color: tokens.primary,
    borderColor: "transparent",
  },
  link: {
    backgroundColor: "transparent",
    color: tokens.primary,
    borderColor: "transparent",
    textDecorationLine: "underline",
  },
});

type SizeStyle = {
  height: number;
  fontSize: number;
  paddingHorizontal: number;
};

const sizeStyles: Record<ButtonSize, SizeStyle> = {
  default: { height: 52, fontSize: 16, paddingHorizontal: 24 },
  sm: { height: 40, fontSize: 14, paddingHorizontal: 16 },
  lg: { height: 56, fontSize: 18, paddingHorizontal: 32 },
  icon: { height: 44, fontSize: 16, paddingHorizontal: 0 },
};

export interface ButtonProps extends TouchableOpacityProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

export function Button({
  children,
  variant = "default",
  size = "default",
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const { tokens } = useTheme();
  const vStyles = getVariantStyles(tokens)[variant];
  const sStyles = sizeStyles[size];

  return (
    <TouchableOpacity
      style={[
        styles.base,
        {
          height: sStyles.height,
          backgroundColor: vStyles.backgroundColor,
          borderWidth: variant === "link" ? 0 : 1,
          borderColor: vStyles.borderColor,
          borderRadius: tokens.radius.md,
          opacity: disabled || isLoading ? 0.6 : 1,
          paddingHorizontal: size === "icon" ? 0 : sStyles.paddingHorizontal,
        },
        style as ViewStyle,
      ]}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={vStyles.color} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: vStyles.color,
              fontSize: sStyles.fontSize,
              textDecorationLine: vStyles.textDecorationLine || "none",
            },
            textStyle,
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontWeight: "600",
  },
});
