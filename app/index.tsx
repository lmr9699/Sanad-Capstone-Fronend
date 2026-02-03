import { Redirect } from "expo-router";

/**
 * Root index: redirect to Home tab
 */
export default function Index() {
  return <Redirect href="/(tabs)" />;
}
