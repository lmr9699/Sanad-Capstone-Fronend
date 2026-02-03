import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Exact CSS values from styles.css
const colors = {
  bgApp: "#FAF6F2", // var(--bg-app)
  bgCard: "#FFFFFF", // var(--bg-card)
  primary: "#C89B8B", // var(--primary)
  primaryHover: "#B88A7A", // var(--primary-hover)
  primarySoft: "#F0E6E2", // var(--primary-soft)
  accentCare: "#7BA68A", // var(--accent-care)
  accentCareSoft: "#E8F0EB", // var(--accent-care-soft)
  accentLearn: "#9B8BA6", // var(--accent-learn)
  accentLearnSoft: "#F0EDF2", // var(--accent-learn-soft)
  text: "#3A3A3A", // var(--text)
  textSecondary: "#6B6B6B", // var(--text-secondary)
  textTertiary: "#9A9A9A", // var(--text-tertiary)
  border: "rgba(0, 0, 0, 0.05)", // var(--border)
  badge: "#D49A8A",
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function HomeScreen() {
  const router = useRouter();
  const greeting = getGreeting();
  // "Okay" is selected in the screenshot
  const [selectedMood, setSelectedMood] = React.useState<string | null>("okay");
  const [taskCompleted, setTaskCompleted] = React.useState(false);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar} />
            <View style={styles.headerText}>
              <Text style={styles.greeting}>{greeting}, Sarah</Text>
              <Text style={styles.headerSub}>How are you today?</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <Pressable
              onPress={() => router.push("/(auth)/login")}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {({ pressed }) => (
                <Text style={[styles.linkSignin, pressed && { opacity: 0.7 }]}>
                  Sign in
                </Text>
              )}
            </Pressable>
            <Pressable
              onPress={() => router.push("/(auth)/register")}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {({ pressed }) => (
                <Text style={[styles.linkCreate, pressed && { opacity: 0.7 }]}>
                  Create account
                </Text>
              )}
            </Pressable>
            <Pressable
              onPress={() => router.push("/(auth)/login")}
              style={styles.linkSignout}
            >
              {({ pressed }) => (
                <Text
                  style={[styles.linkSignoutText, pressed && { opacity: 0.7 }]}
                >
                  Sign out
                </Text>
              )}
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.notificationBtn,
                pressed && { opacity: 0.7 },
              ]}
              onPress={() => {
                Alert.alert("Notifications", "You have 2 new notifications");
              }}
            >
              <Ionicons
                name="notifications-outline"
                size={22}
                color={colors.text}
              />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Create account CTA */}
        <View style={styles.createCta}>
          <Text style={styles.createCtaText}>
            New to SANAD? Create your account and we'll support you step by
            step.
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.btnPrimary,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => router.push("/(auth)/register")}
          >
            <Text style={styles.btnPrimaryText}>Create account</Text>
          </Pressable>
        </View>

        {/* Mood Row */}
        <View style={styles.moodRow}>
          <Pressable
            style={({ pressed }) => [
              styles.moodBtn,
              selectedMood === "great" && styles.moodBtnActive,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() =>
              setSelectedMood(selectedMood === "great" ? null : "great")
            }
          >
            <Text
              style={[
                styles.moodBtnText,
                selectedMood === "great" && styles.moodBtnTextActive,
              ]}
            >
              □ Great
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.moodBtn,
              selectedMood === "okay" && styles.moodBtnActive,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() =>
              setSelectedMood(selectedMood === "okay" ? null : "okay")
            }
          >
            <Text
              style={[
                styles.moodBtnText,
                selectedMood === "okay" && styles.moodBtnTextActive,
              ]}
            >
              □ Okay
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.moodBtn,
              selectedMood === "tired" && styles.moodBtnActive,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() =>
              setSelectedMood(selectedMood === "tired" ? null : "tired")
            }
          >
            <Text
              style={[
                styles.moodBtnText,
                selectedMood === "tired" && styles.moodBtnTextActive,
              ]}
            >
              □ Tired
            </Text>
          </Pressable>
        </View>

        {/* Child profile card - MUST BE PRESSABLE */}
        <Pressable
          style={({ pressed }) => [
            styles.card,
            styles.profileCardContainer,
            pressed && { opacity: 0.7 },
          ]}
          onPress={() => {
            router.push("/(tabs)/profile/manage-children");
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View style={styles.profileCard} pointerEvents="box-none">
            <View style={styles.profileAvatar} pointerEvents="none" />
            <View style={styles.profileInfo} pointerEvents="none">
              <Text style={styles.profileInfoH3}>Omar</Text>
              <Text style={styles.profileInfoP}>7 years old</Text>
            </View>
            <View style={styles.dropdownBtn} pointerEvents="none">
              <Text style={styles.dropdownBtnText}>▾</Text>
            </View>
          </View>
        </Pressable>

        {/* This week's plan */}
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleH2}>This week's plan</Text>
          <Text style={styles.sectionTitleSpan}>Week 2</Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.card, pressed && { opacity: 0.8 }]}
          onPress={() => {
            router.push("/(tabs)/care-path");
          }}
        >
          <View style={styles.progressDots}>
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={[styles.progressDot, styles.progressDotPending]} />
          </View>
          <Text style={styles.planSummary}>
            3 of 4 tasks completed. Small steps count!
          </Text>
        </Pressable>

        {/* Today's focus */}
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleH2}>Today's focus</Text>
        </View>
        {/* Chart bars */}
        <View style={styles.chartCard}>
          <View style={styles.chartBars}>
            <View style={styles.chartBarContainer}>
              <View
                style={[styles.chartBar, styles.chartBarGreen, { height: 40 }]}
              />
              <Text style={styles.chartBarLabel}>H</Text>
            </View>
            <View style={styles.chartBarContainer}>
              <View
                style={[styles.chartBar, styles.chartBarBlue, { height: 60 }]}
              />
              <Text style={styles.chartBarLabel}>C</Text>
            </View>
            <View style={styles.chartBarContainer}>
              <View
                style={[styles.chartBar, styles.chartBarGreen, { height: 45 }]}
              />
              <Text style={styles.chartBarLabel}>D</Text>
            </View>
            <View style={styles.chartBarContainer}>
              <View
                style={[styles.chartBar, styles.chartBarBlue, { height: 70 }]}
              />
              <Text style={styles.chartBarLabel}>C</Text>
            </View>
            <View style={styles.chartBarContainer}>
              <View
                style={[styles.chartBar, styles.chartBarGreen, { height: 50 }]}
              />
              <Text style={styles.chartBarLabel}>P</Text>
            </View>
            <View style={styles.chartBarContainer}>
              <View
                style={[styles.chartBar, styles.chartBarBlue, { height: 55 }]}
              />
              <Text style={styles.chartBarLabel}>S</Text>
            </View>
            <View style={styles.chartBarContainer}>
              <View
                style={[styles.chartBar, styles.chartBarGreen, { height: 35 }]}
              />
              <Text style={styles.chartBarLabel}>S</Text>
            </View>
          </View>
        </View>
        <View style={styles.taskCard}>
          <Pressable
            style={({ pressed }) => [
              styles.taskCheckbox,
              taskCompleted && styles.taskCheckboxCompleted,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => setTaskCompleted(!taskCompleted)}
            hitSlop={{ top: 11, bottom: 11, left: 11, right: 11 }}
          >
            {taskCompleted && <Text style={styles.checkmark}>✓</Text>}
          </Pressable>
          <View style={styles.taskContent}>
            <Text style={styles.taskContentH4}>
              Practice communication cards
            </Text>
            <Text style={styles.taskContentP}>
              10 minutes with picture cards
            </Text>
            <Pressable
              style={({ pressed }) => [styles.why, pressed && { opacity: 0.7 }]}
              onPress={() => {
                Alert.alert(
                  "Why this matters",
                  "Regular practice helps build communication skills and confidence."
                );
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.whyText}>ℹ Why this matters</Text>
            </Pressable>
          </View>
        </View>

        {/* Recommended for you */}
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleH2}>Recommended for you</Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.recCard, pressed && { opacity: 0.8 }]}
          onPress={() => {
            Alert.alert("Article", "Building Social Confidence - 5 min read");
          }}
        >
          <View style={styles.recIcon} pointerEvents="none">
            <Text style={styles.recIconText}>▶</Text>
          </View>
          <View style={styles.recContent} pointerEvents="none">
            <Text style={styles.recContentH4}>Building Social Confidence</Text>
            <Text style={styles.recContentDesc}>
              Simple strategies for everyday interactions
            </Text>
            <Text style={styles.recMeta}>5 min read · by Dr. Amina Hassan</Text>
          </View>
        </Pressable>

        {/* Quick actions */}
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleH2}>Quick actions</Text>
        </View>
        <View style={styles.quickActions}>
          <Pressable
            style={({ pressed }) => [
              styles.quickAction,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => {
              Alert.alert("Upload Document", "Document upload feature");
            }}
          >
            <View
              style={[styles.iconWrap, styles.iconWrapPrimary]}
              pointerEvents="none"
            >
              <Text style={styles.iconWrapText}>↑</Text>
            </View>
            <Text style={styles.quickActionSpan} pointerEvents="none">
              Upload document
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.quickAction,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => router.push("/(tabs)/directory/centers")}
          >
            <View
              style={[styles.iconWrap, styles.iconWrapPrimary]}
              pointerEvents="none"
            >
              <Text style={styles.iconWrapText}>📍</Text>
            </View>
            <Text style={styles.quickActionSpan} pointerEvents="none">
              Find centers
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.quickAction,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => router.push("/(tabs)/community")}
          >
            <View
              style={[styles.iconWrap, styles.iconWrapGreen]}
              pointerEvents="none"
            >
              <Text style={styles.iconWrapText}>👥</Text>
            </View>
            <Text style={styles.quickActionSpan} pointerEvents="none">
              Ask community
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgApp, // #FAF6F2
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16, // padding: 20px 16px from .page
    paddingTop: 20,
    paddingBottom: 140, // Increased padding: 64px (tab bar) + safe area (up to 34px) + 24px (spacing) + 18px (extra safety)
    maxWidth: 420, // max-width: 420px
    alignSelf: "center",
    width: "100%",
  },
  // Header - exact CSS values
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24, // margin-bottom: 24px
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14, // gap: 14px
    flex: 1,
  },
  avatar: {
    width: 46, // 46px
    height: 46,
    borderRadius: 23, // 50%
    backgroundColor: colors.primarySoft, // gradient approximation
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 19.2, // 1.2rem = 19.2px - LARGE HEADER
    fontWeight: "600", // BOLD
    letterSpacing: -0.384, // -0.02em
    color: colors.text, // #3A3A3A
    lineHeight: 24.96, // 1.3
    margin: 0,
    marginBottom: 0,
  },
  headerSub: {
    fontSize: 14, // 0.875rem = 14px - SMALLER SUBTITLE
    fontWeight: "400", // REGULAR WEIGHT - CLEAR DISTINCTION
    color: colors.textSecondary, // #6B6B6B - LIGHTER COLOR
    lineHeight: 19.6, // 1.4
    marginTop: 4,
    marginBottom: 0,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12, // gap: 12px
  },
  linkSignin: {
    fontSize: 13.6, // 0.85rem = 13.6px
    color: colors.textSecondary,
  },
  linkCreate: {
    fontSize: 13.6,
    fontWeight: "600",
    color: colors.primary,
  },
  linkSignout: {
    opacity: 0,
    position: "absolute",
    left: -9999,
    width: 0,
    height: 0,
  },
  linkSignoutText: {
    fontSize: 13.6,
    fontWeight: "600",
    color: colors.primary,
  },
  notificationBtn: {
    width: 44, // 44px
    height: 44,
    borderRadius: 12, // 12px
    backgroundColor: colors.bgCard, // #FFFFFF
    borderWidth: 1.5,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  badge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: colors.badge,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  // Create account CTA
  createCta: {
    backgroundColor: colors.bgCard, // #FFFFFF
    borderRadius: 14, // var(--radius)
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  createCtaText: {
    marginBottom: 16,
    fontSize: 16, // 1rem - BODY TEXT SIZE
    fontWeight: "400", // REGULAR WEIGHT
    color: colors.text,
    textAlign: "center",
    lineHeight: 24, // 1.5 for readability
  },
  btnPrimary: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    backgroundColor: colors.primary,
    borderRadius: 24,
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  btnPrimaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  // Mood Row - exact CSS values
  moodRow: {
    flexDirection: "row",
    gap: 10, // gap: 10px
    marginBottom: 22, // margin-bottom: 22px
  },
  moodBtn: {
    flex: 1,
    paddingVertical: 14, // padding: 14px
    borderRadius: 20, // border-radius: 20px
    backgroundColor: colors.bgCard, // var(--bg-card)
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  moodBtnActive: {
    backgroundColor: colors.primary, // var(--primary)
    borderColor: colors.primary,
  },
  moodBtnText: {
    fontSize: 14.4, // 0.9rem = 14.4px
    fontWeight: "400",
    color: colors.text, // var(--text)
  },
  moodBtnTextActive: {
    color: "#FFFFFF",
  },
  // Card - exact CSS values
  card: {
    backgroundColor: colors.bgCard, // var(--bg-card)
    borderRadius: 14, // var(--radius)
    padding: 20, // padding: 20px
    marginBottom: 20, // Increased spacing below cards for better separation
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.border, // var(--border)
  },
  profileCardContainer: {
    // Make entire card pressable
  },
  // Profile card - exact CSS values
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14, // gap: 14px
  },
  profileAvatar: {
    width: 52, // 52px
    height: 52,
    borderRadius: 26, // 50%
    borderWidth: 2,
    borderColor: colors.accentCare, // var(--accent-care)
    backgroundColor: colors.accentCareSoft, // var(--accent-care-soft)
  },
  profileInfo: {
    flex: 1,
  },
  profileInfoH3: {
    fontSize: 16.8, // 1.05rem = 16.8px
    fontWeight: "600",
    color: colors.text,
    lineHeight: 21.84, // 1.3
    margin: 0,
  },
  profileInfoP: {
    fontSize: 14, // 0.875rem = 14px
    color: colors.textSecondary,
    lineHeight: 19.6, // 1.4
    marginTop: 4,
    marginBottom: 0,
  },
  dropdownBtn: {
    width: 40, // 40px
    height: 40,
    borderRadius: 10, // var(--radius-sm)
    backgroundColor: colors.bgApp, // var(--bg-app)
    borderWidth: 1.5,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownBtnText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  // Section title - exact CSS values
  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12, // margin-bottom: 12px - EXACT CSS VALUE
    marginTop: 20, // Increased spacing above sections for clear separation
  },
  sectionTitleH2: {
    fontSize: 16, // 1rem = 16px - SECTION TITLE SIZE
    fontWeight: "600", // BOLD - DISTINCT FROM BODY TEXT
    color: colors.text, // #3A3A3A - DARKER THAN BODY
    letterSpacing: -0.16, // -0.01em
    lineHeight: 20.8, // 1.3
    margin: 0,
  },
  sectionTitleSpan: {
    fontSize: 12.8, // 0.8rem = 12.8px
    color: colors.textTertiary, // var(--text-tertiary)
  },
  // Progress - exact CSS values
  progressDots: {
    flexDirection: "row",
    gap: 8, // gap: 8px
    marginBottom: 10, // margin-bottom: 10px
  },
  progressDot: {
    width: 10, // 10px
    height: 10,
    borderRadius: 5, // 50%
    backgroundColor: colors.accentCare, // var(--accent-care)
  },
  progressDotPending: {
    backgroundColor: colors.primarySoft, // var(--primary-soft)
  },
  planSummary: {
    fontSize: 14.4, // 0.9rem = 14.4px
    color: colors.textSecondary,
  },
  // Task card - exact CSS values
  taskCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16, // gap: 16px
    padding: 20, // padding: 20px
    backgroundColor: colors.bgCard,
    borderRadius: 14, // var(--radius)
    marginBottom: 20, // Increased spacing below task card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.border,
  },
  taskCheckbox: {
    width: 22, // 22px
    height: 22,
    borderWidth: 2,
    borderColor: colors.textTertiary, // var(--text-tertiary)
    borderRadius: 6, // border-radius: 6px
    marginTop: 2, // margin-top: 2px
    justifyContent: "center",
    alignItems: "center",
  },
  taskCheckboxCompleted: {
    backgroundColor: colors.accentCare,
    borderColor: colors.accentCare,
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  taskContent: {
    flex: 1,
  },
  taskContentH4: {
    fontSize: 16, // 1rem
    fontWeight: "600",
    color: colors.text,
    lineHeight: 22.4, // 1.4
    marginBottom: 6, // margin: 0 0 6px
    marginTop: 0,
  },
  taskContentP: {
    fontSize: 14, // 0.875rem
    color: colors.textSecondary,
    lineHeight: 21, // 1.5
    margin: 0,
  },
  why: {
    marginTop: 12, // margin-top: 12px
    flexDirection: "row",
    alignItems: "center",
    gap: 6, // gap: 6px
  },
  whyText: {
    fontSize: 12.8, // 0.8rem = 12.8px
    color: colors.textTertiary,
  },
  // Recommendation card - exact CSS values
  recCard: {
    flexDirection: "row",
    gap: 16, // gap: 16px
    padding: 20, // padding: 20px
    backgroundColor: colors.bgCard,
    borderRadius: 14, // var(--radius)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20, // Increased spacing below recommendation card
  },
  recIcon: {
    width: 48, // 48px
    height: 48,
    borderRadius: 10, // var(--radius-sm)
    backgroundColor: colors.accentLearnSoft, // var(--accent-learn-soft)
    justifyContent: "center",
    alignItems: "center",
  },
  recIconText: {
    fontSize: 19.2, // 1.2rem = 19.2px
    color: colors.accentLearn, // var(--accent-learn)
  },
  recContent: {
    flex: 1,
  },
  recContentH4: {
    fontSize: 16, // 1rem
    fontWeight: "600",
    color: colors.text,
    lineHeight: 22.4, // 1.4
    marginBottom: 6, // margin: 0 0 6px
    marginTop: 0,
  },
  recContentDesc: {
    fontSize: 13.6, // 0.85rem = 13.6px
    color: colors.textSecondary,
    marginBottom: 10, // margin-bottom: 10px
    lineHeight: 20.4, // 1.5
  },
  recMeta: {
    fontSize: 12, // 0.75rem = 12px
    color: colors.textTertiary, // var(--text-tertiary)
  },
  // Quick actions - exact CSS values
  quickActions: {
    flexDirection: "row",
    gap: 12, // gap: 12px
    marginBottom: 16,
  },
  quickAction: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: 14, // var(--radius)
    paddingVertical: 18, // padding: 18px 12px
    paddingHorizontal: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 10, // var(--radius-sm)
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapPrimary: {
    backgroundColor: colors.primarySoft,
  },
  iconWrapGreen: {
    backgroundColor: colors.accentCareSoft,
  },
  iconWrapText: {
    fontSize: 20,
  },
  quickActionSpan: {
    fontSize: 12.48, // 0.78rem = 12.48px
    fontWeight: "400",
    color: colors.text,
    lineHeight: 16.224,
    textAlign: "center",
  },
  // Chart card - exact CSS values
  chartCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 14, // var(--radius)
    padding: 20, // padding: 20px
    marginBottom: 20, // Spacing below chart card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 180, // Increased to accommodate bars (120px) + labels (~20px) + padding (40px) = ~180px
    overflow: "visible", // Allow labels to be visible
  },
  chartBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 8, // gap: 8px between bars
    minHeight: 120, // Changed from height to minHeight to accommodate labels
    paddingBottom: 20, // Space for labels below bars
  },
  chartBarContainer: {
    flex: 1,
    alignItems: "center",
  },
  chartBar: {
    width: "100%",
    borderRadius: 4, // Rounded top corners
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    minHeight: 20, // Minimum bar height
  },
  chartBarLabel: {
    fontSize: 12,
    color: colors.textTertiary,
    marginTop: 6,
    textAlign: "center",
  },
  chartBarGreen: {
    backgroundColor: colors.accentCare, // #7BA68A
  },
  chartBarBlue: {
    backgroundColor: colors.accentLearn, // #9B8BA6
  },
});
