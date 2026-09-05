import { Tokens } from "@/theme/tokens";
import { TriangleAlertIcon } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
  tokens: Tokens;
}

export default function ErrorState({
  error,
  onRetry,
  tokens,
}: ErrorStateProps) {
  return (
    <View style={styles.stateContainer}>
      <TriangleAlertIcon size={64} />
      <Text style={[styles.stateTitle, { color: tokens.foreground }]}>
        Something went wrong
      </Text>
      <Text style={[styles.stateText, { color: tokens["muted-foreground"] }]}>
        {error}
      </Text>
      <TouchableOpacity
        onPress={onRetry}
        style={[styles.retryButton, { backgroundColor: tokens.destructive }]}
      >
        <Text
          style={[
            styles.retryButtonText,
            { color: tokens["destructive-foreground"] },
          ]}
        >
          Try Again
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  stateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  stateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
  stateText: {
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    fontWeight: "600",
  },
});
