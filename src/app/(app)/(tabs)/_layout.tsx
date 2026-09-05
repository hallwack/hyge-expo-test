import { Tabs } from "expo-router";
import { CalendarCheckIcon, HomeIcon } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#e91e63" }}>
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
          tabBarIcon: ({ color }) => (
            <CalendarCheckIcon size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
