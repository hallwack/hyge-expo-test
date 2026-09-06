import { View, Text, StyleSheet, Alert } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

export default function ProfileScreen() {
  const { tokens } = useTheme();

  const { user, setSignedOut } = useAuthStore();

  const handleLogout = () => {
    Alert.alert("Logout Confirmation", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          setSignedOut();
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: tokens.background }]}>
      <View
        style={[
          styles.profileCard,
          {
            backgroundColor: tokens.card,
            borderColor: tokens.border,
          },
        ]}
      >
        <Text style={[styles.label, { color: tokens["muted-foreground"] }]}>
          User Name
        </Text>
        <Text style={[styles.nameText, { color: tokens.foreground }]}>
          {user?.name ?? "Nama Pengguna"}
        </Text>
      </View>

      <Button
        variant="destructive"
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  profileCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
    marginTop: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logoutButton: {
    width: "100%",
    marginBottom: 16,
  },
});
