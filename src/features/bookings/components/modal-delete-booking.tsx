import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { Alert } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react-native";
import { useTheme } from "@/theme/ThemeProvider";

interface CancelBookingModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function CancelBookingModal({
  visible,
  onClose,
  onConfirm,
  isLoading,
}: CancelBookingModalProps) {
  const { theme, tokens } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: tokens.card,
              borderColor: tokens.border,
            },
          ]}
        >
          <Alert
            variant="destructive"
            tone="soft"
            theme={theme}
            icon={<AlertTriangleIcon size={20} color="#EF4444" />}
            title="Batalkan Booking?"
            description="Tindakan ini akan membatalkan reservasi Anda secara permanen dan tidak dapat dipulihkan."
          />

          <View style={styles.actionRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onClose}
              disabled={isLoading}
              style={[
                styles.button,
                {
                  backgroundColor: tokens.muted,
                  borderColor: tokens.border,
                  borderWidth: 1,
                },
              ]}
            >
              <Text style={[styles.buttonText, { color: tokens.foreground }]}>
                Batal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onConfirm}
              disabled={isLoading}
              style={[
                styles.button,
                { backgroundColor: tokens.destructive ?? "#EF4444" },
              ]}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>
                  Ya, Batalkan
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  container: {
    width: "100%",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    gap: 16,
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
