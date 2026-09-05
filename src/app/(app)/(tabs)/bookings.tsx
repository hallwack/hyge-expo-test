import { Text, View, StyleSheet } from "react-native";

export default function Bookings() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Bookings</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
