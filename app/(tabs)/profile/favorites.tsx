import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFavorites } from "../../../context/FavoritesContext";
import { useLanguage } from "../../../context/LanguageContext";

const colors = {
  bgApp: "#FAF9F6",
  bgCard: "#FFFFFF",
  primary: "#7FB77E",
  secondary: "#5F8F8B",
  text: "#2F2F2F",
  textSecondary: "#666666",
  textMuted: "#999999",
  border: "#E8E8E8",
  error: "#F44336",
};

export default function FavoritesScreen() {
  const router = useRouter();
  const { locale } = useLanguage();
  const isArabic = locale === "ar";
  const { favorites, removeFavorite } = useFavorites();

  const professionals = favorites.filter((f) => f.type === "professional");
  const centers = favorites.filter((f) => f.type === "center");

  const handleRemove = async (id: string, type: "professional" | "center") => {
    await removeFavorite(id, type);
  };

  const handleItemPress = (item: typeof favorites[0]) => {
    if (item.type === "professional") {
      router.push(`/(tabs)/professionals/professional-details?professionalId=${item.id}` as any);
    } else {
      router.push(`/(tabs)/centers/center-details?centerId=${item.id}` as any);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>
          {isArabic ? "المفضلة" : "Favorites"}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="heart" size={24} color="#FF6B6B" />
            <Text style={styles.statNumber}>{favorites.length}</Text>
            <Text style={styles.statLabel}>{isArabic ? "إجمالي" : "Total"}</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="people" size={24} color={colors.primary} />
            <Text style={styles.statNumber}>{professionals.length}</Text>
            <Text style={styles.statLabel}>{isArabic ? "خبراء" : "Experts"}</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="business" size={24} color={colors.secondary} />
            <Text style={styles.statNumber}>{centers.length}</Text>
            <Text style={styles.statLabel}>{isArabic ? "مراكز" : "Centers"}</Text>
          </View>
        </View>

        {/* Professionals Section */}
        {professionals.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>
              {isArabic ? "الخبراء المفضلون" : "Favorite Experts"}
            </Text>
            {professionals.map((item) => (
              <Pressable
                key={`${item.type}-${item.id}`}
                style={({ pressed }) => [styles.favoriteCard, pressed && { opacity: 0.9 }]}
                onPress={() => handleItemPress(item)}
              >
                <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}15` }]}>
                  <Ionicons name="person" size={24} color={colors.primary} />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                </View>
                <Pressable
                  style={({ pressed }) => [styles.removeButton, pressed && { opacity: 0.6 }]}
                  onPress={() => handleRemove(item.id, item.type)}
                >
                  <Ionicons name="heart" size={22} color="#FF6B6B" />
                </Pressable>
              </Pressable>
            ))}
          </>
        )}

        {/* Centers Section */}
        {centers.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>
              {isArabic ? "المراكز المفضلة" : "Favorite Centers"}
            </Text>
            {centers.map((item) => (
              <Pressable
                key={`${item.type}-${item.id}`}
                style={({ pressed }) => [styles.favoriteCard, pressed && { opacity: 0.9 }]}
                onPress={() => handleItemPress(item)}
              >
                <View style={[styles.iconContainer, { backgroundColor: `${colors.secondary}15` }]}>
                  <Ionicons name="business" size={24} color={colors.secondary} />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                </View>
                <Pressable
                  style={({ pressed }) => [styles.removeButton, pressed && { opacity: 0.6 }]}
                  onPress={() => handleRemove(item.id, item.type)}
                >
                  <Ionicons name="heart" size={22} color="#FF6B6B" />
                </Pressable>
              </Pressable>
            ))}
          </>
        )}

        {/* Empty State */}
        {favorites.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="heart-outline" size={48} color={colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>
              {isArabic ? "لا توجد مفضلات" : "No Favorites Yet"}
            </Text>
            <Text style={styles.emptySubtitle}>
              {isArabic
                ? "احفظ الخبراء والمراكز المفضلة لديك هنا"
                : "Save your favorite experts and centers here"}
            </Text>
            <View style={styles.emptyButtons}>
              <Pressable
                style={styles.emptyButton}
                onPress={() => router.push("/(tabs)/professionals" as any)}
              >
                <Ionicons name="people" size={18} color="#FFFFFF" />
                <Text style={styles.emptyButtonText}>
                  {isArabic ? "تصفح الخبراء" : "Browse Experts"}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.emptyButton, { backgroundColor: colors.secondary }]}
                onPress={() => router.push("/(tabs)/centers" as any)}
              >
                <Ionicons name="business" size={18} color="#FFFFFF" />
                <Text style={styles.emptyButtonText}>
                  {isArabic ? "تصفح المراكز" : "Browse Centers"}
                </Text>
              </Pressable>
            </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.bgCard,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  headerSpacer: {
    width: 40,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  // Stats
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  // Section
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 12,
    marginTop: 8,
  },
  // Favorite Card
  favoriteCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  removeButton: {
    padding: 8,
  },
  // Empty State
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
    maxWidth: 280,
  },
  emptyButtons: {
    flexDirection: "row",
    gap: 12,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    gap: 8,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
