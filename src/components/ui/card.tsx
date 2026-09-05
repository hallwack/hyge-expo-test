import { useTheme } from "@/theme/ThemeProvider";
import React from "react";
import { View, StyleSheet, type ViewProps } from "react-native";

export interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export function Card({ children, style }: CardProps) {
  const { tokens } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: tokens.card,
          borderColor: tokens.border,
          borderRadius: tokens.radius.lg,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export interface CardContentProps extends ViewProps {
  children: React.ReactNode;
}

export function CardContent({ children, style }: CardContentProps) {
  return <View style={[styles.content, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  content: {
    padding: 24,
  },
});
