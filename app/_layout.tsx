import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { I18nManager } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { LanguageProvider } from "../context/LanguageContext";
import { ThemeProvider } from "../context/ThemeContext";

// Force LTR layout - English only (MUST be set before any components render)
if (I18nManager.isRTL) {
  I18nManager.forceRTL(false);
  I18nManager.allowRTL(false);
  // Requires app restart to take effect, but ensures LTR on next launch
}
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <FavoritesProvider>
                <Stack screenOptions={{ headerShown: false }} />
              </FavoritesProvider>
            </AuthProvider>
          </QueryClientProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
