import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Design system colors
const colors = {
  bgCard: "#FFFFFF",
  primary: "#C89B8B",
  textTertiary: "#ADADAD",
  border: "rgba(0, 0, 0, 0.08)",
};

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  // Tab bar height calculation
  const tabBarHeight = 56 + Math.max(insets.bottom, 8);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
          marginTop: -2,
          marginBottom: Platform.OS === "ios" ? 0 : 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        tabBarStyle: {
          backgroundColor: colors.bgCard,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.border,
          height: tabBarHeight,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 4,
          paddingHorizontal: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: Platform.OS === "android" ? 8 : 0,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      {/* Main tabs - 4 tabs evenly distributed */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="care-path"
        options={{
          title: "Care Path",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="documents"
        options={{
          title: "Documents",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "document-text" : "document-text-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* Hidden routes - accessible via navigation but not visible in tab bar */}
      <Tabs.Screen name="community" options={{ href: null }} />
      <Tabs.Screen name="directory" options={{ href: null }} />
      <Tabs.Screen name="plan" options={{ href: null }} />
      <Tabs.Screen name="resources" options={{ href: null }} />
    </Tabs>
  );
}
