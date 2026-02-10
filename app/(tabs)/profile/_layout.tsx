import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="manage-children" />
      <Stack.Screen name="add-child" />
      <Stack.Screen name="appointments" />
      <Stack.Screen name="favorites" />
      <Stack.Screen name="help" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="privacy" />
    </Stack>
  );
}
