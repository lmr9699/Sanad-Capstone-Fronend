import { I18n } from "i18n-js";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

export type Locale = "en" | "ar";

const i18n = new I18n({
  en,
  ar,
});

// Set default locale to English
i18n.defaultLocale = "en";
i18n.enableFallback = true;
i18n.locale = "en";

export const setLocale = (locale: Locale) => {
  i18n.locale = locale;
};

export const getLocale = (): Locale => {
  return i18n.locale as Locale;
};

export default i18n;
