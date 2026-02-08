import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Design system colors
const colors = {
  bgApp: "#FAF9F6",
  bgCard: "#FFFFFF",
  primary: "#7FB77E",
  primaryLight: "#E8F5E8",
  secondary: "#5F8F8B",
  text: "#2F2F2F",
  textSecondary: "#4A4A4A",
  textMuted: "#8A8A8A",
  border: "rgba(0, 0, 0, 0.06)",
};

// Mock centers data
const CENTERS = [
  {
    id: "1",
    name: "Kuwait Autism Center",
    type: "Rehabilitation",
    location: "Sharq, Capital",
    rating: 4.9,
    services: ["Speech Therapy", "Behavioral Therapy", "Occupational Therapy"],
  },
  {
    id: "2",
    name: "Al-Wafaa Rehabilitation Center",
    type: "Rehabilitation",
    location: "Salmiya, Hawalli",
    rating: 4.8,
    services: ["Occupational Therapy", "Physical Therapy", "Speech Therapy"],
  },
  {
    id: "3",
    name: "Hope Therapy Clinic",
    type: "Clinic",
    location: "Mirqab, Capital",
    rating: 4.7,
    services: ["Behavioral Therapy", "Family Counseling"],
  },
];

// Mock professionals data
const PROFESSIONALS = [
  {
    id: "1",
    name: "Dr. Sarah Al-Mutairi",
    specialty: "Speech Therapist",
    experience: "10 years",
    rating: 4.9,
    color: "#7FB77E",
  },
  {
    id: "3",
    name: "Dr. Fatima Al-Kandari",
    specialty: "Occupational Therapist",
    experience: "12 years",
    rating: 4.9,
    color: "#5F8F8B",
  },
  {
    id: "2",
    name: "Dr. Mohammed Al-Sabah",
    specialty: "Behavioral Specialist",
    experience: "8 years",
    rating: 4.8,
    color: "#E8A838",
  },
  {
    id: "5",
    name: "Dr. Layla Al-Enezi",
    specialty: "Speech Therapist",
    experience: "15 years",
    rating: 5.0,
    color: "#7FB77E",
  },
];

type TabType = "centers" | "professionals";

export default function ServiceProvidersScreen() {
  const router = useRouter();
  const { serviceName } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("centers");

  const handleCenterPress = (centerId: string) => {
    router.push({
      pathname: "/(tabs)/centers/center-details",
      params: { id: centerId },
    } as any);
  };

  const handleProfessionalPress = (professionalId: string) => {
    router.push({
      pathname: "/(tabs)/professionals/professional-details",
      params: { id: professionalId },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Available Providers</Text>
          <Text style={styles.headerSubtitle}>{serviceName || "Service"}</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === "centers" && styles.tabActive]}
          onPress={() => setActiveTab("centers")}
        >
          <Ionicons
            name="business"
            size={18}
            color={activeTab === "centers" ? colors.primary : colors.textMuted}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "centers" && styles.tabTextActive,
            ]}
          >
            Centers
          </Text>
          <View style={styles.tabBadge}>
            <Text style={styles.tabBadgeText}>{CENTERS.length}</Text>
          </View>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === "professionals" && styles.tabActive]}
          onPress={() => setActiveTab("professionals")}
        >
          <Ionicons
            name="people"
            size={18}
            color={activeTab === "professionals" ? colors.primary : colors.textMuted}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "professionals" && styles.tabTextActive,
            ]}
          >
            Professionals
          </Text>
          <View style={styles.tabBadge}>
            <Text style={styles.tabBadgeText}>{PROFESSIONALS.length}</Text>
          </View>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Centers Tab */}
        {activeTab === "centers" && (
          <View style={styles.listContainer}>
            {CENTERS.map((center) => (
              <Pressable
                key={center.id}
                style={({ pressed }) => [
                  styles.card,
                  pressed && { transform: [{ scale: 0.98 }] },
                ]}
                onPress={() => handleCenterPress(center.id)}
              >
                <View style={styles.cardIcon}>
                  <Ionicons name="business" size={24} color={colors.primary} />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{center.name}</Text>
                  <View style={styles.cardMeta}>
                    <View style={styles.typeBadge}>
                      <Text style={styles.typeBadgeText}>{center.type}</Text>
                    </View>
                    <View style={styles.ratingWrap}>
                      <Ionicons name="star" size={14} color="#F5A623" />
                      <Text style={styles.ratingText}>{center.rating}</Text>
                    </View>
                  </View>
                  <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={14} color={colors.textMuted} />
                    <Text style={styles.locationText}>{center.location}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
              </Pressable>
            ))}
          </View>
        )}

        {/* Professionals Tab */}
        {activeTab === "professionals" && (
          <View style={styles.listContainer}>
            {PROFESSIONALS.map((professional) => (
              <Pressable
                key={professional.id}
                style={({ pressed }) => [
                  styles.card,
                  pressed && { transform: [{ scale: 0.98 }] },
                ]}
                onPress={() => handleProfessionalPress(professional.id)}
              >
                <View
                  style={[
                    styles.avatarWrap,
                    { backgroundColor: `${professional.color}20` },
                  ]}
                >
                  <Text style={[styles.avatarText, { color: professional.color }]}>
                    {professional.name.split(" ").slice(1, 3).map((n) => n[0]).join("")}
                  </Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{professional.name}</Text>
                  <Text style={[styles.specialtyText, { color: professional.color }]}>
                    {professional.specialty}
                  </Text>
                  <View style={styles.cardMeta}>
                    <View style={styles.ratingWrap}>
                      <Ionicons name="star" size={14} color="#F5A623" />
                      <Text style={styles.ratingText}>{professional.rating}</Text>
                    </View>
                    <View style={styles.metaDot} />
                    <Text style={styles.experienceText}>{professional.experience}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgApp,
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.bgCard,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  headerRight: {
    width: 40,
  },
  // Tabs
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: `${colors.primary}15`,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textMuted,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: "600",
  },
  tabBadge: {
    backgroundColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  // Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  // List
  listContainer: {
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  typeBadge: {
    backgroundColor: `${colors.secondary}15`,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.secondary,
  },
  ratingWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  specialtyText: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 4,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.textMuted,
  },
  experienceText: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
