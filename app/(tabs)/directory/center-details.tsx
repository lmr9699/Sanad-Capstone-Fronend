import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getCenterDetails } from "../../../api/directory.api";
import { cardShadow, colors, radius, sectionSpacing, spacing, typography } from "../../../theme";

export default function CenterDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data: center, isLoading, isError } = useQuery({
    queryKey: ["center", id],
    queryFn: () => getCenterDetails(id as string),
    enabled: !!id,
  });

  const handleCall = () => {
    if (center?.phone) {
      Linking.openURL(`tel:${center.phone}`);
    }
  };

  const handleEmail = () => {
    if (center?.email) {
      Linking.openURL(`mailto:${center.email}`);
    }
  };

  const handleOpenMap = () => {
    if (center?.address) {
      const encodedAddress = encodeURIComponent(`${center.address}, ${center.city}`);
      const mapUrl = Platform.select({
        ios: `maps:0,0?q=${encodedAddress}`,
        android: `geo:0,0?q=${encodedAddress}`,
        default: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      });
      Linking.openURL(mapUrl);
    }
  };

  const renderStars = (rating: number = 0) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <View style={styles.starsContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <Text key={`full-${i}`} style={styles.starFilled}>★</Text>
        ))}
        {hasHalfStar && <Text style={styles.starHalf}>★</Text>}
        {[...Array(emptyStars)].map((_, i) => (
          <Text key={`empty-${i}`} style={styles.starEmpty}>☆</Text>
        ))}
        {rating > 0 && (
          <Text style={styles.ratingNumber}>{rating.toFixed(1)}</Text>
        )}
      </View>
    );
  };

  // Loading State
  if (isLoading) {
    return (
      <SafeAreaView style={styles.wrapper} edges={["top"]}>
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Center Details</Text>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading center details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error State
  if (isError || !center) {
    return (
      <SafeAreaView style={styles.wrapper} edges={["top"]}>
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Center Details</Text>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
          <Text style={styles.errorText}>Center not found</Text>
          <Text style={styles.errorSubtext}>
            {isError ? "Failed to load center details" : "The center you're looking for doesn't exist"}
          </Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.wrapper} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Center Details</Text>
        <Pressable style={styles.shareBtn}>
          <Ionicons name="share-outline" size={22} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Center Name & Type Badge */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{center.name}</Text>
          {center.type && (
            <View style={[styles.typeBadge, center.type === "public" ? styles.publicBadge : styles.privateBadge]}>
              <Text style={[styles.typeBadgeText, center.type === "public" ? styles.publicText : styles.privateText]}>
                {center.type}
              </Text>
            </View>
          )}
        </View>

        {/* Rating */}
        {center.rating !== undefined && center.rating > 0 && (
          <View style={styles.ratingContainer}>
            {renderStars(center.rating)}
          </View>
        )}

        {/* Quick Info Card */}
        <View style={[styles.quickInfoCard, cardShadow]}>
          {center.address && (
            <>
              <View style={styles.quickInfoRow}>
                <Ionicons name="location-outline" size={20} color={colors.primary} />
                <View style={styles.quickInfoContent}>
                  <Text style={styles.quickInfoLabel}>Address</Text>
                  <Text style={styles.quickInfoValue}>{center.address}</Text>
                  {center.city && (
                    <Text style={styles.cityText}>{center.city}</Text>
                  )}
                </View>
              </View>
              <View style={styles.quickInfoDivider} />
            </>
          )}
          {center.phone && (
            <>
              <View style={styles.quickInfoRow}>
                <Ionicons name="call-outline" size={20} color={colors.primary} />
                <View style={styles.quickInfoContent}>
                  <Text style={styles.quickInfoLabel}>Phone</Text>
                  <Text style={styles.quickInfoValue}>{center.phone}</Text>
                </View>
              </View>
              <View style={styles.quickInfoDivider} />
            </>
          )}
          {center.email && (
            <>
              <View style={styles.quickInfoRow}>
                <Ionicons name="mail-outline" size={20} color={colors.primary} />
                <View style={styles.quickInfoContent}>
                  <Text style={styles.quickInfoLabel}>Email</Text>
                  <Text style={styles.quickInfoValue}>{center.email}</Text>
                </View>
              </View>
              <View style={styles.quickInfoDivider} />
            </>
          )}
          {center.operatingHours && (
            <View style={styles.quickInfoRow}>
              <Ionicons name="time-outline" size={20} color={colors.primary} />
              <View style={styles.quickInfoContent}>
                <Text style={styles.quickInfoLabel}>Operating Hours</Text>
                <Text style={styles.quickInfoValue}>{center.operatingHours}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Description Section */}
        {center.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.descriptionText}>{center.description}</Text>
          </View>
        )}

        {/* Specialties Section */}
        {center.specialties && center.specialties.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specialties</Text>
            <View style={styles.specialtiesContainer}>
              {center.specialties.map((specialty, index) => (
                <View key={index} style={styles.specialtyChip}>
                  <Text style={styles.specialtyChipText}>{specialty}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
        {center.address && (
          <TouchableOpacity
            style={styles.mapButton}
            onPress={handleOpenMap}
            activeOpacity={0.7}
          >
            <Ionicons name="map-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
        {center.phone && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleCall}
            activeOpacity={0.7}
          >
            <Ionicons name="call-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
        {center.email && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleEmail}
            activeOpacity={0.7}
          >
            <Ionicons name="mail-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.backgroundCard,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: typography.h3,
    fontWeight: typography.weightSemibold,
    color: colors.text,
  },
  shareBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.backgroundCard,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRight: {
    width: 40,
  },
  // Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: 100,
  },
  // Title Section
  titleSection: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.title,
    lineHeight: typography.displayLineHeight,
    fontWeight: typography.weightBold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  typeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
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
  // Rating
  ratingContainer: {
    marginBottom: spacing.xl,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  starFilled: {
    fontSize: 18,
    color: colors.warning,
  },
  starHalf: {
    fontSize: 18,
    color: `${colors.warning}CC`,
  },
  starEmpty: {
    fontSize: 18,
    color: colors.border,
  },
  ratingNumber: {
    marginLeft: spacing.sm,
    fontSize: typography.body,
    fontWeight: typography.weightSemibold,
    color: colors.text,
  },
  // Quick Info Card
  quickInfoCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: sectionSpacing.default,
  },
  quickInfoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  quickInfoContent: {
    flex: 1,
  },
  quickInfoLabel: {
    fontSize: typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  quickInfoValue: {
    fontSize: typography.body,
    fontWeight: typography.weightSemibold,
    color: colors.text,
    lineHeight: typography.bodyLineHeight,
  },
  cityText: {
    fontSize: typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  quickInfoDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  // Section
  section: {
    marginBottom: sectionSpacing.default,
  },
  sectionTitle: {
    fontSize: typography.h3,
    fontWeight: typography.weightBold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  descriptionText: {
    fontSize: typography.body,
    lineHeight: typography.bodyLineHeight,
    color: colors.textSecondary,
  },
  // Specialties
  specialtiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  specialtyChip: {
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  specialtyChipText: {
    fontSize: typography.caption,
    color: colors.primary,
    fontWeight: typography.weightMedium,
  },
  // Bottom Actions
  bottomActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    paddingBottom: 32,
    backgroundColor: colors.backgroundCard,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    width: 52,
    height: 52,
    borderRadius: radius.lg,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
  },
  mapButton: {
    width: 52,
    height: 52,
    borderRadius: radius.lg,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
  },
  // Loading & Error States
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  errorText: {
    fontSize: typography.h3,
    fontWeight: typography.weightSemibold,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  errorSubtext: {
    fontSize: typography.body,
    color: colors.textMuted,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: typography.body,
    fontWeight: typography.weightSemibold,
  },
});
