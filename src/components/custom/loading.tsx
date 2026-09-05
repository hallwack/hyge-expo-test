import { Tokens } from "@/theme/tokens";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface LoadingStateProps {
  tokens: Tokens;
}

export default function LoadingState({ tokens }: LoadingStateProps) {
  return (
    <View style={styles.stateContainer}>
      <ActivityIndicator size="large" color={tokens.primary} />
      <Text style={[styles.stateText, { color: tokens["muted-foreground"] }]}>
        Loading facilities...
      </Text>
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
  stateText: {
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
  },
});
