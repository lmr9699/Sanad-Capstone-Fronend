import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getCenters, getCities, getSpecialties } from "../../../api/centers.api";
import {
  cardShadow,
  colors,
  radius,
  sectionSpacing,
  spacing,
  typography,
} from "../../../theme";
import { Center } from "../../../types/directory.types";
import { useState } from "react";

export default function CentersScreen() {

  type FilterType = "all" | "public" | "private";

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

  const handleCall = async (phone: string) => {
    if (!phone) return;

    // Clean phone number for display
    const displayPhone = phone;

    Alert.alert(
      "Call Center",
      `Phone: ${displayPhone}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Call",
          onPress: async () => {
            try {
              // Clean phone number - remove spaces, dashes, and parentheses
              const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
              const url = `tel:${cleanPhone}`;

              const canOpen = await Linking.canOpenURL(url);
              if (canOpen) {
                await Linking.openURL(url);
              } else {
                Alert.alert("Error", "Cannot make phone calls on this device.");
              }
            } catch (error) {
              console.error("Error opening phone URL:", error);
              Alert.alert("Error", "Failed to open phone dialer.");
            }
          },
        },
      ]
    );
  };

  const handleEmail = async (email: string) => {
    if (!email) return;

    Alert.alert(
      "Email Center",
      `Email: ${email}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Send Email",
          onPress: async () => {
            try {
              const url = `mailto:${email}`;
              const canOpen = await Linking.canOpenURL(url);
              if (canOpen) {
                await Linking.openURL(url);
              } else {
                Alert.alert("Error", "Cannot send emails on this device.");
              }
            } catch (error) {
              console.error("Error opening email URL:", error);
              Alert.alert("Error", "Failed to open email client.");
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.wrapper} edges={["top"]}>
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading centers...</Text>
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
        <Text style={styles.title}>All Centers</Text>
        {centers?.map((center: Center) => (
          <TouchableOpacity
            key={center.id}
            style={[styles.centerCard, cardShadow]}
            onPress={() =>
              router.push(`/(tabs)/directory/center-details?id=${center.id}`)
            }
            activeOpacity={0.85}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardIcon}>
                <Ionicons name="medical" size={24} color={colors.primary} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.centerName}>{center.name}</Text>
                {center.type && (
                  <View style={[styles.typeBadge, center.type === "public" ? styles.publicBadge : styles.privateBadge]}>
                    <Text style={[styles.typeBadgeText, center.type === "public" ? styles.publicText : styles.privateText]}>
                      {center.type}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            {center.address && (
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={16} color={colors.textMuted} />
                <Text style={styles.infoText}>{center.address}</Text>
              </View>
            )}
            {(center.rating !== undefined || (center.reviews && center.reviews.length > 0)) && (
              <View style={styles.infoRow}>
                <Ionicons name="star" size={16} color={colors.warning} />
                <Text style={styles.infoText}>
                  {center.rating?.toFixed(1) || "0.0"}
                  {center.reviews && center.reviews.length > 0 && (
                    <Text style={styles.reviewsCount}>
                      {" "}({center.reviews.length} {center.reviews.length === 1 ? "review" : "reviews"})
                    </Text>
                  )}
                </Text>
              </View>
            )}
            <View style={styles.actionsRow}>
              {center.phone && (
                <Pressable
                  style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.7 }]}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleCall(center.phone as string);
                  }}
                >
                  <Ionicons name="call-outline" size={18} color={colors.primary} />
                  <Text style={styles.actionButtonText}>Call</Text>
                </Pressable>
              )}
              {center.email && (
                <Pressable
                  style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.7 }]}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleEmail(center.email as string);
                  }}
                >
                  <Ionicons name="mail-outline" size={18} color={colors.primary} />
                  <Text style={styles.actionButtonText}>Email</Text>
                </Pressable>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    color: colors.textSecondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundCard,
  },
  title: {
    fontSize: typography.title,
    lineHeight: typography.displayLineHeight,
    fontWeight: typography.weightBold,
    color: colors.text,
    marginBottom: sectionSpacing.default,
  },
  centerCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  cardContent: {
    flex: 1,
  },
  centerName: {
    fontSize: typography.h3,
    lineHeight: typography.h3LineHeight,
    fontWeight: typography.weightSemibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  typeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  publicBadge: {
    backgroundColor: `${colors.success}20`,
    borderWidth: 1,
    borderColor: `${colors.success}40`,
  },
  privateBadge: {
    backgroundColor: `${colors.warning}20`,
    borderWidth: 1,
    borderColor: `${colors.warning}40`,
  },
  typeBadgeText: {
    fontSize: typography.caption,
    fontWeight: typography.weightSemibold,
    textTransform: "capitalize",
  },
  publicText: {
    color: colors.success,
  },
  privateText: {
    color: colors.warning,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  infoText: {
    fontSize: typography.body,
    lineHeight: typography.bodyLineHeight,
    color: colors.textSecondary,
    flex: 1,
  },
  reviewsCount: {
    fontSize: typography.body,
    lineHeight: typography.bodyLineHeight,
    color: colors.textMuted,
  },
  actionsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: `${colors.primary}15`,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  actionButtonText: {
    fontSize: typography.caption,
    fontWeight: typography.weightSemibold,
    color: colors.primary,
  },
  // Filter Styles
  advancedFilterBtn: {
    backgroundColor: `${colors.primary}15`,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  advancedFilterText: {
    color: colors.primary,
    fontWeight: typography.weightSemibold,
    fontSize: typography.body,
  },
  activeFilters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  activeFilterChip: {
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  activeFilterText: {
    color: colors.primary,
    fontSize: typography.label,
    fontWeight: typography.weightMedium,
  },
  clearAllText: {
    color: colors.error,
    fontWeight: typography.weightMedium,
    paddingVertical: spacing.xs,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.backgroundCard,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    padding: spacing.xxl,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: typography.h1,
    lineHeight: typography.h1LineHeight,
    fontWeight: typography.weightBold,
    color: colors.text,
    marginBottom: spacing.xxl,
    textAlign: "left",
  },
  filterLabel: {
    fontSize: typography.h3,
    lineHeight: typography.h3LineHeight,
    fontWeight: typography.weightSemibold,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: "left",
  },
  cityChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundSecondary,
    marginLeft: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cityChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cityText: {
    color: colors.textMuted,
    fontWeight: typography.weightMedium,
    fontSize: typography.caption,
  },
  cityTextActive: {
    color: "#FFFFFF",
    fontWeight: typography.weightSemibold,
  },
  tagsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  tagOption: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagOptionActive: {
    backgroundColor: `${colors.primary}15`,
    borderColor: colors.primary,
  },
  tagOptionText: {
    color: colors.textMuted,
    fontSize: typography.caption,
    fontWeight: typography.weightMedium,
  },
  tagOptionTextActive: {
    color: colors.primary,
    fontWeight: typography.weightSemibold,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: sectionSpacing.default,
    gap: spacing.md,
  },
  clearBtn: {
    flex: 1,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    backgroundColor: colors.backgroundSecondary,
  },
  clearBtnText: {
    color: colors.textMuted,
    fontWeight: typography.weightSemibold,
    fontSize: typography.body,
  },
  applyBtn: {
    flex: 2,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    minHeight: 52,
    justifyContent: "center",
  },
  applyBtnText: {
    color: "#FFFFFF",
    fontWeight: typography.weightSemibold,
    fontSize: typography.body,
  },
});
