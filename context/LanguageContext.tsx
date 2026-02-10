//import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { I18nManager } from "react-native";
import i18n, { setLocale, type Locale } from "../i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, options?: object) => string;
  isRTL: boolean;
}

const LANGUAGE_KEY = "@sanad_language";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Load saved language on mount
  useEffect(() => {
    setLocale("en");
    // Set RTL based on initial locale (English = LTR)
    I18nManager.forceRTL(false);
    I18nManager.allowRTL(true); // Allow RTL so it can be enabled when switching to Arabic
  }, []);

  // Update RTL when locale changes
  useEffect(() => {
    const isRTL = locale === "ar";
    I18nManager.forceRTL(isRTL);
    I18nManager.allowRTL(true);
  }, [locale]);

  const handleSetLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setLocale(newLocale);

    // Update RTL setting based on locale
    const isRTL = newLocale === "ar";
    I18nManager.forceRTL(isRTL);
    I18nManager.allowRTL(isRTL);

    // Note: RTL changes require app restart to take full effect
    // But this will work for the next render cycle
  };

  const t = (key: string, options?: object): string => {
    return i18n.t(key, options);
  };

  const isRTL = locale === "ar";

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale: handleSetLocale, t, isRTL }}
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
