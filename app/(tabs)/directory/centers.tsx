import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCenters, getCities, getSpecialties } from "../../../api/directory.api";
import { HealthCenter } from "../../../types/directory.types";

type FilterType = "all" | "public" | "private";

export default function CentersScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedCity, setSelectedCity] = useState<string>("");
const [selectedTags, setSelectedTags] = useState<string[]>([]);
const [showFilters, setShowFilters] = useState(false);

    // جلب قائمة المدن
    const { data: cities = [] } = useQuery({
      queryKey: ["cities"],
      queryFn: getCities,
    });
  
    //
    const { data: specialties = [] } = useQuery({
      queryKey: ["specialties"],
      queryFn: getSpecialties,
    });
  
    
    const { data: centers, isLoading } = useQuery({
      queryKey: ["centers", filter, selectedCity, selectedTags],
      queryFn: () =>
        getCenters({
          type: filter === "all" ? undefined : filter,
          city: selectedCity || undefined,
          specialties: selectedTags.length > 0 ? selectedTags : undefined,
        }),
    });
      
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  
  const clearFilters = () => {
    setFilter("all");
    setSelectedCity("");
    setSelectedTags([]);
  };

  
  const activeFiltersCount =
    (filter !== "all" ? 1 : 0) +
    (selectedCity ? 1 : 0) +
    selectedTags.length;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading centers...</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Health Centers</Text>
      <Text style={styles.subtitle}>Find services near you</Text>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterBtn, filter === "all" && styles.filterBtnActive]}
          onPress={() => setFilter("all")}
        >
          <Text style={[styles.filterText, filter === "all" && styles.filterTextActive]}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filter === "public" && styles.filterBtnActive]}
          onPress={() => setFilter("public")}
        >
          <Text style={[styles.filterText, filter === "public" && styles.filterTextActive]}>
            Public
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filter === "private" && styles.filterBtnActive]}
          onPress={() => setFilter("private")}
        >
          <Text style={[styles.filterText, filter === "private" && styles.filterTextActive]}>
            Private
          </Text>
        </TouchableOpacity>
      </View>
            {/* زر فتح نافذة الفلاتر */}
            <TouchableOpacity
        style={styles.advancedFilterBtn}
        onPress={() => setShowFilters(true)}
      >
        <Text style={styles.advancedFilterText}>
        🔍 Filter {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </Text>
      </TouchableOpacity>

      {/* عرض الفلاتر النشطة */}
      {(selectedCity || selectedTags.length > 0) && (
        <View style={styles.activeFilters}>
          {selectedCity && (
            <TouchableOpacity
              style={styles.activeFilterChip}
              onPress={() => setSelectedCity("")}
            >
              <Text style={styles.activeFilterText}>📍 {selectedCity} ✕</Text>
            </TouchableOpacity>
          )}
          {selectedTags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={styles.activeFilterChip}
              onPress={() => toggleTag(tag)}
            >
              <Text style={styles.activeFilterText}>{tag} ✕</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={clearFilters}>
          <Text style={styles.clearAllText}>Clear all</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Results Count */}
      <Text style={styles.resultsCount}>
        {centers?.length || 0} center{centers?.length !== 1 ? "s" : ""} found
      </Text>
            {/* Centers List */}
            {centers?.map((center: HealthCenter) => (
        <TouchableOpacity
          key={center.id}
          style={styles.centerCard}
          onPress={() => router.push(`/(tabs)/directory/center-details?id=${center.id}`)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.centerName}>{center.name}</Text>
            <View
              style={[
                styles.typeBadge,
                center.type === "public" ? styles.publicBadge : styles.privateBadge,
              ]}
            >
              <Text
                style={[
                  styles.typeBadgeText,
                  center.type === "public" ? styles.publicText : styles.privateText,
                ]}
              >
                {center.type}
              </Text>
            </View>
          </View>
          <Text style={styles.centerAddress}>{center.address}</Text>
          {center.rating && (
  <Text style={styles.rating}>⭐ {center.rating.toFixed(1)}</Text>
)}
        </TouchableOpacity>
      ))}
            {/* نافذة الفلاتر */}
            <Modal visible={showFilters} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filter Centers</Text>

            {/* اختيار المدينة */}
            <Text style={styles.filterLabel}>📍 Location</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={[styles.cityChip, !selectedCity && styles.cityChipActive]}
                onPress={() => setSelectedCity("")}
              >
                <Text style={[styles.cityText, !selectedCity && styles.cityTextActive]}>
                All Cities
                </Text>
              </TouchableOpacity>
              {cities.map((city: string) => (
                <TouchableOpacity
                  key={city}
                  style={[styles.cityChip, selectedCity === city && styles.cityChipActive]}
                  onPress={() => setSelectedCity(city)}
                >
                  <Text style={[styles.cityText, selectedCity === city && styles.cityTextActive]}>
                    {city}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* اختيار الخدمات */}
            <Text style={[styles.filterLabel, { marginTop: 24 }]}>🏥 Services</Text>
            <View style={styles.tagsGrid}>
              {specialties.map((tag: string) => (
                <TouchableOpacity
                  key={tag}
                  style={[styles.tagOption, selectedTags.includes(tag) && styles.tagOptionActive]}
                  onPress={() => toggleTag(tag)}
                >
                  <Text
                    style={[
                      styles.tagOptionText,
                      selectedTags.includes(tag) && styles.tagOptionTextActive,
                    ]}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* أزرار */}
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.clearBtn} onPress={clearFilters}>
                <Text style={styles.clearBtnText}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.applyBtnText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 8,
  },
  filterBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#f3f4f6",
  },
  filterBtnActive: {
    backgroundColor: "#2563eb",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  filterTextActive: {
    color: "#fff",
  },
  resultsCount: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 16,
  },
  centerCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  centerName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  publicBadge: {
    backgroundColor: "#dcfce7",
  },
  privateBadge: {
    backgroundColor: "#fef3c7",
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  publicText: {
    color: "#15803d",
  },
  privateText: {
    color: "#b45309",
  },
  rating: {
    fontSize: 14,
    color: "#f59e0b",
    fontWeight: "600",
    marginTop: 4,
  },
  centerAddress: {
    fontSize: 14,
    color: "#666",
  },
    // Styles للفلاتر الجديدة
    advancedFilterBtn: {
      backgroundColor: "#f0f9ff",
      padding: 14,
      borderRadius: 12,
      marginBottom: 12,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#bfdbfe",
    },
    advancedFilterText: {
      color: "#2563eb",
      fontWeight: "600",
      fontSize: 16,
    },
    activeFilters: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 12,
    },
    activeFilterChip: {
      backgroundColor: "#e0e7ff",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    activeFilterText: {
      color: "#4338ca",
      fontSize: 13,
    },
    clearAllText: {
      color: "#dc2626",
      fontWeight: "500",
      paddingVertical: 6,
    },
    // Modal styles
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: "#fff",
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      padding: 24,
      maxHeight: "80%",
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#1f2937",
      marginBottom: 24,
      textAlign: "left",
    },
    filterLabel: {
      fontSize: 17,
      fontWeight: "600",
      color: "#374151",
      marginBottom: 12,
      textAlign: "left",
    },
    cityChip: {
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 22,
      backgroundColor: "#f3f4f6",
      marginLeft: 8,
    },
    cityChipActive: {
      backgroundColor: "#2563eb",
    },
    cityText: {
      color: "#6b7280",
      fontWeight: "500",
    },
    cityTextActive: {
      color: "#fff",
    },
    tagsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    tagOption: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: "#f3f4f6",
      borderWidth: 1,
      borderColor: "#e5e7eb",
    },
    tagOptionActive: {
      backgroundColor: "#dbeafe",
      borderColor: "#2563eb",
    },
    tagOptionText: {
      color: "#6b7280",
      fontSize: 14,
    },
    tagOptionTextActive: {
      color: "#2563eb",
      fontWeight: "600",
    },
    modalActions: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 28,
      gap: 12,
    },
    clearBtn: {
      flex: 1,
      paddingVertical: 16,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      alignItems: "center",
    },
    clearBtnText: {
      color: "#6b7280",
      fontWeight: "600",
    },
    applyBtn: {
      flex: 2,
      paddingVertical: 16,
      borderRadius: 14,
      backgroundColor: "#2563eb",
      alignItems: "center",
    },
    applyBtnText: {
      color: "#fff",
      fontWeight: "600",
    },
});
