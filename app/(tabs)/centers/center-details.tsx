import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFavorites } from "../../../context/FavoritesContext";
import { useLanguage } from "../../../context/LanguageContext";

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

// Mock centers data (Kuwait - same as in index.tsx)
const CENTERS = [
  {
    id: "1",
    name: "Kuwait Autism Center",
    type: "school",
    typeLabel: "Autism Education Center",
    location: "capital",
    address: "Sharq, Kuwait City",
    fullAddress: "Ahmad Al-Jaber Street, Sharq, Kuwait City",
    rating: 4.9,
    reviews: 178,
    services: ["Autism Programs", "Social Skills Training", "Early Intervention", "ABA Therapy", "Life Skills"],
    phone: "+965 2245 6789",
    email: "info@kuwaitautism.edu.kw",
    website: "www.kuwaitautism.edu.kw",
    hours: "Sunday - Thursday: 7:30 AM - 3:00 PM",
    description: "Kuwait Autism Center is the leading specialized educational facility in Kuwait focused on providing comprehensive support for individuals on the autism spectrum. From early intervention to vocational training, we support the entire developmental journey with certified specialists.",
    color: "#7FB77E",
    verified: true,
    established: "2008",
    capacity: "120 students",
    staff: "50 educators",
  },
  {
    id: "2",
    name: "Al-Wafaa Rehabilitation Center",
    type: "rehab",
    typeLabel: "Rehabilitation Center",
    location: "hawalli",
    address: "Salmiya, Hawalli",
    fullAddress: "Salem Al-Mubarak Street, Salmiya, Hawalli Governorate",
    rating: 4.9,
    reviews: 203,
    services: ["Physical Therapy", "Occupational Therapy", "Hydrotherapy", "Sensory Integration", "Speech Therapy"],
    phone: "+965 2256 7890",
    email: "contact@alwafaa-rehab.com.kw",
    website: "www.alwafaa-rehab.com.kw",
    hours: "Sunday - Thursday: 8:00 AM - 6:00 PM",
    description: "Al-Wafaa Rehabilitation Center offers state-of-the-art rehabilitation services for children with physical and developmental challenges. Our multidisciplinary team of Kuwaiti and international specialists provides evidence-based therapies in a supportive environment.",
    color: "#5F8F8B",
    verified: true,
    established: "2005",
    capacity: "150 patients/day",
    staff: "60 therapists",
  },
  {
    id: "3",
    name: "Hope Therapy Clinic",
    type: "clinic",
    typeLabel: "Therapy Clinic",
    location: "capital",
    address: "Mirqab, Kuwait City",
    fullAddress: "Fahad Al-Salem Street, Mirqab, Kuwait City",
    rating: 4.7,
    reviews: 89,
    services: ["ABA Therapy", "Speech Therapy", "Psychological Assessment", "Parent Training"],
    phone: "+965 2267 8901",
    email: "appointments@hopeclinic.com.kw",
    website: "www.hopeclinic.com.kw",
    hours: "Saturday - Thursday: 9:00 AM - 8:00 PM",
    description: "Hope Therapy Clinic specializes in Applied Behavior Analysis (ABA) therapy and comprehensive assessments for children with autism and developmental disorders. We believe in family-centered care and offer extensive parent training programs.",
    color: "#E8A838",
    verified: true,
    established: "2015",
    capacity: "80 patients/day",
    staff: "25 specialists",
  },
  {
    id: "4",
    name: "Al-Noor Special Education School",
    type: "school",
    typeLabel: "Special Education School",
    location: "farwaniya",
    address: "Khaitan, Farwaniya",
    fullAddress: "Block 7, Street 45, Khaitan, Farwaniya Governorate",
    rating: 4.8,
    reviews: 156,
    services: ["Speech Therapy", "Behavioral Support", "Educational Programs", "Life Skills", "Occupational Therapy"],
    phone: "+965 2478 9012",
    email: "info@alnoor-school.edu.kw",
    website: "www.alnoor-school.edu.kw",
    hours: "Sunday - Thursday: 7:00 AM - 2:00 PM",
    description: "Al-Noor Special Education School is a leading institution dedicated to providing comprehensive educational services for People of Determination. Our team of certified specialists works together to create personalized learning plans that help each individual reach their full potential.",
    color: "#7B68EE",
    verified: true,
    established: "2010",
    capacity: "200 students",
    staff: "45 professionals",
  },
  {
    id: "5",
    name: "Ahmadi Child Development Center",
    type: "clinic",
    typeLabel: "Developmental Clinic",
    location: "ahmadi",
    address: "Fahaheel, Ahmadi",
    fullAddress: "Makkah Street, Fahaheel, Ahmadi Governorate",
    rating: 4.6,
    reviews: 67,
    services: ["Developmental Assessment", "Early Intervention", "Speech Therapy", "Sensory Integration"],
    phone: "+965 2389 0123",
    email: "info@ahmadi-cdc.com.kw",
    website: "www.ahmadi-cdc.com.kw",
    hours: "Sunday - Thursday: 8:00 AM - 5:00 PM",
    description: "Ahmadi Child Development Center provides comprehensive diagnostic and early intervention services for children in the Ahmadi governorate. Our modern facility includes specialized equipment and trained professionals dedicated to child development.",
    color: "#E8A838",
    verified: false,
    established: "2018",
    capacity: "100 patients/day",
    staff: "30 specialists",
  },
  {
    id: "6",
    name: "Al-Amal Learning Center",
    type: "school",
    typeLabel: "Learning Disability Center",
    location: "jahra",
    address: "Jahra City, Jahra",
    fullAddress: "Block 3, Main Street, Jahra City, Jahra Governorate",
    rating: 4.8,
    reviews: 112,
    services: ["Dyslexia Support", "ADHD Programs", "Academic Tutoring", "Cognitive Training"],
    phone: "+965 2490 1234",
    email: "learn@alamal-center.edu.kw",
    website: "www.alamal-center.edu.kw",
    hours: "Sunday - Thursday: 8:00 AM - 2:00 PM",
    description: "Al-Amal Learning Center specializes in supporting children with learning disabilities including dyslexia, dyscalculia, and ADHD. Our evidence-based programs help children develop strategies for academic success in Kuwait's educational system.",
    color: "#7B68EE",
    verified: true,
    established: "2012",
    capacity: "80 students",
    staff: "20 educators",
  },
  {
    id: "7",
    name: "Kuwait Physical Therapy Center",
    type: "rehab",
    typeLabel: "Rehabilitation Center",
    location: "mubarak",
    address: "Abu Fatira, Mubarak Al-Kabeer",
    fullAddress: "Block 1, Street 10, Abu Fatira, Mubarak Al-Kabeer Governorate",
    rating: 4.9,
    reviews: 234,
    services: ["Physical Therapy", "Occupational Therapy", "Aquatic Therapy", "Sports Rehabilitation", "Pediatric Therapy"],
    phone: "+965 2501 2345",
    email: "care@kptc.com.kw",
    website: "www.kptc.com.kw",
    hours: "Saturday - Thursday: 8:00 AM - 8:00 PM",
    description: "Kuwait Physical Therapy Center is a comprehensive rehabilitation facility serving families across Kuwait. Our multidisciplinary team conducts thorough assessments and creates individualized treatment plans for children with physical and developmental needs.",
    color: "#5F8F8B",
    verified: true,
    established: "2003",
    capacity: "120 patients/day",
    staff: "40 therapists",
  },
  {
    id: "8",
    name: "Hawalli Determination Center",
    type: "school",
    typeLabel: "People of Determination School",
    location: "hawalli",
    address: "Rumaithiya, Hawalli",
    fullAddress: "Block 4, Street 22, Rumaithiya, Hawalli Governorate",
    rating: 4.7,
    reviews: 145,
    services: ["Special Education", "Speech Therapy", "Behavioral Therapy", "Vocational Training"],
    phone: "+965 2512 3456",
    email: "info@hawalli-snc.edu.kw",
    website: "www.hawalli-snc.edu.kw",
    hours: "Sunday - Thursday: 7:30 AM - 3:30 PM",
    description: "Hawalli Determination Center provides comprehensive educational and therapeutic services for People of Determination. Our experienced team focuses on developing each individual's unique abilities and preparing them for independent living.",
    color: "#7FB77E",
    verified: true,
    established: "2011",
    capacity: "100 students",
    staff: "35 professionals",
  },
];

export default function CenterDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { locale } = useLanguage();
  const isArabic = locale === "ar";
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const center = CENTERS.find((c) => c.id === id);
  const isFav = center ? isFavorite(center.id, "center") : false;

  const handleToggleFavorite = async () => {
    if (!center) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (isFav) {
      await removeFavorite(center.id, "center");
    } else {
      await addFavorite({
        id: center.id,
        type: "center",
        name: center.name,
        subtitle: center.typeLabel,
      });
    }
  };

  if (!center) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.textMuted} />
          <Text style={styles.errorText}>Center not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const handleCall = () => {
    Linking.openURL(`tel:${center.phone.replace(/\s/g, "")}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${center.email}`);
  };

  const handleWebsite = () => {
    Linking.openURL(`https://${center.website}`);
  };

  const handleDirections = () => {
    const query = encodeURIComponent(center.fullAddress);
    Linking.openURL(`https://maps.google.com/?q=${query}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Pressable
            style={({ pressed }) => [
              styles.backButtonHeader,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.favoriteButton,
              pressed && { opacity: 0.7 },
            ]}
            onPress={handleToggleFavorite}
          >
            <Ionicons 
              name={isFav ? "heart" : "heart-outline"} 
              size={24} 
              color={isFav ? "#FF6B6B" : colors.text} 
            />
          </Pressable>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={[styles.heroIcon, { backgroundColor: `${center.color}20` }]}>
            <Ionicons
              name={
                center.type === "school"
                  ? "school"
                  : center.type === "rehab"
                  ? "fitness"
                  : "medkit"
              }
              size={40}
              color={center.color}
            />
          </View>
          <Text style={styles.centerName}>{center.name}</Text>
          <View style={[styles.typeBadge, { backgroundColor: `${center.color}15` }]}>
            <Text style={[styles.typeBadgeText, { color: center.color }]}>
              {center.typeLabel}
            </Text>
          </View>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={18} color="#F5A623" />
            <Text style={styles.ratingText}>{center.rating}</Text>
            <Text style={styles.reviewsText}>({center.reviews} reviews)</Text>
            {center.verified && (
              <View style={styles.verifiedTag}>
                <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="calendar-outline" size={20} color={colors.secondary} />
            <Text style={styles.statValue}>Est. {center.established}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="people-outline" size={20} color={colors.secondary} />
            <Text style={styles.statValue}>{center.capacity}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="person-outline" size={20} color={colors.secondary} />
            <Text style={styles.statValue}>{center.staff}</Text>
          </View>
        </View>

        {/* Contact Actions */}
        <View style={styles.actionsRow}>
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={handleCall}
          >
            <View style={[styles.actionIcon, { backgroundColor: `${colors.primary}15` }]}>
              <Ionicons name="call" size={22} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Call</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={handleEmail}
          >
            <View style={[styles.actionIcon, { backgroundColor: `${colors.secondary}15` }]}>
              <Ionicons name="mail" size={22} color={colors.secondary} />
            </View>
            <Text style={styles.actionText}>Email</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={handleWebsite}
          >
            <View style={[styles.actionIcon, { backgroundColor: "#7B68EE15" }]}>
              <Ionicons name="globe" size={22} color="#7B68EE" />
            </View>
            <Text style={styles.actionText}>Website</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={handleDirections}
          >
            <View style={[styles.actionIcon, { backgroundColor: "#E8A83815" }]}>
              <Ionicons name="navigate" size={22} color="#E8A838" />
            </View>
            <Text style={styles.actionText}>Directions</Text>
          </Pressable>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.descriptionText}>{center.description}</Text>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services Offered</Text>
          <View style={styles.servicesGrid}>
            {center.services.map((service, index) => (
              <View key={index} style={styles.serviceTag}>
                <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
                <Text style={styles.serviceTagText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={20} color={colors.textSecondary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Address</Text>
                <Text style={styles.infoValue}>{center.fullAddress}</Text>
              </View>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={20} color={colors.textSecondary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{center.phone}</Text>
              </View>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={20} color={colors.textSecondary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{center.email}</Text>
              </View>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={20} color={colors.textSecondary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Working Hours</Text>
                <Text style={styles.infoValue}>{center.hours}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* CTA Button */}
        <Pressable
          style={({ pressed }) => [
            styles.ctaButton,
            pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
          ]}
          onPress={() => Alert.alert("Contact", "This would open a booking form in production.")}
        >
          <Ionicons name="calendar" size={20} color="#FFFFFF" />
          <Text style={styles.ctaButtonText}>Schedule a Visit</Text>
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
    paddingTop: 16,
    paddingBottom: 40,
  },
  // Error State
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: colors.textMuted,
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  // Header Row
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  // Back Button Header
  backButtonHeader: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.bgCard,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.bgCard,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  // Hero Section
  heroSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  heroIcon: {
    width: 88,
    height: 88,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  centerName: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: 10,
  },
  typeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  typeBadgeText: {
    fontSize: 13,
    fontWeight: "600",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  reviewsText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  verifiedTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: `${colors.primary}15`,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  // Stats Row
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  statValue: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
  },
  // Actions Row
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  actionButton: {
    alignItems: "center",
    gap: 8,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  // Section
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 14,
  },
  descriptionText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  // Services Grid
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  serviceTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: colors.bgCard,
    borderRadius: 12,
  },
  serviceTagText: {
    fontSize: 14,
    color: colors.text,
  },
  // Info Card
  infoCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 18,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
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
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  infoDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 14,
  },
  // CTA Button
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
