import { Tokens } from "@/theme/tokens";
import { UserIcon } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  userName: string;
  onProfilePress?: () => void;
  tokens: Tokens;
}

export default function Header({
  userName,
  onProfilePress,
  tokens,
}: HeaderProps) {
  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: tokens.card,
          borderBottomColor: tokens.border,
        },
      ]}
    >
      <View style={styles.headerLeft}>
        <Text style={[styles.greeting, { color: tokens["muted-foreground"] }]}>
          Welcome, {userName}!
        </Text>
        <Text style={[styles.appName, { color: tokens.primary }]}>Courtly</Text>
      </View>
      {onProfilePress && (
        <TouchableOpacity
          onPress={onProfilePress}
          style={[styles.profileButton, { backgroundColor: tokens.muted }]}
        >
          <UserIcon size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profileIcon: {
    fontSize: 20,
  },
});
