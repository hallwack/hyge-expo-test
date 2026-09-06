import { Alert } from "@/components/ui/alert";
import { Theme } from "@/theme/tokens";
import { CheckCircle2Icon, InfoIcon } from "lucide-react-native";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

interface BookingAlertProps {
  showSuccess: boolean;
  errorMessage?: string | null;
  theme: Theme;
  onClearError?: () => void;
}

export default function BookingAlert({
  showSuccess,
  errorMessage,
  theme,
  onClearError,
}: BookingAlertProps) {
  if (!showSuccess && !errorMessage) return null;

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        onClearError?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, onClearError]);

  return (
    <View style={styles.floatingContainer}>
      {showSuccess && (
        <Alert
          variant="success"
          tone="soft"
          theme={theme}
          icon={<CheckCircle2Icon size={18} color="#10B981" />}
          title="Booking Cancelled"
          description="Your booking has been successfully cancelled."
        />
      )}

      {errorMessage && (
        <Alert
          variant="destructive"
          tone="soft"
          theme={theme}
          icon={<InfoIcon size={18} color="#EF4444" />}
          title="Failed to Cancel"
          description={errorMessage || "An error occurred."}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  floatingContainer: {
    position: "absolute",
    top: 65, // Disesuaikan agar muncul persis di bawah Header
    left: 16,
    right: 16,
    zIndex: 999, // Memastikan alert melayang di atas StatusFilter & List
    elevation: 5, // Efek bayangan untuk Android
  },
});
