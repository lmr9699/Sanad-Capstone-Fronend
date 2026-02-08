import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCenterDetails, submitCenterReview } from "../../../api/directory.api";
import { ReviewModal } from "../../../components/directory/ReviewModal";
import { Button } from "../../../components/ui/Button";
import { StarRating } from "../../../components/ui/StarRating";
import { colors, sectionSpacing, spacing, typography } from "../../../theme";
import { useRouter } from "expo-router";
import { Linking, Platform } from "react-native";
import { Review } from "../../../types/directory.types";


export default function CenterDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { data: center, isLoading, isError } = useQuery({
    queryKey: ["center", id],
    queryFn: () => getCenterDetails(id as string),
  });
  const submitReviewMutation = useMutation({
    mutationFn: ({ rating, comment }: { rating: number; comment: string }) =>
      submitCenterReview(id as string, { rating, comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["center", id] });
    },
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

  // 
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
  const handleSubmitReview = async (rating: number, comment: string) => {
    await submitReviewMutation.mutateAsync({ rating, comment });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
  if (isError || !center) {
    return (
      <SafeAreaView style={styles.wrapper} edges={["top"]}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Failed to load center details</Text>
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
               <Text style={styles.title}>{center.name}</Text>
        
        {center.rating !== undefined && (
          <View style={styles.ratingSection}>
            <StarRating
              rating={center.rating}
              readonly={true}
              size={20}
              showRatingNumber={true}
            />
            {center.reviews && center.reviews.length > 0 && (
              <Text style={styles.reviewCount}>
                ({center.reviews.length} {center.reviews.length === 1 ? "review" : "reviews"})
              </Text>
            )}
          </View>
        )}

        <Text style={styles.address}>{center.address}</Text>
        <Text style={styles.phone}>{center.phone}</Text>
        <Text style={styles.description}>{center.description}</Text>

        <View style={styles.reviewButtonContainer}>
          <Button
            title="Rate & Review"
            onPress={() => setShowReviewModal(true)}
            fullWidth
          />
        </View>

        {center.reviews && center.reviews.length > 0 && (
          <View style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            {center.reviews.map((review: Review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>{review.userName}</Text>
                    <StarRating
                      rating={review.rating}
                      readonly={true}
                      size={16}
                    />
                  </View>
                  <Text style={styles.reviewDate}>{formatDate(review.createdAt)}</Text>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        )} 
      </ScrollView>
      <ReviewModal
        visible={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleSubmitReview}
        isLoading={submitReviewMutation.isPending}
      />
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
  address: {
    fontSize: typography.body,
    lineHeight: typography.bodyLineHeight,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  phone: {
    fontSize: typography.body,
    lineHeight: typography.bodyLineHeight,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  errorText: {
    fontSize: typography.body,
    color: colors.error,
  },
  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  reviewCount: {
    fontSize: typography.bodySmall,
    color: colors.textMuted,
  },
  reviewButtonContainer: {
    marginBottom: spacing.xl,
  },
  reviewsSection: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.h3,
    fontWeight: typography.weightBold,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  reviewerInfo: {
    flex: 1,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  },
  backButtonText: {
    color: "#374151",
    fontWeight: "500",
  },
  header: {
    padding: 20,
    backgroundColor: "#f9fafb",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  // title: {
  //   fontSize: 26,
  //   fontWeight: "bold",
  //   color: "#1f2937",
  //   marginBottom: 12,
  // },
  typeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  publicBadge: {
    backgroundColor: "#dcfce7",
  },
  privateBadge: {
    backgroundColor: "#fef3c7",
  },
  typeBadgeText: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  publicText: {
    color: "#15803d",
  },
  privateText: {
    color: "#b45309",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  description: {
    fontSize: typography.body,
    lineHeight: typography.bodyLineHeight,
    color: colors.textSecondary,
  },
  infoRow: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: "#1f2937",
  },
  infoLink: {
    fontSize: 16,
    color: "#2563eb",
    textDecorationLine: "underline",
  },
  actionsContainer: {
    padding: 20,
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  ratingContainer: {
    marginTop: 12,
  },
  ratingText: {
    fontSize: 16,
    color: "#f59e0b",
    fontWeight: "600",
  },

    headerMeta: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 12,
      marginTop: 8,
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
      color: "#1f2937",
    },
    servicesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    serviceChip: {
      backgroundColor: "#dbeafe",
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#93c5fd",
    },
    serviceChipText: {
      color: "#1e40af",
      fontSize: 14,
      fontWeight: "500",
    },
    hoursText: {
      fontSize: 16,
      color: "#4b5563",
      lineHeight: 24,
    },
    cityText: {
      fontSize: 14,
      color: "#6b7280",
      marginTop: 2,
    },
    mapLinkBtn: {
      marginTop: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: "#f0fdf4",
      borderRadius: 8,
      alignSelf: "flex-start",
      borderWidth: 1,
      borderColor: "#86efac",
    },
    mapLinkText: {
      color: "#15803d",
      fontWeight: "500",
      fontSize: 14,
    },
    secondaryButton: {
      backgroundColor: "#f0fdf4",
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#86efac",
      marginTop: 12,
    },
    secondaryButtonText: {
      color: "#15803d",
      fontSize: 16,
      fontWeight: "600",
    },
    reviewCard: {
      backgroundColor: "#f9fafb",
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: "#e5e7eb",
    },
    reviewHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    reviewerName: {
      fontSize: 16,
      fontWeight: "600",
      color: "#1f2937",
    },
    reviewRating: {
      flexDirection: "row",
    },
    reviewStars: {
      fontSize: 14,
      color: "#f59e0b",
    },
    reviewComment: {
      fontSize: 14,
      color: "#4b5563",
      lineHeight: 20,
      marginBottom: 8,
    },
    reviewDate: {
      fontSize: 12,
      color: "#9ca3af",
    },
});
