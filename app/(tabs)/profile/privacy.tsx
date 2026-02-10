import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../../../context/LanguageContext";
import { useTheme } from "../../../context/ThemeContext";

export default function PrivacyScreen() {
  const router = useRouter();
  const { locale } = useLanguage();
  const { colors, isDark } = useTheme();
  const isArabic = locale === "ar";

  // Privacy settings state
  const [shareAnalytics, setShareAnalytics] = useState(true);
  const [showProfile, setShowProfile] = useState(true);
  const [allowMessages, setAllowMessages] = useState(true);

  const handleDeleteAccount = () => {
    Alert.alert(
      isArabic ? "حذف الحساب" : "Delete Account",
      isArabic 
        ? "هل أنت متأكد أنك تريد حذف حسابك؟ هذا الإجراء لا يمكن التراجع عنه."
        : "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: isArabic ? "إلغاء" : "Cancel",
          style: "cancel",
        },
        {
          text: isArabic ? "حذف" : "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              isArabic ? "تم" : "Done",
              isArabic 
                ? "تم إرسال طلب حذف الحساب. سيتم التواصل معك خلال 24 ساعة."
                : "Account deletion request submitted. You will be contacted within 24 hours."
            );
          },
        },
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert(
      isArabic ? "تصدير البيانات" : "Export Data",
      isArabic 
        ? "سيتم إرسال نسخة من بياناتك إلى بريدك الإلكتروني خلال 48 ساعة."
        : "A copy of your data will be sent to your email within 48 hours.",
      [
        {
          text: isArabic ? "إلغاء" : "Cancel",
          style: "cancel",
        },
        {
          text: isArabic ? "تصدير" : "Export",
          onPress: () => {
            Alert.alert(
              isArabic ? "تم" : "Done",
              isArabic 
                ? "تم إرسال طلب تصدير البيانات بنجاح."
                : "Data export request submitted successfully."
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
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.backgroundCard,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.06,
      shadowRadius: 8,
      elevation: 2,
    },
    settingItem: {
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      alignItems: "center" as const,
      backgroundColor: colors.backgroundCard,
      borderRadius: 16,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.06,
      shadowRadius: 8,
      elevation: 2,
    },
    infoCard: {
      flexDirection: "row" as const,
      alignItems: "flex-start" as const,
      gap: 12,
      backgroundColor: colors.primary + "15",
      borderRadius: 16,
      padding: 16,
      marginTop: 24,
      borderWidth: 1,
      borderColor: colors.primary + "30",
    },
  };

  return (
    <SafeAreaView style={dynamicStyles.wrapper} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={dynamicStyles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <Text style={[styles.title, { color: colors.text }]}>
            {isArabic ? "الخصوصية" : "Privacy"}
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Privacy Toggles Section */}
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>
          {isArabic ? "إعدادات الخصوصية" : "Privacy Settings"}
        </Text>
        <View style={styles.settingsList}>
          {/* Share Analytics */}
          <View style={dynamicStyles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: "#5F8F8B20" }]}>
                <Ionicons name="analytics" size={20} color="#5F8F8B" />
              </View>
              <View style={styles.settingTextWrap}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  {isArabic ? "مشاركة التحليلات" : "Share Analytics"}
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
                  {isArabic 
                    ? "ساعدنا على تحسين التطبيق" 
                    : "Help us improve the app"}
                </Text>
              </View>
            </View>
            <Switch
              value={shareAnalytics}
              onValueChange={setShareAnalytics}
              trackColor={{ false: "#E0E0E0", true: colors.primary + "60" }}
              thumbColor={shareAnalytics ? colors.primary : "#F4F4F4"}
            />
          </View>

          {/* Show Profile */}
          <View style={dynamicStyles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: "#7FB77E20" }]}>
                <Ionicons name="person" size={20} color="#7FB77E" />
              </View>
              <View style={styles.settingTextWrap}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  {isArabic ? "إظهار الملف الشخصي" : "Show Profile"}
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
                  {isArabic 
                    ? "السماح للآخرين برؤية ملفك" 
                    : "Allow others to see your profile"}
                </Text>
              </View>
            </View>
            <Switch
              value={showProfile}
              onValueChange={setShowProfile}
              trackColor={{ false: "#E0E0E0", true: colors.primary + "60" }}
              thumbColor={showProfile ? colors.primary : "#F4F4F4"}
            />
          </View>

          {/* Allow Messages */}
          <View style={dynamicStyles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: "#FF6B6B20" }]}>
                <Ionicons name="chatbubble" size={20} color="#FF6B6B" />
              </View>
              <View style={styles.settingTextWrap}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  {isArabic ? "السماح بالرسائل" : "Allow Messages"}
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
                  {isArabic 
                    ? "تلقي رسائل من المجتمع" 
                    : "Receive messages from community"}
                </Text>
              </View>
            </View>
            <Switch
              value={allowMessages}
              onValueChange={setAllowMessages}
              trackColor={{ false: "#E0E0E0", true: colors.primary + "60" }}
              thumbColor={allowMessages ? colors.primary : "#F4F4F4"}
            />
          </View>
        </View>

        {/* Data Section */}
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>
          {isArabic ? "بياناتك" : "Your Data"}
        </Text>
        <View style={styles.settingsList}>
          {/* Export Data */}
          <Pressable
            style={({ pressed }) => [
              dynamicStyles.settingItem,
              pressed && { opacity: 0.7 },
            ]}
            onPress={handleExportData}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: "#4A90D920" }]}>
                <Ionicons name="download" size={20} color="#4A90D9" />
              </View>
              <View style={styles.settingTextWrap}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  {isArabic ? "تصدير البيانات" : "Export My Data"}
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
                  {isArabic 
                    ? "تحميل نسخة من بياناتك" 
                    : "Download a copy of your data"}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </Pressable>

          {/* Delete Account */}
          <Pressable
            style={({ pressed }) => [
              dynamicStyles.settingItem,
              { borderWidth: 1, borderColor: "#FF4B4B20" },
              pressed && { opacity: 0.7 },
            ]}
            onPress={handleDeleteAccount}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: "#FF4B4B20" }]}>
                <Ionicons name="trash" size={20} color="#FF4B4B" />
              </View>
              <View style={styles.settingTextWrap}>
                <Text style={[styles.settingLabel, { color: "#FF4B4B" }]}>
                  {isArabic ? "حذف الحساب" : "Delete Account"}
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
                  {isArabic 
                    ? "حذف حسابك وجميع بياناتك" 
                    : "Permanently delete your account"}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FF4B4B" />
          </Pressable>
        </View>

        {/* Legal Section */}
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>
          {isArabic ? "القانونية" : "Legal"}
        </Text>
        <View style={styles.settingsList}>
          {/* Privacy Policy */}
          <Pressable
            style={({ pressed }) => [
              dynamicStyles.settingItem,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => Linking.openURL("https://sanad.app/privacy")}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: "#9B59B620" }]}>
                <Ionicons name="document-text" size={20} color="#9B59B6" />
              </View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                {isArabic ? "سياسة الخصوصية" : "Privacy Policy"}
              </Text>
            </View>
            <Ionicons name="open-outline" size={20} color={colors.textMuted} />
          </Pressable>

          {/* Terms of Service */}
          <Pressable
            style={({ pressed }) => [
              dynamicStyles.settingItem,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => Linking.openURL("https://sanad.app/terms")}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: "#E67E2220" }]}>
                <Ionicons name="shield-checkmark" size={20} color="#E67E22" />
              </View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                {isArabic ? "شروط الخدمة" : "Terms of Service"}
              </Text>
            </View>
            <Ionicons name="open-outline" size={20} color={colors.textMuted} />
          </Pressable>
        </View>

        {/* Info Card */}
        <View style={dynamicStyles.infoCard}>
          <Ionicons name="shield-checkmark" size={24} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.text }]}>
            {isArabic 
              ? "بياناتك محمية وآمنة. نحن لا نشارك معلوماتك الشخصية مع أطراف ثالثة دون موافقتك."
              : "Your data is protected and secure. We never share your personal information with third parties without your consent."}
          </Text>
        </View>
      </ScrollView>
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
  // Sections
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 16,
  },
  settingsList: {
    gap: 8,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  settingTextWrap: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingDescription: {
    fontSize: 13,
    marginTop: 2,
  },
  // Info Card
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },
});
