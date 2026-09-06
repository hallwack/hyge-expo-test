import { useTheme } from "@/theme/ThemeProvider";
import { ChevronLeftIcon } from "lucide-react-native";
import { Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BackButton({ onPress }: { onPress: () => void }) {
  const { tokens } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      style={[styles.backButton, { top: Math.max(insets.top, 12) }]}
      onPress={onPress}
      hitSlop={12}
    >
      <ChevronLeftIcon size={22} color={tokens["primary-foreground"]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
});
