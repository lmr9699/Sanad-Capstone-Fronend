import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";

/**
 * Root index: redirect to Home tab
 */
export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Or a loading screen
  }

  if (!user) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return <Redirect href="/(tabs)/plan" />;
}
