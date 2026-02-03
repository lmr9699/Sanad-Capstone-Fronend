import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, ActivityIndicator, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getCenterDetails } from "../../../api/directory.api";
import { HealthCenter, Review } from "../../../types/directory.types";

export default function CenterDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data: center, isLoading, isError } = useQuery({
    queryKey: ["center", id],
    queryFn: () => getCenterDetails(id as string),
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading center details...</Text>
      </View>
    );
  }

  if (isError || !center) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Failed to load center details</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{center.name}</Text>
        <View style={styles.headerMeta}>
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
              {center.type === "public" ? "Public Center" : "Private Center"}
            </Text>
          </View>
          {center.rating && renderStars(center.rating)}
        </View>
      </View>

      {/* Description */}
      {center.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{center.description}</Text>
        </View>
      )}

      {/* الخدمات المتوفرة */}
      {center.specialties && center.specialties.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏥 Services Offered</Text>
          <View style={styles.servicesContainer}>
          {center.specialties.map((specialty: string, index: number) => (
              <View key={index} style={styles.serviceChip}>
                <Text style={styles.serviceChipText}>{specialty}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* ساعات العمل */}
      {center.operatingHours && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🕐 Operating Hours</Text>
          <Text style={styles.hoursText}>{center.operatingHours}</Text>
        </View>
      )}

      {/* معلومات التواصل */}
      <View style={styles.section}>
      <Text style={styles.sectionTitle}>📋 Contact Information</Text>

        <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>📍 Address</Text>
          <Text style={styles.infoValue}>{center.address}</Text>
          {center.city && <Text style={styles.cityText}>{center.city}</Text>}
          <TouchableOpacity style={styles.mapLinkBtn} onPress={handleOpenMap}>
          <Text style={styles.mapLinkText}>🗺️ Open in Maps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>📞 Phone</Text>
          <TouchableOpacity onPress={handleCall}>
            <Text style={styles.infoLink}>{center.phone}</Text>
          </TouchableOpacity>
        </View>

        {center.email && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>✉️ Email</Text>
            <TouchableOpacity onPress={handleEmail}>
              <Text style={styles.infoLink}>{center.email}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* أزرار الإجراءات */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleCall}>
        <Text style={styles.primaryButtonText}>📞 Call Now</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton} onPress={handleOpenMap}>
        <Text style={styles.secondaryButtonText}>🗺️ Get Directions</Text>
        </TouchableOpacity>
      </View>
            {/* Reviews Section */}
            {center.reviews && center.reviews.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⭐ Reviews ({center.reviews.length})</Text>
          {center.reviews.map((review: Review, index: number) => (
            <View key={index} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>{review.userName}</Text>
                <View style={styles.reviewRating}>
                  <Text style={styles.reviewStars}>
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </Text>
                </View>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <Text style={styles.reviewDate}>
                {new Date(review.createdAt).toLocaleDateString()}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  errorText: {
    fontSize: 16,
    color: "#ef4444",
    marginBottom: 16,
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
  },
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
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
