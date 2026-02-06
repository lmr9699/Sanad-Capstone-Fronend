import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { I18nManager } from "react-native";
import i18n, { Locale, setLocale } from "../i18n";

interface LanguageContextType {
  locale: Locale;
  setLanguage: (locale: Locale) => Promise<void>;
  t: (key: string, options?: object) => string;
  isRTL: boolean;
}

const LANGUAGE_KEY = "@sanad_language";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [isRTL, setIsRTL] = useState(false);

  // Load saved language on mount
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLocale = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (savedLocale === "ar" || savedLocale === "en") {
          setLocaleState(savedLocale);
          setLocale(savedLocale);
          setIsRTL(savedLocale === "ar");
        }
      } catch (error) {
        console.log("Error loading language:", error);
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (newLocale: Locale) => {
    try {
      // Save to storage
      await AsyncStorage.setItem(LANGUAGE_KEY, newLocale);
      
      // Update state
      setLocaleState(newLocale);
      setLocale(newLocale);
      
      // Update RTL
      const shouldBeRTL = newLocale === "ar";
      setIsRTL(shouldBeRTL);
      
      // Note: Full RTL support would require I18nManager.forceRTL(shouldBeRTL)
      // and app restart, but for this demo we'll just update the locale
    } catch (error) {
      console.log("Error saving language:", error);
    }
  };

  const t = (key: string, options?: object): string => {
    return i18n.t(key, options);
  };

  return (
    <LanguageContext.Provider
      value={{ locale, setLanguage, t, isRTL }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
