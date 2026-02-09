import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  cardShadow,
  colors,
  radius,
  sectionSpacing,
  spacing,
  typography,
} from "../../../theme";
import { useLanguage } from "../../../context/LanguageContext";

export default function SettingsScreen() {
  const { locale, setLocale, t } = useLanguage();

  const handleLanguageChange = (newLocale: "en" | "ar") => {
    setLocale(newLocale);
  };

  return (
    <SafeAreaView style={styles.wrapper} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>{t("profile.settings")}</Text>
        <TouchableOpacity style={styles.settingItem} activeOpacity={0.85}>
          <Text style={styles.settingLabel}>{t("profile.notifications")}</Text>
          <Text style={styles.settingValue}>{t("common.on")}</Text>
        </TouchableOpacity>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>{t("profile.language")}</Text>
          <View style={styles.languageButtons}>
            <TouchableOpacity
              style={[
                styles.languageButton,
                locale === "ar" && styles.languageButtonActive,
              ]}
              onPress={() => handleLanguageChange("ar")}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.languageButtonText,
                  locale === "ar" && styles.languageButtonTextActive,
                ]}
              >
                AR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.languageButton,
                locale === "en" && styles.languageButtonActive,
              ]}
              onPress={() => handleLanguageChange("en")}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.languageButtonText,
                  locale === "en" && styles.languageButtonTextActive,
                ]}
              >
                EN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.settingItem} activeOpacity={0.85}>
          <Text style={styles.settingLabel}>{t("profile.privacy")}</Text>
          <Text style={styles.settingValue}>→</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: 100,
  },
  title: {
    fontSize: typography.title,
    lineHeight: typography.h1LineHeight,
    fontWeight: typography.weightBold,
    color: colors.text,
    marginBottom: sectionSpacing.default,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.backgroundCard,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...cardShadow,
  },
  settingLabel: {
    fontSize: typography.body,
    fontWeight: typography.weightMedium,
    color: colors.text,
  },
  settingValue: {
    fontSize: typography.body,
    color: colors.textMuted,
  },
  languageButtons: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  languageButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSecondary,
  },
  languageButtonActive: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}15`,
  },
  languageButtonText: {
    fontSize: typography.body,
    fontWeight: typography.weightSemibold,
    color: colors.textMuted,
  },
  languageButtonTextActive: {
    color: colors.primary,
  },
});
