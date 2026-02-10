import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getProfessionals,
  getProfessionalSpecialties,
  getProfessionalTags,
  getCities,
} from "../../../api/directory.api";
import {
  cardShadow,
  colors,
  radius,
  sectionSpacing,
  spacing,
  typography,
} from "../../../theme";
import { Professional } from "../../../types/directory.types";


//const CATEGORIES = [
//{ key: "all", label: "All" },
//{ key: "Pediatrician", label: "Doctor" },
//{ key: "Speech Therapist", label: "Speech" },
//{ key: "Physiotherapist", label: "Physio" },
//];

export default function ProfessionalsScreen() {
  const router = useRouter();

  // States للفلترة (المطبقة فعلياً)
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  // States مؤقتة للفلترة في الـ Modal (قبل الضغط على Apply)
  const [tempSpecialty, setTempSpecialty] = useState<string>("all");
  const [tempCity, setTempCity] = useState<string>("all");
  const [tempTags, setTempTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // جلب قوائم الفلترة
  const { data: specialties = [] } = useQuery({
    queryKey: ["professional-specialties"],
    queryFn: getProfessionalSpecialties,
  });

  const { data: tags = [] } = useQuery({
    queryKey: ["professional-tags"],
    queryFn: getProfessionalTags,
  });

  const { data: cities = [] } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  // جلب المهنيين مع الفلترة
  const { data: professionals, isLoading } = useQuery({
    queryKey: ["professionals", selectedSpecialty, selectedCity, selectedTags, searchText],
    queryFn: () =>
      getProfessionals({
        specialty: selectedSpecialty === "all" ? undefined : selectedSpecialty,
        city: selectedCity === "all" ? undefined : selectedCity,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        search: searchText || undefined,
      }),
  });

  // تبديل الـ tag في الـ Modal
  const toggleTag = (tag: string) => {
    setTempTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // تطبيق الفلاتر عند الضغط على Apply
  const applyFilters = () => {
    setSelectedSpecialty(tempSpecialty);
    setSelectedCity(tempCity);
    setSelectedTags([...tempTags]);
    setShowFilters(false);
  };

  // إعادة تعيين الفلاتر
  const resetFilters = () => {
    setTempSpecialty("all");
    setTempCity("all");
    setTempTags([]);
    setSelectedSpecialty("all");
    setSelectedCity("all");
    setSelectedTags([]);
    setSearchText("");
  };

  // تهيئة الفلاتر المؤقتة عند فتح الـ Modal
  const openFiltersModal = () => {
    setTempSpecialty(selectedSpecialty);
    setTempCity(selectedCity);
    setTempTags([...selectedTags]);
    setShowFilters(true);
  };

  // حساب عدد الفلاتر النشطة
  const activeFiltersCount =
    (selectedSpecialty !== "all" ? 1 : 0) +
    (selectedCity !== "all" ? 1 : 0) +
    selectedTags.length;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.wrapper} edges={["top"]}>
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading professionals...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.wrapper} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Healthcare Professionals</Text>


        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a professional..."
            placeholderTextColor={colors.textMuted}
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={openFiltersModal}
          >
            <Text style={styles.filterButtonText}>
              🔍 Filter {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Active Filters Display */}
        {(selectedSpecialty !== "all" || selectedCity !== "all" || selectedTags.length > 0) && (
          <View style={styles.activeFiltersContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedSpecialty !== "all" && (
                <View style={styles.activeFilterTag}>
                  <Text style={styles.activeFilterText}>
                    Specialty: {selectedSpecialty}
                  </Text>
                  <TouchableOpacity onPress={() => setSelectedSpecialty("all")}>
                    <Text style={styles.removeFilter}>✕</Text>
                  </TouchableOpacity>
                </View>
              )}
              {selectedCity !== "all" && (
                <View style={styles.activeFilterTag}>
                  <Text style={styles.activeFilterText}>
                    City: {selectedCity}
                  </Text>
                  <TouchableOpacity onPress={() => setSelectedCity("all")}>
                    <Text style={styles.removeFilter}>✕</Text>
                  </TouchableOpacity>
                </View>
              )}
              {selectedTags.map(tag => (
                <View key={tag} style={styles.activeFilterTag}>
                  <Text style={styles.activeFilterText}>{tag}</Text>
                  <TouchableOpacity onPress={() => toggleTag(tag)}>
                    <Text style={styles.removeFilter}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                style={styles.clearAllButton}
                onPress={resetFilters}
              >
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}

        {professionals?.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No professionals found</Text>
          </View>
        ) : (
          professionals?.map((professional: Professional) => (
            <TouchableOpacity
              key={professional.id}
              style={[styles.professionalCard, cardShadow]}
              onPress={() =>
                router.push(
                  `/(tabs)/directory/professional-details?id=${professional.id}`
                )
              }
              activeOpacity={0.85}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.professionalName}>{professional.name}</Text>
                {/* Rating Display */}
                {professional.rating !== undefined && (
                  <View style={styles.ratingContainer}>
                    <Text style={styles.specialtyText}>{professional.specialty}</Text>
                    {/* <Text style={styles.ratingStar}>⭐</Text>
                    <Text style={styles.ratingText}>
                      {professional.rating.toFixed(1)}
                    </Text> */}
                  </View>
                )}
              </View>

              {/* Specialty Badge */}
              {/* <View style={styles.specialtyBadge}>
                <Text style={styles.specialtyText}>{professional.specialty}</Text>
              </View> */}

              {/* Display City */}
              {/* {professional.city && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>📍 {professional.city}</Text>
        </View>
      )} */}

              {/* Display Center */}
              {professional.centerName && (
                <View style={styles.centerContainer}>
                  <Text style={styles.centerText}>🏥 {professional.centerName}</Text>
                </View>
              )}

              {/* Display Tags */}
              {professional.specialtyLabel && professional.specialtyLabel.length > 0 && (
                <View style={styles.tagsContainer}>
                  {/* {professional.tags.map((tag, index) => (
            <View key={index} style={styles.tagBadge}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))} */}
                  <Text style={styles.tagText}>{professional.specialtyLabel}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Professionals</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* Specialty Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Specialty</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity
                    style={[
                      styles.filterOption,
                      tempSpecialty === "all" && styles.filterOptionActive,
                    ]}
                    onPress={() => setTempSpecialty("all")}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        tempSpecialty === "all" && styles.filterOptionTextActive,
                      ]}
                    >
                      All
                    </Text>
                  </TouchableOpacity>
                  {specialties.map((spec) => (
                    <TouchableOpacity
                      key={spec}
                      style={[
                        styles.filterOption,
                        tempSpecialty === spec && styles.filterOptionActive,
                      ]}
                      onPress={() => setTempSpecialty(spec)}
                    >
                      <Text
                        style={[
                          styles.filterOptionText,
                          tempSpecialty === spec && styles.filterOptionTextActive,
                        ]}
                      >
                        {spec}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* City Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>City</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity
                    style={[
                      styles.filterOption,
                      tempCity === "all" && styles.filterOptionActive,
                    ]}
                    onPress={() => setTempCity("all")}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        tempCity === "all" && styles.filterOptionTextActive,
                      ]}
                    >
                      All
                    </Text>
                  </TouchableOpacity>
                  {cities.map((city) => (
                    <TouchableOpacity
                      key={city}
                      style={[
                        styles.filterOption,
                        tempCity === city && styles.filterOptionActive,
                      ]}
                      onPress={() => setTempCity(city)}
                    >
                      <Text
                        style={[
                          styles.filterOptionText,
                          tempCity === city && styles.filterOptionTextActive,
                        ]}
                      >
                        {city}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Tags Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Tags</Text>
                <View style={styles.tagsGrid}>
                  {tags.map((tag) => (
                    <TouchableOpacity
                      key={tag}
                      style={[
                        styles.tagFilterOption,
                        tempTags.includes(tag) && styles.tagFilterOptionActive,
                      ]}
                      onPress={() => toggleTag(tag)}
                    >
                      <Text
                        style={[
                          styles.tagFilterOptionText,
                          tempTags.includes(tag) && styles.tagFilterOptionTextActive,
                        ]}
                      >
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setTempSpecialty("all");
                  setTempCity("all");
                  setTempTags([]);
                }}
              >
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilters}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>

  );
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  container: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: 100,
  },
  loadingText: {
    fontSize: typography.body,
    color: colors.textMuted,
  },
  title: {
    fontSize: typography.title,
    lineHeight: typography.h1LineHeight,
    fontWeight: typography.weightBold,
    color: colors.text,
    marginBottom: sectionSpacing.default,
  },
  // Search and Filter
  searchContainer: {
    flexDirection: "row",
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.backgroundCard,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.body,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    justifyContent: "center",
  },
  filterButtonText: {
    color: "#FFFFFF",
    fontSize: typography.body,
    fontWeight: "600",
  },
  // Active Filters
  activeFiltersContainer: {
    marginBottom: spacing.md,
  },
  activeFilterTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full || 20,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  activeFilterText: {
    fontSize: typography.caption,
    color: colors.primary,
    marginRight: spacing.xs,
  },
  removeFilter: {
    fontSize: typography.caption,
    color: colors.primary,
    fontWeight: "bold",
  },
  clearAllButton: {
    backgroundColor: colors.errorLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full || 20,
  },
  clearAllText: {
    fontSize: typography.caption,
    color: colors.error,
    fontWeight: "600",
  },
  // Professional Card
  professionalCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  professionalName: {
    fontSize: typography.h3,
    lineHeight: typography.h3LineHeight,
    fontWeight: typography.weightSemibold,
    color: colors.text,
    flex: 1,
  },
  // Rating
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${colors.warning}20`,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm || 8,
  },
  ratingStar: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: typography.caption,
    fontWeight: "600",
    color: colors.warning,
  },
  // Specialty Badge
  specialtyBadge: {
    alignSelf: "flex-start",
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.md || 12,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  specialtyText: {
    fontSize: typography.caption,
    color: colors.primary,
    fontWeight: "500",
  },
  locationContainer: {
    marginTop: spacing.xs,
  },
  locationText: {
    fontSize: typography.caption,
    color: colors.textMuted,
  },
  centerContainer: {
    marginTop: spacing.xs,
  },
  centerText: {
    fontSize: typography.caption,
    color: colors.textMuted,
  },
  // Contact Information
  contactContainer: {
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  contactIcon: {
    fontSize: 14,
  },
  contactText: {
    fontSize: typography.caption,
    color: colors.text,
    fontWeight: "500",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  tagBadge: {
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.xl || 28,
    borderTopRightRadius: radius.xl || 28,
    maxHeight: "80%",
    paddingBottom: spacing.xl,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: typography.h3,
    fontWeight: typography.weightBold,
    color: colors.text,
  },
  closeButton: {
    fontSize: typography.h2,
    color: colors.textMuted,
  },
  modalBody: {
    padding: spacing.lg,
  },
  filterSection: {
    marginBottom: spacing.xl,
  },
  filterSectionTitle: {
    fontSize: typography.h3,
    fontWeight: typography.weightSemibold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  filterOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full || 20,
    backgroundColor: colors.backgroundSecondary,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterOptionActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterOptionText: {
    fontSize: typography.body,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  filterOptionTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  tagsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  tagFilterOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagFilterOptionActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tagFilterOptionText: {
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  tagFilterOptionTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  modalFooter: {
    flexDirection: "row",
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  clearButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundSecondary,
  },
  clearButtonText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    fontWeight: "600",
  },
  applyButton: {
    flex: 2,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontSize: typography.body,
    fontWeight: "600",
  },
  // Empty State
  emptyState: {
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  emptyText: {
    fontSize: typography.body,
    color: colors.textMuted,
  },
});
