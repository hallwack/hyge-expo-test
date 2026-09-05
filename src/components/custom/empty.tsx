import { Tokens } from "@/theme/tokens";
import { SearchIcon } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface EmptyStateProps {
  onRefresh: () => void;
  tokens: Tokens;
}

export default function EmptyState({ onRefresh, tokens }: EmptyStateProps) {
  return (
    <View style={styles.stateContainer}>
      <SearchIcon size={64} color={tokens["muted-foreground"]} />
      <Text style={[styles.stateTitle, { color: tokens.foreground }]}>
        No facilities found
      </Text>
      <Text style={[styles.stateText, { color: tokens["muted-foreground"] }]}>
        Try adjusting your filters
      </Text>
      <TouchableOpacity
        onPress={onRefresh}
        style={[styles.refreshButton, { backgroundColor: tokens.primary }]}
      >
        <Text
          style={[
            styles.refreshButtonText,
            { color: tokens["primary-foreground"] },
          ]}
        >
          Refresh
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
  refreshButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  refreshButtonText: {
    fontWeight: "600",
  },
});
