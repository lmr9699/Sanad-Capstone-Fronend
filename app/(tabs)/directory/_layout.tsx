import { Stack, useRouter } from "expo-router";
import { colors, typography } from "../../../theme";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/**
 * Directory Stack Layout — Directory screens with back button
 */
export default function DirectoryLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.primary,
        headerShadowVisible: false,
        headerBackTitle: "",
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="centers"
        options={{
          headerShown: true,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.push("/(tabs)")}>
                <Ionicons name="arrow-back" size={24} color={colors.text} />
              </TouchableOpacity>
            );
          },
          headerTitle: "Centers",
          headerTitleStyle: {
            fontSize: typography.h2,
            fontWeight: typography.weightBold,
            color: colors.text,
          },
        }}
      />
      <Stack.Screen
        name="professionals"
        options={{
          headerShown: true,
          headerTitle: "Professionals",
          headerTitleStyle: {
            fontSize: typography.h2,
            fontWeight: typography.weightBold,
            color: colors.text,
          },
        }}
      />
      <Stack.Screen
        name="center-details"
        options={{
          headerShown: false, // Custom header is implemented in the component
        }}
      />
      <Stack.Screen
        name="professional-details"
        options={{
          headerShown: true,
          headerTitle: "Professional Details",
          headerTitleStyle: {
            fontSize: typography.h2,
            fontWeight: typography.weightBold,
            color: colors.text,
          },
        }}
      />
      <Stack.Screen
        name="helpCenter"
        options={{
          headerShown: false, // We have a custom header in the component
        }}
      />
      <Stack.Screen
        name="SerivceProviders"
        options={{
          headerShown: false, // We have a custom header in the component
        }}
      />
    </Stack>
  );
}
