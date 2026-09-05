import React from "react";
import {
  Control,
  Controller,
  Path,
  RegisterOptions,
  type FieldValues,
} from "react-hook-form";
import { View, Text, StyleSheet, type ViewProps } from "react-native";
import { Label } from "./label";
import { useTheme } from "@/theme/ThemeProvider";

export interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  rules?: RegisterOptions<T, Path<T>>;
  children: (props: {
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    value: any;
    ref: React.Ref<any>;
  }) => React.ReactElement;
}

export function FormField<T extends FieldValues>({
  name,
  control,
  label,
  rules,
  children,
}: FormFieldProps<T>) {
  const { tokens } = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          {label && <Label>{label}</Label>}
          {children({ onChange, onBlur, value, ref })}
          {error?.message && (
            <Text style={[styles.error, { color: tokens.destructive }]}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
});
