import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../context/AuthContext";

// Design system colors
const colors = {
  bgApp: "#FAF9F6",
  bgCard: "#FFFFFF",
  primary: "#7FB77E",
  text: "#2F2F2F",
  textSecondary: "#4A4A4A",
  textMuted: "#8A8A8A",
  border: "rgba(0, 0, 0, 0.06)",
  signOut: "#D9534F",
};

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleSignOut = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  // User data
  const userName = user?.name || "Guest User";
  const userEmail = user?.email || "Not signed in";
  const hasUserInfo = user?.name && user?.email;
  
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.pageTitle}>Profile</Text>

        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userInitials}</Text>
          </View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
          
          {/* Edit Profile Button */}
          <Pressable
            style={({ pressed }) => [
              styles.editButton,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => router.push("/(tabs)/profile/edit-profile" as any)}
          >
            <Ionicons name="pencil" size={16} color={colors.primary} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>
        </View>

        {/* Setup Profile Card - Show if no user info */}
        {!hasUserInfo && (
          <Pressable
            style={({ pressed }) => [
              styles.setupCard,
              pressed && { opacity: 0.9 },
            ]}
            onPress={() => router.push("/(tabs)/profile/edit-profile" as any)}
          >
            <View style={styles.setupIcon}>
              <Ionicons name="person-add" size={24} color={colors.primary} />
            </View>
            <View style={styles.setupContent}>
              <Text style={styles.setupTitle}>Complete Your Profile</Text>
              <Text style={styles.setupSubtitle}>
                Add your name and email to personalize your experience
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.primary} />
          </Pressable>
        )}

        {/* Profile Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Information</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="person-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{userName}</Text>
            </View>
            <Pressable
              style={styles.editIconButton}
              onPress={() => router.push("/(tabs)/profile/edit-profile" as any)}
            >
              <Ionicons name="pencil-outline" size={18} color={colors.textMuted} />
            </Pressable>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="mail-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{userEmail}</Text>
            </View>
            <Pressable
              style={styles.editIconButton}
              onPress={() => router.push("/(tabs)/profile/edit-profile" as any)}
            >
              <Ionicons name="pencil-outline" size={18} color={colors.textMuted} />
            </Pressable>
          </View>
        </View>

        {/* Quick Actions Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          
          <Pressable
            style={({ pressed }) => [
              styles.settingsRow,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => router.push("/(tabs)/profile/appointments" as any)}
          >
            <View style={[styles.settingsIcon, { backgroundColor: `${colors.primary}15` }]}>
              <Ionicons name="calendar" size={20} color={colors.primary} />
            </View>
            <Text style={styles.settingsText}>My Appointments</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={({ pressed }) => [
              styles.settingsRow,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => router.push("/(tabs)/profile/favorites" as any)}
          >
            <View style={[styles.settingsIcon, { backgroundColor: "#FF6B6B15" }]}>
              <Ionicons name="heart" size={20} color="#FF6B6B" />
            </View>
            <Text style={styles.settingsText}>My Favorites</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={({ pressed }) => [
              styles.settingsRow,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => router.push("/(tabs)/profile/manage-children" as any)}
          >
            <View style={styles.settingsIcon}>
              <Ionicons name="people-outline" size={20} color={colors.textSecondary} />
            </View>
            <Text style={styles.settingsText}>Manage Children</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </Pressable>
        </View>

        {/* Settings Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Settings</Text>
          
          <Pressable
            style={({ pressed }) => [
              styles.settingsRow,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => router.push("/(tabs)/profile/settings" as any)}
          >
            <View style={styles.settingsIcon}>
              <Ionicons name="settings-outline" size={20} color={colors.textSecondary} />
            </View>
            <Text style={styles.settingsText}>App Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={({ pressed }) => [
              styles.settingsRow,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => router.push("/(tabs)/profile/help" as any)}
          >
            <View style={[styles.settingsIcon, { backgroundColor: "#5F8F8B15" }]}>
              <Ionicons name="help-circle-outline" size={20} color={colors.secondary} />
            </View>
            <Text style={styles.settingsText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </Pressable>
        </View>

        {/* Sign Out Button */}
        <Pressable
          onPress={handleSignOut}
          style={({ pressed }) => [
            styles.signOutButton,
            pressed && { opacity: 0.8 },
          ]}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.signOut} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgApp,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 24,
  },
  // Avatar Section
  avatarSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  userName: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 15,
    color: colors.textMuted,
    marginBottom: 12,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: `${colors.primary}15`,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  // Setup Card
  setupCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${colors.primary}10`,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
    borderStyle: "dashed",
  },
  setupIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: `${colors.primary}20`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  setupContent: {
    flex: 1,
  },
  setupTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  setupSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  // Card
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  // Info Row
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
  },
  editIconButton: {
    padding: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 14,
  },
  // Settings Row
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.bgApp,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  settingsText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  // Sign Out
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${colors.signOut}10`,
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
    marginTop: 8,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.signOut,
  },
});
