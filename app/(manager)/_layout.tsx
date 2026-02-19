import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ManagerLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          height: 70,
        },

        tabBarActiveTintColor: "#E53935",
        tabBarInactiveTintColor: "#999",

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600"
        }
      }}
    >

      {/* HOME */}
      <Tabs.Screen
        name="../(public)/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={26} color={color} />
          )
        }}
      />

      {/* DASHBOARD */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid" size={26} color={color} />
          )
        }}
      />

      {/* REQUEST */}
      <Tabs.Screen
        name="../(public)/request"
        options={{
          title: "Request",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="blood-bag" size={26} color={color} />
          )
        }}
      />

      {/* DONORS */}
      <Tabs.Screen
        name="donorList"
        options={{
          title: "Donors",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={26} color={color} />
          )
        }}
      />

      {/* SETTINGS */}
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={26} color={color} />
          )
        }}
      />

      {/* hidden screens */}
      <Tabs.Screen name="addDonor" options={{ href: null }} />
      <Tabs.Screen name="changePassword" options={{ href: null }} />
      <Tabs.Screen name="match" options={{ href: null }} />
      <Tabs.Screen name="requestDetails" options={{ href: null }} />
      <Tabs.Screen name="donorDetails" options={{ href: null }} />

    </Tabs>
  );
}