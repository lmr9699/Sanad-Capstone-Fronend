import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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

// Services data (in real app, this would come from API)
const SERVICES_DATA: Record<
  string,
  {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    icon: string;
    category: string;
    rating: number;
    reviews: number;
    providers: number;
    color: string;
    benefits: string[];
    duration: string;
    frequency: string;
    ageRange: string;
  }
> = {
  "1": {
    id: "1",
    name: "Speech Therapy",
    description: "Improve communication and language skills",
    longDescription:
      "Speech therapy helps children develop their communication abilities through specialized exercises and techniques. Our certified speech-language pathologists work one-on-one with your child to address speech delays, articulation issues, language disorders, and social communication challenges.",
    icon: "chatbubble-outline",
    category: "Therapy",
    rating: 4.9,
    reviews: 127,
    providers: 12,
    color: "#7FB77E",
    benefits: [
      "Improved speech clarity and articulation",
      "Enhanced language comprehension",
      "Better social communication skills",
      "Increased confidence in speaking",
    ],
    duration: "45-60 min",
    frequency: "1-2x per week",
    ageRange: "2-18 years",
  },
  "2": {
    id: "2",
    name: "Occupational Therapy",
    description: "Develop daily living and motor skills",
    longDescription:
      "Occupational therapy focuses on helping children develop the skills they need for daily living and academic success. Our therapists use play-based activities to improve fine motor skills, sensory processing, and self-care abilities.",
    icon: "hand-left-outline",
    category: "Therapy",
    rating: 4.8,
    reviews: 98,
    providers: 8,
    color: "#5F8F8B",
    benefits: [
      "Improved fine motor coordination",
      "Better sensory processing",
      "Enhanced self-care skills",
      "Increased independence",
    ],
    duration: "45-60 min",
    frequency: "1-2x per week",
    ageRange: "1-18 years",
  },
  "3": {
    id: "3",
    name: "Behavioral Therapy",
    description: "Address behavioral challenges",
    longDescription:
      "Behavioral therapy uses evidence-based techniques to help children manage challenging behaviors and develop positive coping strategies. Our certified behavior analysts create individualized plans tailored to your child's specific needs.",
    icon: "heart-outline",
    category: "Therapy",
    rating: 4.9,
    reviews: 156,
    providers: 15,
    color: "#E8A838",
    benefits: [
      "Reduced challenging behaviors",
      "Improved emotional regulation",
      "Better social skills",
      "Enhanced family dynamics",
    ],
    duration: "60-90 min",
    frequency: "2-3x per week",
    ageRange: "2-18 years",
  },
  "4": {
    id: "4",
    name: "Physical Therapy",
    description: "Enhance movement and development",
    longDescription:
      "Physical therapy helps children improve their gross motor skills, strength, balance, and coordination. Our therapists use fun, engaging activities to help your child reach their physical development milestones.",
    icon: "fitness-outline",
    category: "Therapy",
    rating: 4.7,
    reviews: 84,
    providers: 10,
    color: "#D9534F",
    benefits: [
      "Improved mobility and balance",
      "Increased strength and endurance",
      "Better coordination",
      "Pain management",
    ],
    duration: "45-60 min",
    frequency: "1-2x per week",
    ageRange: "0-18 years",
  },
  "5": {
    id: "5",
    name: "Educational Support",
    description: "Academic assistance and learning strategies",
    longDescription:
      "Our educational support services provide personalized academic assistance for children with learning differences. Experienced educators work with your child to develop effective learning strategies and build academic confidence.",
    icon: "school-outline",
    category: "Education",
    rating: 4.8,
    reviews: 203,
    providers: 20,
    color: "#7B68EE",
    benefits: [
      "Personalized learning plans",
      "Improved academic performance",
      "Better study skills",
      "Increased confidence",
    ],
    duration: "60 min",
    frequency: "2-3x per week",
    ageRange: "5-18 years",
  },
  "6": {
    id: "6",
    name: "Family Counseling",
    description: "Support for the whole family",
    longDescription:
      "Family counseling provides a supportive environment for families to navigate challenges together. Our licensed counselors help improve family communication, resolve conflicts, and strengthen relationships.",
    icon: "people-outline",
    category: "Counseling",
    rating: 4.9,
    reviews: 67,
    providers: 6,
    color: "#FF69B4",
    benefits: [
      "Improved family communication",
      "Better conflict resolution",
      "Stronger family bonds",
      "Reduced stress for all members",
    ],
    duration: "60-90 min",
    frequency: "1x per week",
    ageRange: "All ages",
  },
};

export default function ServiceDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const service = SERVICES_DATA[id as string];

  if (!service) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Service not found</Text>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const handleBookService = () => {
    Alert.alert(
      "Book Service",
      `Would you like to book a ${service.name} session?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Find Providers",
          onPress: () => {
            Alert.alert("Coming Soon", "Provider booking will be available soon!");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.backBtn,
            pressed && { opacity: 0.7 },
          ]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Service Details</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View
            style={[
              styles.heroIcon,
              { backgroundColor: `${service.color}20` },
            ]}
          >
            <Ionicons
              name={service.icon as any}
              size={40}
              color={service.color}
            />
          </View>
          <Text style={styles.serviceName}>{service.name}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{service.category}</Text>
          </View>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= Math.floor(service.rating) ? "star" : "star-outline"}
                  size={18}
                  color="#F5A623"
                />
              ))}
            </View>
            <Text style={styles.ratingText}>
              {service.rating} ({service.reviews} reviews)
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Ionicons name="time-outline" size={22} color={colors.primary} />
            <Text style={styles.statLabel}>Duration</Text>
            <Text style={styles.statValue}>{service.duration}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Ionicons name="calendar-outline" size={22} color={colors.primary} />
            <Text style={styles.statLabel}>Frequency</Text>
            <Text style={styles.statValue}>{service.frequency}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Ionicons name="people-outline" size={22} color={colors.primary} />
            <Text style={styles.statLabel}>Age Range</Text>
            <Text style={styles.statValue}>{service.ageRange}</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This Service</Text>
          <Text style={styles.longDescription}>{service.longDescription}</Text>
        </View>

        {/* Benefits Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Benefits</Text>
          <View style={styles.benefitsList}>
            {service.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <Ionicons
                    name="checkmark"
                    size={16}
                    color="#FFFFFF"
                  />
                </View>
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Providers Card */}
        <View style={styles.providersCard}>
          <View style={styles.providersInfo}>
            <Text style={styles.providersTitle}>Available Providers</Text>
            <Text style={styles.providersCount}>
              {service.providers} certified specialists in your area
            </Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.viewProvidersBtn,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => {
              Alert.alert("Coming Soon", "Provider directory will be available soon!");
            }}
          >
            <Text style={styles.viewProvidersBtnText}>View All</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.primary} />
          </Pressable>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <View style={styles.priceInfo}>
          <Text style={styles.priceLabel}>Starting from</Text>
          <Text style={styles.priceValue}>Free consultation</Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.bookButton,
            pressed && { transform: [{ scale: 0.98 }] },
          ]}
          onPress={handleBookService}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </Pressable>
      </View>
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.bgApp,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.bgCard,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.text,
  },
  headerRight: {
    width: 40,
  },
  // Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  // Hero
  heroSection: {
    alignItems: "center",
    paddingVertical: 24,
  },
  heroIcon: {
    width: 88,
    height: 88,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  serviceName: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 10,
    textAlign: "center",
  },
  categoryBadge: {
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
    textTransform: "uppercase",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  starsRow: {
    flexDirection: "row",
    gap: 2,
  },
  ratingText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  // Stats Card
  statsCard: {
    flexDirection: "row",
    backgroundColor: colors.bgCard,
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 6,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  // Section
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
  },
  longDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  // Benefits
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  benefitIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  benefitText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  // Providers Card
  providersCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  providersInfo: {
    flex: 1,
  },
  providersTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  providersCount: {
    fontSize: 13,
    color: colors.textMuted,
  },
  viewProvidersBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: `${colors.primary}15`,
    borderRadius: 10,
  },
  viewProvidersBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },
  // Bottom CTA
  bottomCTA: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: colors.bgCard,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  priceInfo: {},
  priceLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  bookButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  // Error
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.textMuted,
    marginBottom: 16,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
