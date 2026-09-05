import { useTheme } from "@/theme/ThemeProvider";
import { forwardRef } from "react";
import { TextInput, StyleSheet, type TextInputProps } from "react-native";

export interface InputProps extends TextInputProps {
  error?: boolean | string;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ style, error, ...props }, ref) => {
    const { tokens } = useTheme();
    const hasError = Boolean(error);

    return (
      <TextInput
        ref={ref}
        style={[
          styles.input,
          {
            color: tokens.foreground,
            backgroundColor: tokens.background,
            borderColor: hasError ? tokens.destructive : tokens.border,
            borderRadius: tokens.radius.md,
          },
          style,
        ]}
        placeholderTextColor={tokens["muted-foreground"]}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

const styles = StyleSheet.create({
  input: {
    height: 52,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
