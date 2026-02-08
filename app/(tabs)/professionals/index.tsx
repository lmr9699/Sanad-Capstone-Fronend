import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

// Specializations for filtering
const SPECIALIZATIONS = [
  { id: "all", label: "All", icon: "apps-outline", count: 8 },
  { id: "speech", label: "Speech", icon: "chatbubble-outline", count: 2 },
  { id: "behavioral", label: "Behavioral", icon: "heart-outline", count: 2 },
  { id: "occupational", label: "Occupational", icon: "hand-left-outline", count: 2 },
  { id: "physical", label: "Physical", icon: "fitness-outline", count: 1 },
  { id: "educational", label: "Educational", icon: "school-outline", count: 1 },
];

// Gender filter options
const GENDERS = [
  { id: "all", label: "All", icon: "people-outline" },
  { id: "male", label: "Male", icon: "man-outline" },
  { id: "female", label: "Female", icon: "woman-outline" },
];

// Mock professionals data with Kuwait workplace locations
const PROFESSIONALS = [
  {
    id: "1",
    name: "Dr. Sarah Al-Mutairi",
    specialty: "speech",
    specialtyLabel: "Speech Therapist",
    experience: "10 years",
    rating: 4.9,
    reviews: 127,
    availability: "Available today",
    verified: true,
    image: null,
    color: "#7FB77E",
    gender: "female",
    workplace: "Kuwait Autism Center",
    workplaceArea: "Sharq, Capital",
  },
  {
    id: "2",
    name: "Dr. Mohammed Al-Sabah",
    specialty: "behavioral",
    specialtyLabel: "Behavioral Specialist",
    experience: "8 years",
    rating: 4.8,
    reviews: 98,
    availability: "Next available: Tomorrow",
    verified: true,
    image: null,
    color: "#E8A838",
    gender: "male",
    workplace: "Hope Therapy Clinic",
    workplaceArea: "Mirqab, Capital",
  },
  {
    id: "3",
    name: "Dr. Fatima Al-Kandari",
    specialty: "occupational",
    specialtyLabel: "Occupational Therapist",
    experience: "12 years",
    rating: 4.9,
    reviews: 156,
    availability: "Available today",
    verified: true,
    image: null,
    color: "#5F8F8B",
    gender: "female",
    workplace: "Al-Wafaa Rehabilitation Center",
    workplaceArea: "Salmiya, Hawalli",
  },
  {
    id: "4",
    name: "Dr. Omar Al-Rashidi",
    specialty: "educational",
    specialtyLabel: "Educational Psychologist",
    experience: "6 years",
    rating: 4.7,
    reviews: 67,
    availability: "Next available: Wed",
    verified: true,
    image: null,
    color: "#7B68EE",
    gender: "male",
    workplace: "Al-Amal Learning Center",
    workplaceArea: "Jahra City, Jahra",
  },
  {
    id: "5",
    name: "Dr. Layla Al-Enezi",
    specialty: "speech",
    specialtyLabel: "Speech Therapist",
    experience: "15 years",
    rating: 5.0,
    reviews: 203,
    availability: "Available today",
    verified: true,
    image: null,
    color: "#7FB77E",
    gender: "female",
    workplace: "Al-Noor Special Education School",
    workplaceArea: "Khaitan, Farwaniya",
  },
  {
    id: "6",
    name: "Dr. Youssef Al-Hajri",
    specialty: "behavioral",
    specialtyLabel: "Behavioral Analyst",
    experience: "9 years",
    rating: 4.8,
    reviews: 112,
    availability: "Available today",
    verified: true,
    image: null,
    color: "#E8A838",
    gender: "male",
    workplace: "Kuwait Autism Center",
    workplaceArea: "Sharq, Capital",
  },
  {
    id: "7",
    name: "Dr. Nour Al-Shammari",
    specialty: "occupational",
    specialtyLabel: "Occupational Therapist",
    experience: "7 years",
    rating: 4.6,
    reviews: 89,
    availability: "Next available: Thu",
    verified: false,
    image: null,
    color: "#5F8F8B",
    gender: "female",
    workplace: "Kuwait Physical Therapy Center",
    workplaceArea: "Abu Fatira, Mubarak Al-Kabeer",
  },
  {
    id: "8",
    name: "Dr. Ahmad Al-Fadhli",
    specialty: "physical",
    specialtyLabel: "Physical Therapist",
    experience: "11 years",
    rating: 4.9,
    reviews: 145,
    availability: "Available today",
    verified: true,
    image: null,
    color: "#D9534F",
    gender: "male",
    workplace: "Kuwait Physical Therapy Center",
    workplaceArea: "Abu Fatira, Mubarak Al-Kabeer",
  },
];

export default function ProfessionalsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedSpecialization, setSelectedSpecialization] = React.useState("all");
  const [selectedGender, setSelectedGender] = React.useState("all");

  const filteredProfessionals = PROFESSIONALS.filter((p) => {
    const matchesSpecialization = selectedSpecialization === "all" || p.specialty === selectedSpecialization;
    const matchesGender = selectedGender === "all" || p.gender === selectedGender;
    
    // Search filter - matches name, specialty, or workplace
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = searchQuery === "" ||
      p.name.toLowerCase().includes(searchLower) ||
      p.specialtyLabel.toLowerCase().includes(searchLower) ||
      p.workplace.toLowerCase().includes(searchLower) ||
      p.workplaceArea.toLowerCase().includes(searchLower);
    
    return matchesSpecialization && matchesGender && matchesSearch;
  });

  const handleProfessionalPress = (professionalId: string) => {
    router.push({
      pathname: "/(tabs)/professionals/professional-details",
      params: { id: professionalId },
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
            <Ionicons name="people" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>{t("professionals.title")}</Text>
            <Text style={styles.subtitle}>
              {t("directory.healthcareProfessionals")}
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, specialty, or workplace..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <Pressable
              onPress={() => setSearchQuery("")}
              style={({ pressed }) => [
                styles.clearButton,
                pressed && { opacity: 0.6 },
              ]}
            >
              <Ionicons name="close-circle" size={20} color={colors.textMuted} />
            </Pressable>
          )}
        </View>

        {/* Gender Filter Section */}
        <Text style={styles.sectionLabel}>{t("professionals.filterByGender")}</Text>
        <View style={styles.genderFilterRow}>
          {GENDERS.map((gender) => (
            <Pressable
              key={gender.id}
              style={({ pressed }) => [
                styles.genderChip,
                selectedGender === gender.id && styles.genderChipActive,
                pressed && { transform: [{ scale: 0.96 }] },
              ]}
              onPress={() => setSelectedGender(gender.id)}
            >
              <Ionicons
                name={gender.icon as any}
                size={18}
                color={selectedGender === gender.id ? "#FFFFFF" : colors.textSecondary}
              />
              <Text
                style={[
                  styles.genderChipText,
                  selectedGender === gender.id && styles.genderChipTextActive,
                ]}
              >
                {gender.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Specialization Filter Section */}
        <Text style={styles.sectionLabel}>{t("professionals.filterBySpecialization")}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterRow}
        >
          {SPECIALIZATIONS.map((spec) => (
            <Pressable
              key={spec.id}
              style={({ pressed }) => [
                styles.filterChip,
                selectedSpecialization === spec.id && styles.filterChipActive,
                pressed && { transform: [{ scale: 0.96 }] },
              ]}
              onPress={() => setSelectedSpecialization(spec.id)}
            >
              <Ionicons
                name={spec.icon as any}
                size={18}
                color={selectedSpecialization === spec.id ? "#FFFFFF" : colors.textSecondary}
              />
              <Text
                style={[
                  styles.filterChipText,
                  selectedSpecialization === spec.id && styles.filterChipTextActive,
                ]}
              >
                {spec.label}
              </Text>
              {spec.id !== "all" && (
                <View
                  style={[
                    styles.filterCount,
                    selectedSpecialization === spec.id && styles.filterCountActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterCountText,
                      selectedSpecialization === spec.id && styles.filterCountTextActive,
                    ]}
                  >
                    {spec.count}
                  </Text>
                </View>
              )}
            </Pressable>
          ))}
        </ScrollView>

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredProfessionals.length} professional
            {filteredProfessionals.length !== 1 ? "s" : ""} found
          </Text>
          <Pressable style={styles.sortButton}>
            <Ionicons name="funnel-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.sortButtonText}>Sort</Text>
          </Pressable>
        </View>

        {/* Professionals List */}
        <View style={styles.professionalsList}>
          {filteredProfessionals.map((professional) => (
            <Pressable
              key={professional.id}
              style={({ pressed }) => [
                styles.professionalCard,
                pressed && { transform: [{ scale: 0.98 }] },
              ]}
              onPress={() => handleProfessionalPress(professional.id)}
            >
              {/* Avatar */}
              <View
                style={[
                  styles.avatarContainer,
                  { backgroundColor: `${professional.color}15` },
                ]}
              >
                <Text style={[styles.avatarText, { color: professional.color }]}>
                  {professional.name.split(" ").slice(1, 3).map(n => n[0]).join("")}
                </Text>
                {professional.verified && (
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                  </View>
                )}
              </View>

              {/* Content */}
              <View style={styles.professionalContent}>
                <View style={styles.nameRow}>
                  <Text style={styles.professionalName}>{professional.name}</Text>
                </View>
                <Text style={[styles.specialtyLabel, { color: professional.color }]}>
                  {professional.specialtyLabel}
                </Text>
                
                {/* Next Session Availability */}
                <View style={styles.availabilityRow}>
                  <Ionicons 
                    name="calendar" 
                    size={14} 
                    color={professional.availability.includes("today") ? colors.primary : colors.secondary} 
                  />
                  <Text
                    style={[
                      styles.availabilityText,
                      professional.availability.includes("today") && styles.availabilityTextActive,
                    ]}
                  >
                    Next Session: {professional.availability.replace("Available ", "").replace("Next available: ", "")}
                  </Text>
                </View>

                {/* Meta Row */}
                <View style={styles.metaRow}>
                  <Text style={styles.experienceText}>{professional.experience} experience</Text>
                </View>
              </View>

              {/* Arrow */}
              <View style={styles.arrowWrap}>
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
              </View>
            </Pressable>
          ))}
        </View>

        {/* Empty State */}
        {filteredProfessionals.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconWrap}>
              <Ionicons name="search-outline" size={32} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>No professionals found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery ? `No results for "${searchQuery}"` : "Try selecting different filters"}
            </Text>
            <Pressable
              style={styles.resetButton}
              onPress={() => {
                setSearchQuery("");
                setSelectedSpecialization("all");
                setSelectedGender("all");
              }}
            >
              <Text style={styles.resetButtonText}>Reset All</Text>
            </Pressable>
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
    marginBottom: 20,
  },
  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.secondary,
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
  // Search Bar
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 20,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    paddingVertical: 10,
  },
  clearButton: {
    padding: 4,
  },
  // Filter Section
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  // Gender Filter
  genderFilterRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  genderChip: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.bgCard,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  genderChipActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  genderChipText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  genderChipTextActive: {
    color: "#FFFFFF",
  },
  filterScroll: {
    marginHorizontal: -20,
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: colors.bgCard,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },
  filterCount: {
    backgroundColor: colors.bgApp,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  filterCountActive: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  filterCountText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  filterCountTextActive: {
    color: "#FFFFFF",
  },
  // Results Header
  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.bgCard,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sortButtonText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  // Professionals List
  professionalsList: {
    gap: 12,
  },
  professionalCard: {
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
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    position: "relative",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.bgCard,
  },
  professionalContent: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  professionalName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  specialtyLabel: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 4,
  },
  workplaceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 4,
  },
  workplaceText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "500",
    flex: 1,
  },
  workplaceArea: {
    fontSize: 11,
    color: colors.textMuted,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
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
  reviewsText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.textMuted,
    marginHorizontal: 8,
  },
  experienceText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  availabilityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  availabilityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textMuted,
  },
  availabilityDotActive: {
    backgroundColor: "#4CAF50",
  },
  availabilityText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.secondary,
    marginLeft: 6,
  },
  availabilityTextActive: {
    color: colors.primary,
    fontWeight: "500",
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
  // Empty State
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    marginBottom: 20,
  },
  resetButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
