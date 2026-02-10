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

// Location filter options (Kuwait Governorates)
const LOCATIONS = [
  { id: "all", label: "All Areas", icon: "location-outline" },
  { id: "capital", label: "Capital", icon: "location" },
  { id: "hawalli", label: "Hawalli", icon: "location" },
  { id: "farwaniya", label: "Farwaniya", icon: "location" },
  { id: "ahmadi", label: "Ahmadi", icon: "location" },
  { id: "jahra", label: "Jahra", icon: "location" },
  { id: "mubarak", label: "Mubarak Al-Kabeer", icon: "location" },
];

// Center type filter options
const CENTER_TYPES = [
  { id: "all", label: "All Types", icon: "apps-outline" },
  { id: "school", label: "School", icon: "school-outline" },
  { id: "rehab", label: "Rehabilitation", icon: "fitness-outline" },
  { id: "clinic", label: "Clinic", icon: "medkit-outline" },
];

// Mock centers data (Kuwait)
const CENTERS = [
  {
    id: "1",
    name: "Kuwait Autism Center",
    type: "school",
    typeLabel: "Autism Education Center",
    location: "capital",
    address: "Sharq, Kuwait City",
    rating: 4.9,
    reviews: 178,
    services: ["Autism Programs", "Social Skills Training", "Early Intervention", "ABA Therapy"],
    phone: "+965 2245 6789",
    hours: "7:30 AM - 3:00 PM",
    color: "#7FB77E",
    verified: true,
  },
  {
    id: "2",
    name: "Al-Wafaa Rehabilitation Center",
    type: "rehab",
    typeLabel: "Rehabilitation Center",
    location: "hawalli",
    address: "Salmiya, Hawalli",
    rating: 4.9,
    reviews: 203,
    services: ["Physical Therapy", "Occupational Therapy", "Hydrotherapy", "Sensory Integration"],
    phone: "+965 2256 7890",
    hours: "8:00 AM - 6:00 PM",
    color: "#5F8F8B",
    verified: true,
  },
  {
    id: "3",
    name: "Hope Therapy Clinic",
    type: "clinic",
    typeLabel: "Therapy Clinic",
    location: "capital",
    address: "Mirqab, Kuwait City",
    rating: 4.7,
    reviews: 89,
    services: ["ABA Therapy", "Speech Therapy", "Psychological Assessment", "Parent Training"],
    phone: "+965 2267 8901",
    hours: "9:00 AM - 8:00 PM",
    color: "#E8A838",
    verified: true,
  },
  {
    id: "4",
    name: "Al-Noor Special Education School",
    type: "school",
    typeLabel: "Special Education School",
    location: "farwaniya",
    address: "Khaitan, Farwaniya",
    rating: 4.8,
    reviews: 156,
    services: ["Speech Therapy", "Behavioral Support", "Educational Programs", "Life Skills"],
    phone: "+965 2478 9012",
    hours: "7:00 AM - 2:00 PM",
    color: "#7B68EE",
    verified: true,
  },
  {
    id: "5",
    name: "Ahmadi Child Development Center",
    type: "clinic",
    typeLabel: "Developmental Clinic",
    location: "ahmadi",
    address: "Fahaheel, Ahmadi",
    rating: 4.6,
    reviews: 67,
    services: ["Developmental Assessment", "Early Intervention", "Speech Therapy"],
    phone: "+965 2389 0123",
    hours: "8:00 AM - 5:00 PM",
    color: "#E8A838",
    verified: false,
  },
  {
    id: "6",
    name: "Al-Amal Learning Center",
    type: "school",
    typeLabel: "Learning Disability Center",
    location: "jahra",
    address: "Jahra City, Jahra",
    rating: 4.8,
    reviews: 112,
    services: ["Dyslexia Support", "ADHD Programs", "Academic Tutoring", "Cognitive Training"],
    phone: "+965 2490 1234",
    hours: "8:00 AM - 2:00 PM",
    color: "#7B68EE",
    verified: true,
  },
  {
    id: "7",
    name: "Kuwait Physical Therapy Center",
    type: "rehab",
    typeLabel: "Rehabilitation Center",
    location: "mubarak",
    address: "Abu Fatira, Mubarak Al-Kabeer",
    rating: 4.9,
    reviews: 234,
    services: ["Physical Therapy", "Occupational Therapy", "Aquatic Therapy", "Sports Rehabilitation"],
    phone: "+965 2501 2345",
    hours: "8:00 AM - 8:00 PM",
    color: "#5F8F8B",
    verified: true,
  },
  {
    id: "8",
    name: "Hawalli Determination Center",
    type: "school",
    typeLabel: "People of Determination School",
    location: "hawalli",
    address: "Rumaithiya, Hawalli",
    rating: 4.7,
    reviews: 145,
    services: ["Special Education", "Speech Therapy", "Behavioral Therapy", "Vocational Training"],
    phone: "+965 2512 3456",
    hours: "7:30 AM - 3:30 PM",
    color: "#7FB77E",
    verified: true,
  },
];

export default function CentersScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("all");
  const [selectedType, setSelectedType] = React.useState("all");

  const filteredCenters = CENTERS.filter((center) => {
    const matchesLocation = selectedLocation === "all" || center.location === selectedLocation;
    const matchesType = selectedType === "all" || center.type === selectedType;
    
    // Search filter - matches name, address, type label, or services
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = searchQuery === "" || 
      center.name.toLowerCase().includes(searchLower) ||
      center.address.toLowerCase().includes(searchLower) ||
      center.typeLabel.toLowerCase().includes(searchLower) ||
      center.services.some(service => service.toLowerCase().includes(searchLower));
    
    return matchesLocation && matchesType && matchesSearch;
  });

  const handleCenterPress = (centerId: string) => {
    router.push({
      pathname: "/(tabs)/centers/center-details",
      params: { id: centerId },
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
            <Ionicons name="business" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>Centers</Text>
            <Text style={styles.subtitle}>
              Find schools, clinics & rehabilitation centers
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, location, or service..."
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

        {/* Location Filter Section */}
        <Text style={styles.sectionLabel}>Filter by Location</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterRow}
        >
          {LOCATIONS.map((loc) => (
            <Pressable
              key={loc.id}
              style={({ pressed }) => [
                styles.filterChip,
                selectedLocation === loc.id && styles.filterChipActive,
                pressed && { transform: [{ scale: 0.96 }] },
              ]}
              onPress={() => setSelectedLocation(loc.id)}
            >
              <Ionicons
                name={loc.icon as any}
                size={16}
                color={selectedLocation === loc.id ? "#FFFFFF" : colors.textSecondary}
              />
              <Text
                style={[
                  styles.filterChipText,
                  selectedLocation === loc.id && styles.filterChipTextActive,
                ]}
              >
                {loc.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Type Filter Section */}
        <Text style={styles.sectionLabel}>Filter by Type</Text>
        <View style={styles.typeFilterRow}>
          {CENTER_TYPES.map((type) => (
            <Pressable
              key={type.id}
              style={({ pressed }) => [
                styles.typeChip,
                selectedType === type.id && styles.typeChipActive,
                pressed && { transform: [{ scale: 0.96 }] },
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <Ionicons
                name={type.icon as any}
                size={20}
                color={selectedType === type.id ? "#FFFFFF" : colors.textSecondary}
              />
              <Text
                style={[
                  styles.typeChipText,
                  selectedType === type.id && styles.typeChipTextActive,
                ]}
              >
                {type.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredCenters.length} center{filteredCenters.length !== 1 ? "s" : ""} found
          </Text>
          <Pressable style={styles.sortButton}>
            <Ionicons name="funnel-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.sortButtonText}>Sort</Text>
          </Pressable>
        </View>

        {/* Centers List */}
        <View style={styles.centersList}>
          {filteredCenters.map((center) => (
            <Pressable
              key={center.id}
              style={({ pressed }) => [
                styles.centerCard,
                pressed && { transform: [{ scale: 0.98 }] },
              ]}
              onPress={() => handleCenterPress(center.id)}
            >
              {/* Icon */}
              <View
                style={[
                  styles.centerIconWrap,
                  { backgroundColor: `${center.color}15` },
                ]}
              >
                <Ionicons
                  name={
                    center.type === "school"
                      ? "school"
                      : center.type === "rehab"
                      ? "fitness"
                      : "medkit"
                  }
                  size={24}
                  color={center.color}
                />
                {center.verified && (
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                  </View>
                )}
              </View>

              {/* Content */}
              <View style={styles.centerContent}>
                <Text style={styles.centerName} numberOfLines={1}>{center.name}</Text>
                <Text style={[styles.typeLabel, { color: center.color }]}>
                  {center.typeLabel}
                </Text>
                
                {/* Location Row */}
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={14} color={colors.textMuted} />
                  <Text style={styles.locationText} numberOfLines={1}>{center.address}</Text>
                </View>

                {/* Meta Row */}
                <View style={styles.metaRow}>
                  <View style={styles.ratingWrap}>
                    <Ionicons name="star" size={14} color="#F5A623" />
                    <Text style={styles.ratingText}>{center.rating}</Text>
                    <Text style={styles.reviewsText}>({center.reviews})</Text>
                  </View>
                  <View style={styles.metaDot} />
                  <View style={styles.servicesWrap}>
                    <Ionicons name="medical-outline" size={12} color={colors.textMuted} />
                    <Text style={styles.servicesText}>{center.services.length} services</Text>
                  </View>
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
        {filteredCenters.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconWrap}>
              <Ionicons name="search-outline" size={32} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>No centers found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery ? `No results for "${searchQuery}"` : "Try selecting different filters"}
            </Text>
            <Pressable
              style={styles.resetButton}
              onPress={() => {
                setSearchQuery("");
                setSelectedLocation("all");
                setSelectedType("all");
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
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.bgCard,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },
  // Type Filter
  typeFilterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  typeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: colors.bgCard,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  typeChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeChipText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  typeChipTextActive: {
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
  // Centers List
  centersList: {
    gap: 12,
  },
  centerCard: {
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
  centerIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    position: "relative",
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
  centerContent: {
    flex: 1,
  },
  centerName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 2,
  },
  typeLabel: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 6,
  },
  locationText: {
    fontSize: 12,
    color: colors.textMuted,
    flex: 1,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
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
  servicesWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  servicesText: {
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
