import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/theme/ThemeProvider";
import { useRouter } from "expo-router";
import { ChevronLeftIcon } from "lucide-react-native";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/features/users/hooks";

export default function Register() {
  const router = useRouter();
  const { tokens } = useTheme();
  const { mutate, isPending } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const backButtonHandler = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: tokens.background }]}
    >
      <TouchableOpacity
        onPress={backButtonHandler}
        style={[styles.backButton, { backgroundColor: tokens.secondary }]}
      >
        <ChevronLeftIcon
          style={{ borderColor: tokens["secondary-foreground"] }}
        />
      </TouchableOpacity>

      <Text style={[styles.title, { color: tokens.foreground }]}>Register</Text>
      <Text style={[styles.subtitle, { color: tokens["muted-foreground"] }]}>
        Please fill in the form below to create an account.
      </Text>

      <FormField name="name" control={control} label="Name">
        {({ onChange, onBlur, value, ref }) => (
          <Input
            ref={ref}
            placeholder="Your Name"
            keyboardType="default"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.name?.message}
          />
        )}
      </FormField>

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
        Register
      </Button>

      <Button
        variant="ghost"
        size="default"
        onPress={() => router.push("/login")}
        style={{ marginTop: 8 }}
      >
        Already have an account? Login
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
  backButton: {
    position: "absolute",
    top: 60,
    left: 24,
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
