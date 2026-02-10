<<<<<<< HEAD
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
=======
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../../../context/LanguageContext";
import { ThemeMode, useTheme } from "../../../context/ThemeContext";
import { Locale } from "../../../i18n";

const ONBOARDING_KEY = "@sanad_onboarding_complete";

const LANGUAGES = [
  { id: "en" as Locale, label: "English", nativeLabel: "English", icon: "🇺🇸" },
  { id: "ar" as Locale, label: "Arabic", nativeLabel: "العربية", icon: "🇰🇼" },
];

const THEME_OPTIONS = [
  { id: "light" as ThemeMode, label: "Light", labelAr: "فاتح", icon: "sunny" as const },
  { id: "dark" as ThemeMode, label: "Dark", labelAr: "داكن", icon: "moon" as const },
  { id: "system" as ThemeMode, label: "System", labelAr: "النظام", icon: "phone-portrait" as const },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { locale, setLanguage, t } = useLanguage();
  const { mode, isDark, colors, setThemeMode } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);

  const isArabic = locale === "ar";
  const currentLanguage = LANGUAGES.find((l) => l.id === locale) || LANGUAGES[0];
  const currentTheme = THEME_OPTIONS.find((t) => t.id === mode) || THEME_OPTIONS[0];

  const handleLanguageSelect = async (newLocale: Locale) => {
    await setLanguage(newLocale);
    setShowLanguageModal(false);
  };

  const handleThemeSelect = async (newMode: ThemeMode) => {
    await setThemeMode(newMode);
    setShowThemeModal(false);
  };

  const handlePrivacyPress = () => {
    router.push({
      pathname: "/(tabs)/profile/privacy",
    } as any);
  };

  const handleResetOnboarding = () => {
    Alert.alert(
      isArabic ? "إعادة تعيين الترحيب" : "Reset Onboarding",
      isArabic 
        ? "سيظهر الترحيب عند إعادة تشغيل التطبيق. هل تريد المتابعة؟" 
        : "The welcome screens will show on next app restart. Continue?",
      [
        { text: isArabic ? "إلغاء" : "Cancel", style: "cancel" },
        {
          text: isArabic ? "إعادة تعيين" : "Reset",
          onPress: async () => {
            await AsyncStorage.removeItem(ONBOARDING_KEY);
            Alert.alert(
              isArabic ? "تم" : "Done",
              isArabic 
                ? "أعد تشغيل التطبيق لرؤية شاشات الترحيب" 
                : "Restart the app to see the welcome screens"
            );
          },
        },
      ]
    );
  };

  // Dynamic styles based on theme
  const dynamicStyles = {
    wrapper: {
      flex: 1,
      backgroundColor: colors.background,
    },
    settingItem: {
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      alignItems: "center" as const,
      backgroundColor: colors.backgroundCard,
      borderRadius: 16,
      padding: 16,
      shadowColor: isDark ? "#000" : "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.06,
      shadowRadius: 8,
      elevation: 2,
    },
    text: {
      color: colors.text,
    },
    textMuted: {
      color: colors.textMuted,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.backgroundCard,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    modalContent: {
      backgroundColor: colors.backgroundCard,
      borderRadius: 20,
      padding: 20,
      width: "100%" as const,
      maxWidth: 340,
    },
    modalOption: {
      backgroundColor: colors.background,
    },
>>>>>>> main
  };

  return (
    <SafeAreaView style={dynamicStyles.wrapper} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
<<<<<<< HEAD
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
=======
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={dynamicStyles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <Text style={[styles.title, dynamicStyles.text]}>
            {isArabic ? "الإعدادات" : "Settings"}
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Settings List */}
        <View style={styles.settingsList}>
          {/* Notifications */}
          <View style={dynamicStyles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: "#FF6B6B20" }]}>
                <Ionicons name="notifications" size={20} color="#FF6B6B" />
              </View>
              <Text style={[styles.settingLabel, dynamicStyles.text]}>
                {isArabic ? "الإشعارات" : "Notifications"}
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#E0E0E0", true: colors.primary + "60" }}
              thumbColor={notificationsEnabled ? colors.primary : "#F4F4F4"}
            />
          </View>

          {/* Dark Mode */}
          <Pressable
            style={({ pressed }) => [
              dynamicStyles.settingItem,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => setShowThemeModal(true)}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: isDark ? "#FFD93D20" : "#2F2F2F20" }]}>
                <Ionicons 
                  name={isDark ? "moon" : "sunny"} 
                  size={20} 
                  color={isDark ? "#FFD93D" : "#2F2F2F"} 
                />
              </View>
              <Text style={[styles.settingLabel, dynamicStyles.text]}>
                {isArabic ? "المظهر" : "Appearance"}
              </Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, dynamicStyles.textMuted]}>
                {isArabic ? currentTheme.labelAr : currentTheme.label}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </View>
          </Pressable>

          {/* Language */}
          <Pressable
            style={({ pressed }) => [
              dynamicStyles.settingItem,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => setShowLanguageModal(true)}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: "#5F8F8B20" }]}>
                <Ionicons name="language" size={20} color="#5F8F8B" />
              </View>
              <Text style={[styles.settingLabel, dynamicStyles.text]}>
                {isArabic ? "اللغة" : "Language"}
              </Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, dynamicStyles.textMuted]}>
                {currentLanguage.nativeLabel}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </View>
          </Pressable>

          {/* Privacy */}
          <Pressable
            style={({ pressed }) => [
              dynamicStyles.settingItem,
              pressed && { opacity: 0.7 },
            ]}
            onPress={handlePrivacyPress}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: "#7FB77E20" }]}>
                <Ionicons name="shield-checkmark" size={20} color="#7FB77E" />
              </View>
              <Text style={[styles.settingLabel, dynamicStyles.text]}>
                {isArabic ? "الخصوصية" : "Privacy"}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </Pressable>

          {/* About */}
          <Pressable
            style={({ pressed }) => [
              dynamicStyles.settingItem,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => {
              Alert.alert(
                "SANAD",
                isArabic 
                  ? "سند - تطبيق دعم العائلات\n\nالإصدار 1.0.0\n\nصُنع بحب في الكويت 🇰🇼"
                  : "SANAD - Family Support App\n\nVersion 1.0.0\n\nMade with love in Kuwait 🇰🇼"
              );
            }}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: "#9B59B620" }]}>
                <Ionicons name="information-circle" size={20} color="#9B59B6" />
              </View>
              <Text style={[styles.settingLabel, dynamicStyles.text]}>
                {isArabic ? "حول التطبيق" : "About"}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </Pressable>

          {/* Reset Onboarding - For Testing */}
          <Pressable
            style={({ pressed }) => [
              dynamicStyles.settingItem,
              pressed && { opacity: 0.7 },
              { marginTop: 12 },
            ]}
            onPress={handleResetOnboarding}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: "#E8783020" }]}>
                <Ionicons name="refresh" size={20} color="#E87830" />
              </View>
              <Text style={[styles.settingLabel, dynamicStyles.text]}>
                {isArabic ? "إعادة عرض الترحيب" : "Show Welcome Again"}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </Pressable>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={[styles.appInfoText, dynamicStyles.textMuted]}>SANAD v1.0.0</Text>
          <Text style={[styles.appInfoSubtext, dynamicStyles.textMuted]}>
            {isArabic ? "صُنع بحب في الكويت 🇰🇼" : "Made with ❤️ in Kuwait"}
          </Text>
        </View>
>>>>>>> main
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowLanguageModal(false)}
        >
          <Pressable style={dynamicStyles.modalContent} onPress={(e) => e.stopPropagation()}>
            <Text style={[styles.modalTitle, dynamicStyles.text]}>
              {isArabic ? "اختر اللغة" : "Select Language"}
            </Text>
            
            {LANGUAGES.map((lang) => (
              <Pressable
                key={lang.id}
                style={({ pressed }) => [
                  styles.languageOption,
                  dynamicStyles.modalOption,
                  locale === lang.id && { 
                    backgroundColor: colors.primary + "15",
                    borderWidth: 1,
                    borderColor: colors.primary + "40",
                  },
                  pressed && { opacity: 0.7 },
                ]}
                onPress={() => handleLanguageSelect(lang.id)}
              >
                <Text style={styles.languageFlag}>{lang.icon}</Text>
                <View style={styles.languageLabels}>
                  <Text style={[
                    styles.languageLabel,
                    dynamicStyles.text,
                    locale === lang.id && { color: colors.primary },
                  ]}>
                    {lang.nativeLabel}
                  </Text>
                  <Text style={[styles.languageSublabel, dynamicStyles.textMuted]}>
                    {lang.label}
                  </Text>
                </View>
                {locale === lang.id && (
                  <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                )}
              </Pressable>
            ))}

            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setShowLanguageModal(false)}
            >
              <Text style={[styles.modalCloseText, dynamicStyles.textMuted]}>
                {isArabic ? "إغلاق" : "Close"}
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Theme Selection Modal */}
      <Modal
        visible={showThemeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowThemeModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowThemeModal(false)}
        >
          <Pressable style={dynamicStyles.modalContent} onPress={(e) => e.stopPropagation()}>
            <Text style={[styles.modalTitle, dynamicStyles.text]}>
              {isArabic ? "اختر المظهر" : "Select Appearance"}
            </Text>
            
            {THEME_OPTIONS.map((theme) => (
              <Pressable
                key={theme.id}
                style={({ pressed }) => [
                  styles.languageOption,
                  dynamicStyles.modalOption,
                  mode === theme.id && { 
                    backgroundColor: colors.primary + "15",
                    borderWidth: 1,
                    borderColor: colors.primary + "40",
                  },
                  pressed && { opacity: 0.7 },
                ]}
                onPress={() => handleThemeSelect(theme.id)}
              >
                <View style={[styles.themeIconWrap, { backgroundColor: colors.primary + "20" }]}>
                  <Ionicons name={theme.icon} size={22} color={colors.primary} />
                </View>
                <View style={styles.languageLabels}>
                  <Text style={[
                    styles.languageLabel,
                    dynamicStyles.text,
                    mode === theme.id && { color: colors.primary },
                  ]}>
                    {isArabic ? theme.labelAr : theme.label}
                  </Text>
                </View>
                {mode === theme.id && (
                  <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                )}
              </Pressable>
            ))}

            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setShowThemeModal(false)}
            >
              <Text style={[styles.modalCloseText, dynamicStyles.textMuted]}>
                {isArabic ? "إغلاق" : "Close"}
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 100,
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  headerSpacer: {
    width: 40,
  },
  // Settings List
  settingsList: {
    gap: 12,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  settingValue: {
    fontSize: 16,
  },
  // App Info
  appInfo: {
    marginTop: 32,
    alignItems: "center",
    paddingVertical: 20,
  },
  appInfoText: {
    fontSize: 13,
    fontWeight: "500",
  },
  appInfoSubtext: {
    fontSize: 13,
    marginTop: 4,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    marginBottom: 8,
    gap: 12,
  },
  languageFlag: {
    fontSize: 28,
  },
  languageLabels: {
    flex: 1,
  },
  languageLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  languageSublabel: {
    fontSize: 13,
  },
  themeIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  modalCloseButton: {
    marginTop: 8,
    padding: 12,
    alignItems: "center",
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: "500",
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
