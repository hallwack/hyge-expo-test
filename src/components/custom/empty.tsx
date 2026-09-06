import { Tokens } from "@/theme/tokens";
import { SearchIcon } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../ui/button";

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
      <Button variant="default" size="sm" onPress={onRefresh}>
        Refresh
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
    marginBottom: 12,
    marginTop: 4,
    textAlign: "center",
  },
});
