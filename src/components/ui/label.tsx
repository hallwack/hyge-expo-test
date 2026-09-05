import { useTheme } from "@/theme/ThemeProvider";
import React from "react";
import { Text, type TextProps } from "react-native";

export interface LabelProps extends TextProps {
  children: React.ReactNode;
}

export function Label({ children, style, ...props }: LabelProps) {
  const { tokens } = useTheme();

  return (
    <Text
      style={[
        {
          fontSize: 14,
          fontWeight: "600",
          color: tokens.foreground,
          marginBottom: 6,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
