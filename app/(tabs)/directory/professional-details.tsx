import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProfessionalDetails } from "../../../api/directory.api";
import { colors, spacing } from "../../../theme";

export default function ProfessionalDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data: professional, isLoading, error } = useQuery({
    queryKey: ["professional", id],
    queryFn: () => getProfessionalDetails(id as string),
    enabled: !!id,
    retry: false,
  });

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
          <Text style={styles.headerTitle}>Professional Profile</Text>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading professional details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !professional) {
    return (
      <SafeAreaView style={styles.wrapper} edges={["top"]}>
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Professional Profile</Text>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.textMuted} />
          <Text style={styles.errorText}>Professional not found</Text>
          <Text style={styles.errorSubtext}>
            {error ? "Failed to load professional details" : "The professional you're looking for doesn't exist"}
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
        <Text style={styles.headerTitle}>Professional Profile</Text>
        <Pressable style={styles.shareBtn}>
          <Ionicons name="share-outline" size={22} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Hero */}
        <View style={styles.heroSection}>
          <View
            style={[
              styles.heroAvatar,
              { backgroundColor: `${professional.color}20` },
            ]}
          >
            <Text style={[styles.heroAvatarText, { color: professional.color }]}>
              {professional.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
            </Text>
            {professional.verified && (
              <View style={styles.verifiedBadgeLarge}>
                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
              </View>
            )}
          </View>

          <Text style={styles.professionalName}>{professional.name}</Text>
          <Text style={[styles.specialtyLabel, { color: professional.color }]}>
            {professional.specialtyLabel || professional.specialty}
          </Text>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.statIconWrap}>
                <Ionicons name="star" size={18} color="#F5A623" />
              </View>
              <Text style={styles.statValue}>{professional.rating?.toFixed(1) || "0.0"}</Text>
              <Text style={styles.statLabel}>{professional.reviews || 0} reviews</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.statIconWrap}>
                <Ionicons name="briefcase-outline" size={18} color={colors.primary} />
              </View>
              <Text style={styles.statValue}>{professional.experience || "N/A"}</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.statIconWrap}>
                <Ionicons name="time-outline" size={18} color={colors.secondary} />
              </View>
              <Text style={styles.statValue}>{professional.availability || "N/A"}</Text>
              <Text style={styles.statLabel}>Availability</Text>
            </View>
          </View>
        </View>

        {/* Quick Info Card */}
        <View style={styles.quickInfoCard}>
          {professional.nextAvailable && (
            <>
              <View style={styles.quickInfoRow}>
                <Ionicons name="calendar-outline" size={20} color={colors.primary} />
                <View style={styles.quickInfoContent}>
                  <Text style={styles.quickInfoLabel}>Next Available</Text>
                  <Text style={styles.quickInfoValue}>{professional.nextAvailable}</Text>
                </View>
              </View>
              <View style={styles.quickInfoDivider} />
            </>
          )}
          {professional.consultationFee && (
            <>
              <View style={styles.quickInfoRow}>
                <Ionicons name="cash-outline" size={20} color={colors.primary} />
                <View style={styles.quickInfoContent}>
                  <Text style={styles.quickInfoLabel}>Consultation Fee</Text>
                  <Text style={styles.quickInfoValue}>{professional.consultationFee}</Text>
                </View>
              </View>
              <View style={styles.quickInfoDivider} />
            </>
          )}
          {professional.location && (
            <View style={styles.quickInfoRow}>
              <Ionicons name="location-outline" size={20} color={colors.primary} />
              <View style={styles.quickInfoContent}>
                <Text style={styles.quickInfoLabel}>Location</Text>
                <Text style={styles.quickInfoValue}>{professional.location}</Text>
              </View>
            </View>
          )}
          {professional.centerName && (
            <>
              <View style={styles.quickInfoDivider} />
              <View style={styles.quickInfoRow}>
                <Ionicons name="business-outline" size={20} color={colors.primary} />
                <View style={styles.quickInfoContent}>
                  <Text style={styles.quickInfoLabel}>Center</Text>
                  <Text style={styles.quickInfoValue}>{professional.centerName}</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* About Section */}
        {professional.bio && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.bioText}>{professional.bio}</Text>
          </View>
        )}

        {/* Services Section */}
        {professional.services && professional.services.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Services Offered</Text>
            <View style={styles.servicesList}>
              {professional.services.map((service, index) => (
                <View key={index} style={styles.serviceItem}>
                  <View style={[styles.serviceDot, { backgroundColor: professional.color }]} />
                  <Text style={styles.serviceText}>{service}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Education Section */}
        {professional.education && professional.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {professional.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Ionicons name="school-outline" size={18} color={colors.textMuted} />
                <Text style={styles.educationText}>{edu}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Certifications Section */}
        {professional.certifications && professional.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            <View style={styles.certificationsList}>
              {professional.certifications.map((cert, index) => (
                <View key={index} style={styles.certificationBadge}>
                  <Ionicons name="ribbon-outline" size={14} color={colors.primary} />
                  <Text style={styles.certificationText}>{cert}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Languages Section */}
        {professional.languages && professional.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.languagesRow}>
              {professional.languages.map((lang, index) => (
                <View key={index} style={styles.languageBadge}>
                  <Text style={styles.languageText}>{lang}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Contact Information */}
        {(professional.email || professional.phone) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <View style={styles.contactList}>
              {professional.email && (
                <View style={styles.contactItem}>
                  <Ionicons name="mail-outline" size={18} color={colors.primary} />
                  <Text style={styles.contactText}>{professional.email}</Text>
                </View>
              )}
              {professional.phone && (
                <View style={styles.contactItem}>
                  <Ionicons name="call-outline" size={18} color={colors.primary} />
                  <Text style={styles.contactText}>{professional.phone}</Text>
                </View>
              )}
            </View>
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
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.backgroundCard,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.text,
  },
  shareBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
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
    paddingBottom: 100,
  },
  // Hero Section
  heroSection: {
    alignItems: "center",
    paddingVertical: 24,
  },
  heroAvatar: {
    width: 100,
    height: 100,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    position: "relative",
  },
  heroAvatarText: {
    fontSize: 32,
    fontWeight: "700",
  },
  verifiedBadgeLarge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.background,
  },
  professionalName: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 6,
  },
  specialtyLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 20,
  },
  // Stats Row
  statsRow: {
    flexDirection: "row",
    backgroundColor: colors.backgroundCard,
    borderRadius: 18,
    padding: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statIconWrap: {
    marginBottom: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  // Quick Info Card
  quickInfoCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  quickInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 8,
  },
  quickInfoContent: {
    flex: 1,
  },
  quickInfoLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 2,
  },
  quickInfoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  quickInfoDivider: {
    height: 1,
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
  bioText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  // Services
  servicesList: {
    gap: 10,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  serviceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  serviceText: {
    fontSize: 15,
    color: colors.text,
  },
  // Education
  educationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 10,
  },
  educationText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  // Certifications
  certificationsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  certificationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: `${colors.primary}12`,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  certificationText: {
    fontSize: 13,
    color: colors.text,
  },
  // Languages
  languagesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  languageBadge: {
    backgroundColor: colors.backgroundCard,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  languageText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  // Contact
  contactList: {
    gap: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  contactText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  // Loading & Error States
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    marginBottom: 20,
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
