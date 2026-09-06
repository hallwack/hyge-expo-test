import { Tokens } from "@/theme/tokens";
import { TriangleAlertIcon } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../ui/button";

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
      <Button variant="default" size="sm" onPress={onRetry}>
        Try Again
      </Button>
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
    marginBottom: 12,
    textAlign: "center",
  },
});
