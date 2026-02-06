import { Stack } from "expo-router";

export default function CentersLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="center-details" />
    </Stack>
  );
}
