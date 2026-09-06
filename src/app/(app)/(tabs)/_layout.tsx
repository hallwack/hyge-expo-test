import { useTheme } from "@/theme/ThemeProvider";
import { Tabs } from "expo-router";
import { CalendarCheckIcon, HomeIcon } from "lucide-react-native";

export default function TabsLayout() {
  const { tokens } = useTheme();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: tokens.primary, tabBarInactiveTintColor: tokens["muted-foreground"] }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <CalendarCheckIcon size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
