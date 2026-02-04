import { Redirect } from "expo-router";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

/**
 * Root index: redirect to Home tab
 */
export default function Index() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/(tabs)/directory/centers" as any);
      } else {
        router.replace("/(tabs)");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return null; // Or a loading screen
  }

  return null;
}
