import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProfessionalDetails } from "../../../api/directory.api";
import { colors, sectionSpacing, spacing, typography } from "../../../theme";

export default function ProfessionalDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data: professional, isLoading } = useQuery({
    queryKey: ["professional", id],
    queryFn: () => getProfessionalDetails(id as string),
  });

  const handleCall = () => {
    if (professional?.phone) {
      Linking.openURL(`tel:${professional.phone}`);
    }
  };

  const handleEmail = () => {
    if (professional?.email) {
      Linking.openURL(`mailto:${professional.email}`);
    }
  };

  const renderStars = (rating: number) => {
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
        <Text style={styles.ratingNumber}>{rating.toFixed(1)}</Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.wrapper} edges={["top"]}>
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading...</Text>
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
        <Text style={styles.title}>{professional?.name}</Text>
        
        {/* Specialty */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specialty</Text>
          <View style={styles.specialtyBadge}>
            <Text style={styles.specialtyText}>{professional?.specialty}</Text>
          </View>
        </View>

        {/* Rating */}
        {professional?.rating !== undefined && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rating</Text>
            {renderStars(professional.rating)}
          </View>
        )}

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          {professional?.phone && (
            <TouchableOpacity style={styles.infoRow} onPress={handleCall}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoLink}>📞 {professional.phone}</Text>
            </TouchableOpacity>
          )}
          {professional?.email && (
            <TouchableOpacity style={styles.infoRow} onPress={handleEmail}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoLink}>✉️ {professional.email}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Location */}
        {(professional?.city || professional?.address) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            {professional?.address && (
              <Text style={styles.infoValue}>📍 {professional.address}</Text>
            )}
            {professional?.city && (
              <Text style={styles.cityText}>{professional.city}</Text>
            )}
          </View>
        )}

        {/* Center */}
        {professional?.centerName && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Center</Text>
            <Text style={styles.infoValue}>🏥 {professional.centerName}</Text>
          </View>
        )}

        {/* Description */}
        {professional?.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{professional.description}</Text>
          </View>
        )} 
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
    paddingBottom: spacing.pageBottom,
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
  section: {
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  sectionTitle: {
    fontSize: typography.h3,
    fontWeight: typography.weightSemibold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  specialtyBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#dbeafe",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
  },
  specialtyText: {
    fontSize: typography.body,
    color: "#1d4ed8",
    fontWeight: "600",
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starFilled: {
    fontSize: 18,
    color: "#f59e0b",
  },
  starHalf: {
    fontSize: 18,
    color: "#fcd34d",
  },
  starEmpty: {
    fontSize: 18,
    color: "#d1d5db",
  },
  ratingNumber: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  infoRow: {
    marginBottom: spacing.md,
  },
  infoLabel: {
    fontSize: typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  infoValue: {
    fontSize: typography.body,
    color: colors.text,
    lineHeight: typography.bodyLineHeight,
  },
  infoLink: {
    fontSize: typography.body,
    color: "#2563eb",
    textDecorationLine: "underline",
  },
  cityText: {
    fontSize: typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  description: {
    fontSize: typography.body,
    lineHeight: typography.bodyLineHeight,
    color: colors.textSecondary,
  },
});
