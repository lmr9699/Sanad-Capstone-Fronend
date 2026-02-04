import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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

// Services data with categories
const SERVICES = [
  {
    id: "1",
    name: "Speech Therapy",
    description: "Improve communication and language skills through specialized therapy sessions",
    icon: "chatbubble-outline",
    category: "Therapy",
    rating: 4.9,
    providers: 12,
    color: "#7FB77E",
  },
  {
    id: "2",
    name: "Occupational Therapy",
    description: "Develop daily living skills and fine motor coordination",
    icon: "hand-left-outline",
    category: "Therapy",
    rating: 4.8,
    providers: 8,
    color: "#5F8F8B",
  },
  {
    id: "3",
    name: "Behavioral Therapy",
    description: "Address behavioral challenges with evidence-based techniques",
    icon: "heart-outline",
    category: "Therapy",
    rating: 4.9,
    providers: 15,
    color: "#E8A838",
  },
  {
    id: "4",
    name: "Physical Therapy",
    description: "Enhance movement, strength, and physical development",
    icon: "fitness-outline",
    category: "Therapy",
    rating: 4.7,
    providers: 10,
    color: "#D9534F",
  },
  {
    id: "5",
    name: "Educational Support",
    description: "Academic assistance and personalized learning strategies",
    icon: "school-outline",
    category: "Education",
    rating: 4.8,
    providers: 20,
    color: "#7B68EE",
  },
  {
    id: "6",
    name: "Family Counseling",
    description: "Professional support for the whole family's wellbeing",
    icon: "people-outline",
    category: "Counseling",
    rating: 4.9,
    providers: 6,
    color: "#FF69B4",
  },
];

export default function ServicesScreen() {
  const router = useRouter();

  const handleServicePress = (serviceId: string) => {
    router.push({
      pathname: "/(tabs)/services/service-details",
      params: { id: serviceId },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Ionicons name="grid" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>Services</Text>
            <Text style={styles.subtitle}>
              Browse available services for your child
            </Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{SERVICES.length}</Text>
            <Text style={styles.statLabel}>Services</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {SERVICES.reduce((acc, s) => acc + s.providers, 0)}
            </Text>
            <Text style={styles.statLabel}>Providers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
        </View>

        {/* Services List */}
        <Text style={styles.sectionTitle}>All Services</Text>
        <View style={styles.servicesList}>
          {SERVICES.map((service, index) => (
            <Pressable
              key={service.id}
              style={({ pressed }) => [
                styles.serviceCard,
                pressed && { transform: [{ scale: 0.98 }] },
              ]}
              onPress={() => handleServicePress(service.id)}
            >
              {/* Service Icon */}
              <View
                style={[
                  styles.serviceIconWrap,
                  { backgroundColor: `${service.color}15` },
                ]}
              >
                <Ionicons
                  name={service.icon as any}
                  size={26}
                  color={service.color}
                />
              </View>

              {/* Service Info */}
              <View style={styles.serviceInfo}>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{service.category}</Text>
                  </View>
                </View>
                <Text style={styles.serviceDescription} numberOfLines={2}>
                  {service.description}
                </Text>
                <View style={styles.serviceMeta}>
                  <View style={styles.ratingWrap}>
                    <Ionicons name="star" size={14} color="#F5A623" />
                    <Text style={styles.ratingText}>{service.rating}</Text>
                  </View>
                  <View style={styles.metaDot} />
                  <Ionicons
                    name="person-outline"
                    size={14}
                    color={colors.textMuted}
                  />
                  <Text style={styles.providersText}>
                    {service.providers} providers
                  </Text>
                </View>
              </View>

              {/* Arrow */}
              <View style={styles.arrowWrap}>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.textMuted}
                />
              </View>
            </Pressable>
          ))}
        </View>
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
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  // Stats Row
  statsRow: {
    flexDirection: "row",
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: colors.border,
  },
  // Section
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 16,
  },
  // Services List
  servicesList: {
    gap: 12,
  },
  serviceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgCard,
    borderRadius: 18,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  categoryBadge: {
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.primary,
    textTransform: "uppercase",
  },
  serviceDescription: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: 8,
  },
  serviceMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
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
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.textMuted,
    marginHorizontal: 4,
  },
  providersText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  arrowWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.bgApp,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
});
