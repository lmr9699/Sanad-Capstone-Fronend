import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getChildren } from "../../../api/care-path.api";
import { useAuth } from "../../../context/AuthContext";
import { Child } from "../../../types/child.types";

// Reusable Card Component
const Card = ({ children, style }: { children: React.ReactNode; style?: any }) => (
  <View style={[styles.card, style]}>{children}</View>
);

// Section Header Row Component
const SectionHeaderRow = ({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    style={styles.sectionHeaderRow}
    onPress={onPress}
    disabled={!onPress}
  >
    <View style={styles.iconContainer}>
      <Ionicons name={icon as any} size={20} color="#D99E8E" />
    </View>
    <View style={styles.sectionHeaderText}>
      <Text style={styles.sectionHeaderTitle}>{title}</Text>
      {subtitle && <Text style={styles.sectionHeaderSubtitle}>{subtitle}</Text>}
    </View>
    {onPress && (
      <Ionicons name="chevron-forward" size={20} color="rgba(51,51,51,0.4)" />
    )}
  </TouchableOpacity>
);

// Menu Row Component
const MenuRow = ({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.menuRow} onPress={onPress}>
    <View style={styles.iconContainer}>
      <Ionicons name={icon as any} size={20} color="#D99E8E" />
    </View>
    <View style={styles.menuRowText}>
      <Text style={styles.menuRowTitle}>{title}</Text>
      <Text style={styles.menuRowSubtitle}>{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="rgba(51,51,51,0.4)" />
  </TouchableOpacity>
);

// Preference Row Component
const PreferenceRow = ({
  title,
  helper,
  value,
  onValueChange,
}: {
  title: string;
  helper: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) => (
  <View style={styles.preferenceRow}>
    <View style={styles.preferenceRowText}>
      <Text style={styles.preferenceRowTitle}>{title}</Text>
      <Text style={styles.preferenceRowHelper}>{helper}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: "#E0E0E0", true: "#D99E8E" }}
      thumbColor="#FFFFFF"
      ios_backgroundColor="#E0E0E0"
    />
  </View>
);

// Tab Bar Component
const TabBar = () => {
  const tabs = [
    { name: "Home", icon: "home-outline", active: false },
    { name: "Care Path", icon: "calendar-outline", active: false },
    { name: "Documents", icon: "document-text-outline", active: false },
    { name: "Community", icon: "people-outline", active: false },
    { name: "Profile", icon: "person-outline", active: true },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab, index) => (
        <TouchableOpacity key={index} style={styles.tab}>
          <Ionicons
            name={tab.icon as any}
            size={24}
            color={tab.active ? "#D99E8E" : "rgba(51,51,51,0.4)"}
          />
          <Text
            style={[
              styles.tabLabel,
              tab.active && styles.tabLabelActive,
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  // Fetch children data
  const { data: children } = useQuery<Child[]>({
    queryKey: ["children"],
    queryFn: getChildren,
  });

  // Notification preferences state
  const [weeklyReminders, setWeeklyReminders] = useState(true);
  const [documentAlerts, setDocumentAlerts] = useState(true);
  const [communityReplies, setCommunityReplies] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => {
            logout();
            router.replace("/(auth)/login");
          },
        },
      ]
    );
  };

  // Get first child for display (or use placeholder)
  const firstChild = children && children.length > 0 ? children[0] : null;
  const childInitial = firstChild
    ? firstChild.name.charAt(0).toUpperCase()
    : "A";

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Header */}
        <Text style={styles.pageTitle}>Profile</Text>

        {/* User Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.profileCardContent}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={32} color="#D99E8E" />
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {user?.name || "Sarah Al-Mansouri"}
              </Text>
              <Text style={styles.profileEmail}>
                {user?.email || "sarah.almansouri@email.com"}
              </Text>
            </View>
          </View>

          {/* Quote Box */}
          <View style={styles.quoteBox}>
            <View style={styles.quoteAccentBar} />
            <View style={styles.quoteContent}>
              <Text style={styles.quoteText}>
                You're doing your best. Every small step forward matters.
              </Text>
              <Ionicons name="heart" size={16} color="#D99E8E" />
            </View>
          </View>
        </Card>

        {/* Manage Children Card */}
        <Card>
          <SectionHeaderRow
            icon="people"
            title="Manage Children"
            subtitle="View and edit child profiles"
            onPress={() => router.push("/(tabs)/profile/manage-children")}
          />

          {firstChild && (
            <View style={styles.childRow}>
              <View style={styles.childAvatar}>
                <Text style={styles.childAvatarText}>{childInitial}</Text>
              </View>
              <Text style={styles.childText}>
                {firstChild.name} (Age {firstChild.age})
              </Text>
              <TouchableOpacity>
                <Text style={styles.editChildButton}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.addChildButton}
            onPress={() => router.push("/(tabs)/profile/manage-children")}
          >
            <Text style={styles.addChildButtonText}>+ Add another child</Text>
          </TouchableOpacity>
        </Card>

        {/* Notifications & Reminders Card */}
        <Card>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="notifications" size={20} color="#D99E8E" />
            </View>
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionHeaderTitle}>
                Notifications & Reminders
              </Text>
              <Text style={styles.sectionHeaderSubtitle}>
                Manage your notification preferences
              </Text>
            </View>
          </View>

          <PreferenceRow
            title="Weekly task reminders"
            helper="Get notified about upcoming care path tasks"
            value={weeklyReminders}
            onValueChange={setWeeklyReminders}
          />
          <PreferenceRow
            title="Document expiry alerts"
            helper="Reminders when documents need renewal"
            value={documentAlerts}
            onValueChange={setDocumentAlerts}
          />
          <PreferenceRow
            title="Community replies"
            helper="When someone replies to your posts"
            value={communityReplies}
            onValueChange={setCommunityReplies}
          />
        </Card>

        {/* Menu Items */}
        <Card>
          <MenuRow
            icon="bookmark"
            title="Saved Items"
            subtitle="Your saved content and posts"
            onPress={() => {}}
          />
        </Card>

        <Card>
          <MenuRow
            icon="help-circle"
            title="Help & Support"
            subtitle="Get help and contact support"
            onPress={() => {}}
          />
        </Card>

        <Card>
          <MenuRow
            icon="document-text"
            title="Community Guidelines"
            subtitle="Review community rules and policies"
            onPress={() => {}}
          />
        </Card>

        {/* Logout Button Card */}
        <Card>
          <TouchableOpacity
            style={styles.logoutButtonRow}
            onPress={handleLogout}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="log-out-outline" size={20} color="#D99E8E" />
            </View>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </Card>

        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Tab Bar */}
      <TabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6E4DE",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  profileCard: {
    marginBottom: 16,
  },
  profileCardContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F6E4DE",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(51,51,51,0.55)",
  },
  quoteBox: {
    flexDirection: "row",
    backgroundColor: "#F6E4DE",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  quoteAccentBar: {
    width: 4,
    backgroundColor: "#4CAF50",
    borderRadius: 2,
    marginRight: 12,
  },
  quoteContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quoteText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    color: "#333333",
    lineHeight: 20,
    marginRight: 8,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F6E4DE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sectionHeaderText: {
    flex: 1,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 2,
  },
  sectionHeaderSubtitle: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(51,51,51,0.55)",
  },
  childRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(51,51,51,0.08)",
    marginTop: 8,
    marginBottom: 12,
  },
  childAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D99E8E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  childAvatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  childText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
  },
  editChildButton: {
    fontSize: 14,
    fontWeight: "500",
    color: "#D99E8E",
  },
  addChildButton: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(51,51,51,0.3)",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  addChildButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
  },
  preferenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(51,51,51,0.08)",
    marginTop: 8,
  },
  preferenceRowText: {
    flex: 1,
    marginRight: 16,
  },
  preferenceRowTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 4,
  },
  preferenceRowHelper: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(51,51,51,0.55)",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuRowText: {
    flex: 1,
    marginLeft: 12,
  },
  menuRowTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 2,
  },
  menuRowSubtitle: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(51,51,51,0.55)",
  },
  logoutButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#D99E8E",
    marginLeft: 12,
  },
  bottomSpacing: {
    height: 80,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "rgba(51,51,51,0.08)",
    paddingTop: 8,
    paddingBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "500",
    color: "rgba(51,51,51,0.4)",
    marginTop: 4,
  },
  tabLabelActive: {
    color: "#D99E8E",
  },
});
