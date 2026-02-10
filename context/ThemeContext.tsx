import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeColors {
  // Backgrounds
  bgApp: string;
  bgCard: string;
  background: string;
  backgroundCard: string;
  // Text
  text: string;
  textSecondary: string;
  textMuted: string;
  // Primary
  primary: string;
  primaryLight: string;
  // Others
  border: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
}

const lightColors: ThemeColors = {
  bgApp: "#FAF9F6",
  bgCard: "#FFFFFF",
  background: "#FAF9F6",
  backgroundCard: "#FFFFFF",
  text: "#2F2F2F",
  textSecondary: "#5F5F5F",
  textMuted: "#8F8F8F",
  primary: "#7FB77E",
  primaryLight: "#7FB77E20",
  border: "#E8E8E8",
  accent: "#5F8F8B",
  success: "#7FB77E",
  warning: "#F5A623",
  error: "#FF4B4B",
};

const darkColors: ThemeColors = {
  bgApp: "#1A1A1A",
  bgCard: "#2A2A2A",
  background: "#1A1A1A",
  backgroundCard: "#2A2A2A",
  text: "#FFFFFF",
  textSecondary: "#CCCCCC",
  textMuted: "#888888",
  primary: "#7FB77E",
  primaryLight: "#7FB77E30",
  border: "#3A3A3A",
  accent: "#5F8F8B",
  success: "#7FB77E",
  warning: "#F5A623",
  error: "#FF4B4B",
};

interface ThemeContextType {
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
}

const THEME_KEY = "@sanad_theme";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>("light");

  // Calculate if dark mode should be active
  const isDark = mode === "dark" || (mode === "system" && systemColorScheme === "dark");
  const colors = isDark ? darkColors : lightColors;

  // Load saved theme on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
          setMode(savedTheme);
        }
      } catch (error) {
        console.log("Error loading theme:", error);
      }
    };
    loadTheme();
  }, []);

  const setThemeMode = async (newMode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, newMode);
      setMode(newMode);
    } catch (error) {
      console.log("Error saving theme:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ mode, isDark, colors, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
