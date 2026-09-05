import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { loginSchema, LoginSchema } from "@/schemas/auth.schema";
import { useTheme } from "@/theme/ThemeProvider";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { MoonIcon, SunIcon } from "lucide-react-native";
import { useLogin } from "@/features/users/hooks";

export default function Login() {
  const router = useRouter();
  const { theme, tokens, toggleTheme } = useTheme();
  const { mutate, isPending } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: tokens.background }]}
    >
      <TouchableOpacity
        onPress={toggleTheme}
        style={[styles.themeToggle, { backgroundColor: tokens.secondary }]}
      >
        <Text style={{ color: tokens["secondary-foreground"] }}>
          {theme === "light" ? (
            <MoonIcon color={tokens["secondary-foreground"]} />
          ) : (
            <SunIcon color={tokens["secondary-foreground"]} />
          )}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: tokens.foreground }]}>
        Welcome Back
      </Text>
      <Text style={[styles.subtitle, { color: tokens["muted-foreground"] }]}>
        Login to continue
      </Text>

      <FormField name="email" control={control} label="Email">
        {({ onChange, onBlur, value, ref }) => (
          <Input
            ref={ref}
            placeholder="your@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.email?.message}
          />
        )}
      </FormField>

      <FormField name="password" control={control} label="Password">
        {({ onChange, onBlur, value, ref }) => (
          <Input
            ref={ref}
            placeholder="••••••••"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password?.message}
          />
        )}
      </FormField>

      <Button
        variant="default"
        size="default"
        onPress={handleSubmit((value) => mutate(value))}
        isLoading={isPending}
        style={{ marginTop: 8 }}
      >
        Login
      </Button>

      <Button
        variant="ghost"
        size="default"
        onPress={() => router.push("/(app)/(tabs)")}
        style={{ marginTop: 8 }}
      >
        Don't have an account? Register
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  themeToggle: {
    position: "absolute",
    top: 60,
    right: 24,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
});
