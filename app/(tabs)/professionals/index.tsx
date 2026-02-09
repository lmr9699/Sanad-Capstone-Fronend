// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import React from "react";
// import {
//   ActivityIndicator,
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useQuery } from "@tanstack/react-query";
// import { getProfessionals } from "../../../api/directory.api";


// // Design system colors
// const colors = {
//   bgApp: "#FAF9F6",
//   bgCard: "#FFFFFF",
//   primary: "#7FB77E",
//   primaryLight: "#E8F5E8",
//   secondary: "#5F8F8B",
//   text: "#2F2F2F",
//   textSecondary: "#4A4A4A",
//   textMuted: "#8A8A8A",
//   border: "rgba(0, 0, 0, 0.06)",
// };

// // Specializations for filtering
// const SPECIALIZATIONS = [
//   { id: "all", label: "All", icon: "apps-outline" },
//   { id: "speech", label: "Speech", icon: "chatbubble-outline" },
//   { id: "behavioral", label: "Behavioral", icon: "heart-outline" },
//   { id: "occupational", label: "Occupational", icon: "hand-left-outline" },
//   { id: "physical", label: "Physical", icon: "fitness-outline" },
//   { id: "educational", label: "Educational", icon: "school-outline" },
// ];

// export default function ProfessionalsScreen() {
//   const router = useRouter();
//   const [selectedFilter, setSelectedFilter] = React.useState("all");

//   // Fetch professionals from API
//   const { data: professionals = [], isLoading, error } = useQuery({
//     queryKey: ["professionals", selectedFilter],
//     queryFn: () =>
//       getProfessionals({
//         specialty: selectedFilter === "all" ? undefined : selectedFilter,
//       }),
//     retry: false,
//   });

//   // Calculate counts for each specialty
//   const specialtyCounts = React.useMemo(() => {
//     const counts: Record<string, number> = {};
//     professionals.forEach((prof) => {
//       counts[prof.specialty] = (counts[prof.specialty] || 0) + 1;
//     });
//     return counts;
//   }, [professionals]);

//   const specializationsWithCounts = SPECIALIZATIONS.map((spec) => ({
//     ...spec,
//     count: spec.id === "all" ? professionals.length : specialtyCounts[spec.id] || 0,
//   }));

//   const filteredProfessionals = professionals;

//   const handleProfessionalPress = (professionalId: string) => {
//     router.push({
//       pathname: "/(tabs)/professionals/professional-details",
//       params: { id: professionalId },
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={["top"]}>
//       <ScrollView
//         style={styles.scroll}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.headerIcon}>
//             <Ionicons name="people" size={24} color="#FFFFFF" />
//           </View>
//           <View style={styles.headerText}>
//             <Text style={styles.title}>Professionals</Text>
//             <Text style={styles.subtitle}>
//               Find specialists for your child&apos;s needs
//             </Text>
//           </View>
//         </View>

//         {/* Search Bar Placeholder */}
//         <Pressable style={styles.searchBar}>
//           <Ionicons name="search-outline" size={20} color={colors.textMuted} />
//           <Text style={styles.searchPlaceholder}>Search professionals...</Text>
//         </Pressable>

//         {/* Filter Section */}
//         <Text style={styles.sectionLabel}>Filter by Specialization</Text>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.filterScroll}
//           contentContainerStyle={styles.filterRow}
//         >
//           {specializationsWithCounts.map((spec) => (
//             <Pressable
//               key={spec.id}
//               style={({ pressed }) => [
//                 styles.filterChip,
//                 selectedFilter === spec.id && styles.filterChipActive,
//                 pressed && { transform: [{ scale: 0.96 }] },
//               ]}
//               onPress={() => setSelectedFilter(spec.id)}
//             >
//               <Ionicons
//                 name={spec.icon as any}
//                 size={18}
//                 color={selectedFilter === spec.id ? "#FFFFFF" : colors.textSecondary}
//               />
//               <Text
//                 style={[
//                   styles.filterChipText,
//                   selectedFilter === spec.id && styles.filterChipTextActive,
//                 ]}
//               >
//                 {spec.label}
//               </Text>
//               {spec.id !== "all" && (
//                 <View
//                   style={[
//                     styles.filterCount,
//                     selectedFilter === spec.id && styles.filterCountActive,
//                   ]}
//                 >
//                   <Text
//                     style={[
//                       styles.filterCountText,
//                       selectedFilter === spec.id && styles.filterCountTextActive,
//                     ]}
//                   >
//                     {spec.count}
//                   </Text>
//                 </View>
//               )}
//             </Pressable>
//           ))}
//         </ScrollView>

//         {/* Loading State */}
//         {isLoading && (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color={colors.primary} />
//             <Text style={styles.loadingText}>Loading professionals...</Text>
//           </View>
//         )}

//         {/* Error State */}
//         {error && (
//           <View style={styles.errorContainer}>
//             <Ionicons name="alert-circle-outline" size={48} color={colors.textMuted} />
//             <Text style={styles.errorText}>Failed to load professionals</Text>
//             <Text style={styles.errorSubtext}>Please try again later</Text>
//           </View>
//         )}

//         {/* Results Count */}
//         {!isLoading && !error && (
//           <>
//             <View style={styles.resultsHeader}>
//               <Text style={styles.resultsCount}>
//                 {filteredProfessionals.length} professional
//                 {filteredProfessionals.length !== 1 ? "s" : ""} found
//               </Text>
//               <Pressable style={styles.sortButton}>
//                 <Ionicons name="funnel-outline" size={16} color={colors.textSecondary} />
//                 <Text style={styles.sortButtonText}>Sort</Text>
//               </Pressable>
//             </View>

//             {/* Professionals List */}
//             <View style={styles.professionalsList}>
//               {filteredProfessionals.length === 0 ? (
//                 <View style={styles.emptyState}>
//                   <View style={styles.emptyIconWrap}>
//                     <Ionicons name="search-outline" size={32} color={colors.primary} />
//                   </View>
//                   <Text style={styles.emptyTitle}>No professionals found</Text>
//                   <Text style={styles.emptySubtitle}>
//                     Try selecting a different specialization
//                   </Text>
//                   <Pressable
//                     style={styles.resetButton}
//                     onPress={() => setSelectedFilter("all")}
//                   >
//                     <Text style={styles.resetButtonText}>Show All</Text>
//                   </Pressable>
//                 </View>
//               ) : (
//                 filteredProfessionals.map((professional) => (
//                   <Pressable
//                     key={professional.id}
//                     style={({ pressed }) => [
//                       styles.professionalCard,
//                       pressed && { transform: [{ scale: 0.98 }] },
//                     ]}
//                     onPress={() => handleProfessionalPress(professional.id)}
//                   >
//                     {/* Avatar */}
//                     <View
//                       style={[
//                         styles.avatarContainer,
//                         { backgroundColor: `${professional.color}15` },
//                       ]}
//                     >
//                       <Text style={[styles.avatarText, { color: professional.color }]}>
//                         {professional.name.split(" ").slice(1, 3).map(n => n[0]).join("")}
//                       </Text>
//                       {professional.verified && (
//                         <View style={styles.verifiedBadge}>
//                           <Ionicons name="checkmark" size={10} color="#FFFFFF" />
//                         </View>
//                       )}
//                     </View>

//                     {/* Content */}
//                     <View style={styles.professionalContent}>
//                       <View style={styles.nameRow}>
//                         <Text style={styles.professionalName}>{professional.name}</Text>
//                       </View>
//                       <Text style={[styles.specialtyLabel, { color: professional.color }]}>
//                         {professional.specialtyLabel}
//                       </Text>

//                       {/* Meta Row */}
//                       <View style={styles.metaRow}>
//                         <View style={styles.ratingWrap}>
//                           <Ionicons name="star" size={14} color="#F5A623" />
//                           <Text style={styles.ratingText}>{professional.rating}</Text>
//                           <Text style={styles.reviewsText}>({professional.reviews})</Text>
//                         </View>
//                         <View style={styles.metaDot} />
//                         <Text style={styles.experienceText}>{professional.experience}</Text>
//                       </View>

//                       {/* Availability */}
//                       <View style={styles.availabilityRow}>
//                         <View
//                           style={[
//                             styles.availabilityDot,
//                             professional.availability && typeof professional.availability === "string" && professional.availability.includes("today") && styles.availabilityDotActive,
//                           ]}
//                         />
//                         <Text
//                           style={[
//                             styles.availabilityText,
//                             professional.availability && typeof professional.availability === "string" && professional.availability.includes("today") && styles.availabilityTextActive,
//                           ]}
//                         >
//                           {professional.availability || "Not available"}
//                         </Text>
//                       </View>
//                     </View>

//                     {/* Arrow */}
//                     <View style={styles.arrowWrap}>
//                       <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
//                     </View>
//                   </Pressable>
//                 ))
//               )}
//             </View>
//           </>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.bgApp,
//   },
//   scroll: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 100,
//   },
//   // Header
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   headerIcon: {
//     width: 52,
//     height: 52,
//     borderRadius: 16,
//     backgroundColor: colors.secondary,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 14,
//   },
//   headerText: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "700",
//     color: colors.text,
//     letterSpacing: -0.5,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: colors.textSecondary,
//     marginTop: 4,
//   },
//   // Search Bar
//   searchBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.bgCard,
//     borderRadius: 14,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     marginBottom: 20,
//     gap: 10,
//     borderWidth: 1,
//     borderColor: colors.border,
//   },
//   searchPlaceholder: {
//     fontSize: 15,
//     color: colors.textMuted,
//   },
//   // Filter Section
//   sectionLabel: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: colors.textSecondary,
//     marginBottom: 12,
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
//   filterScroll: {
//     marginHorizontal: -20,
//     marginBottom: 20,
//   },
//   filterRow: {
//     flexDirection: "row",
//     gap: 10,
//     paddingHorizontal: 20,
//   },
//   filterChip: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 25,
//     backgroundColor: colors.bgCard,
//     borderWidth: 1.5,
//     borderColor: colors.border,
//   },
//   filterChipActive: {
//     backgroundColor: colors.primary,
//     borderColor: colors.primary,
//   },
//   filterChipText: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: colors.textSecondary,
//   },
//   filterChipTextActive: {
//     color: "#FFFFFF",
//   },
//   filterCount: {
//     backgroundColor: colors.bgApp,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 10,
//   },
//   filterCountActive: {
//     backgroundColor: "rgba(255, 255, 255, 0.25)",
//   },
//   filterCountText: {
//     fontSize: 11,
//     fontWeight: "600",
//     color: colors.textSecondary,
//   },
//   filterCountTextActive: {
//     color: "#FFFFFF",
//   },
//   // Results Header
//   resultsHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   resultsCount: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: colors.text,
//   },
//   sortButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     backgroundColor: colors.bgCard,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: colors.border,
//   },
//   sortButtonText: {
//     fontSize: 13,
//     color: colors.textSecondary,
//   },
//   // Professionals List
//   professionalsList: {
//     gap: 12,
//   },
//   professionalCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.bgCard,
//     borderRadius: 18,
//     padding: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   avatarContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 14,
//     position: "relative",
//   },
//   avatarText: {
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   verifiedBadge: {
//     position: "absolute",
//     bottom: -2,
//     right: -2,
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     backgroundColor: colors.primary,
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 2,
//     borderColor: colors.bgCard,
//   },
//   professionalContent: {
//     flex: 1,
//   },
//   nameRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     marginBottom: 2,
//   },
//   professionalName: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: colors.text,
//   },
//   specialtyLabel: {
//     fontSize: 13,
//     fontWeight: "500",
//     marginBottom: 6,
//   },
//   metaRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 6,
//   },
//   ratingWrap: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },
//   ratingText: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: colors.text,
//   },
//   reviewsText: {
//     fontSize: 12,
//     color: colors.textMuted,
//   },
//   metaDot: {
//     width: 3,
//     height: 3,
//     borderRadius: 1.5,
//     backgroundColor: colors.textMuted,
//     marginHorizontal: 8,
//   },
//   experienceText: {
//     fontSize: 12,
//     color: colors.textMuted,
//   },
//   availabilityRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },
//   availabilityDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: colors.textMuted,
//   },
//   availabilityDotActive: {
//     backgroundColor: "#4CAF50",
//   },
//   availabilityText: {
//     fontSize: 12,
//     color: colors.textMuted,
//   },
//   availabilityTextActive: {
//     color: "#4CAF50",
//     fontWeight: "500",
//   },
//   arrowWrap: {
//     width: 32,
//     height: 32,
//     borderRadius: 10,
//     backgroundColor: colors.bgApp,
//     alignItems: "center",
//     justifyContent: "center",
//     marginLeft: 8,
//   },
//   // Empty State
//   emptyState: {
//     alignItems: "center",
//     paddingVertical: 48,
//     paddingHorizontal: 24,
//   },
//   emptyIconWrap: {
//     width: 72,
//     height: 72,
//     borderRadius: 36,
//     backgroundColor: `${colors.primary}15`,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 16,
//   },
//   emptyTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: colors.text,
//     marginBottom: 8,
//   },
//   emptySubtitle: {
//     fontSize: 14,
//     color: colors.textMuted,
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   resetButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: colors.primary,
//     borderRadius: 10,
//   },
//   resetButtonText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#FFFFFF",
//   },
//   // Loading & Error States
//   loadingContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 40,
//   },
//   loadingText: {
//     marginTop: 12,
//     fontSize: 14,
//     color: colors.textSecondary,
//   },
//   errorContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 40,
//   },
//   errorText: {
//     marginTop: 16,
//     fontSize: 16,
//     fontWeight: "600",
//     color: colors.text,
//   },
//   errorSubtext: {
//     marginTop: 4,
//     fontSize: 14,
//     color: colors.textMuted,
//   },
// });


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

  // States للفلترة
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchText, setSearchText] = useState("");

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

  // تبديل الـ tag
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // إعادة تعيين الفلاتر
  const resetFilters = () => {
    setSelectedSpecialty("all");
    setSelectedCity("all");
    setSelectedTags([]);
    setSearchText("");
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
            onPress={() => setShowFilters(true)}
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
            console.log("Professional PAGE", professional),
            <TouchableOpacity
              key={professional.id}
              style={[styles.professionalCard, cardShadow]}
              onPress={() =>
                router.push(
                  `/(tabs)/professionals/professional-details?id=${professional.id}`
                )
              }
              activeOpacity={0.85}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.professionalName}>{professional.name}</Text>
                {/* Rating Display */}
                {professional.rating !== undefined && (
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingStar}>⭐</Text>
                    <Text style={styles.ratingText}>
                      {professional.rating.toFixed(1)}
                    </Text>
                  </View>
                )}
              </View>

              {/* Specialty Badge */}
              <View style={styles.specialtyBadge}>
                <Text style={styles.specialtyText}>{professional.specialty}</Text>
              </View>

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
                      selectedSpecialty === "all" && styles.filterOptionActive,
                    ]}
                    onPress={() => setSelectedSpecialty("all")}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        selectedSpecialty === "all" && styles.filterOptionTextActive,
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
                        selectedSpecialty === spec && styles.filterOptionActive,
                      ]}
                      onPress={() => setSelectedSpecialty(spec)}
                    >
                      <Text
                        style={[
                          styles.filterOptionText,
                          selectedSpecialty === spec && styles.filterOptionTextActive,
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
                      selectedCity === "all" && styles.filterOptionActive,
                    ]}
                    onPress={() => setSelectedCity("all")}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        selectedCity === "all" && styles.filterOptionTextActive,
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
                        selectedCity === city && styles.filterOptionActive,
                      ]}
                      onPress={() => setSelectedCity(city)}
                    >
                      <Text
                        style={[
                          styles.filterOptionText,
                          selectedCity === city && styles.filterOptionTextActive,
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
                        selectedTags.includes(tag) && styles.tagFilterOptionActive,
                      ]}
                      onPress={() => toggleTag(tag)}
                    >
                      <Text
                        style={[
                          styles.tagFilterOptionText,
                          selectedTags.includes(tag) && styles.tagFilterOptionTextActive,
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
                onPress={resetFilters}
              >
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setShowFilters(false)}
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
