import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProfessionals } from "../../../api/directory.api";
import {
  cardShadow,
  colors,
  radius,
  sectionSpacing,
  spacing,
  typography,
} from "../../../theme";
import { Professional } from "../../../types/directory.types";

export default function ProfessionalsScreen() {
  const router = useRouter();
  const { data: professionals, isLoading } = useQuery({
    queryKey: ["professionals"],
    queryFn: getProfessionals,
  });

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
        {professionals?.map((professional: Professional) => (
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
            <Text style={styles.professionalName}>{professional.name}</Text>
            <Text style={styles.professionalSpecialty}>
              {professional.specialty}
            </Text>
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
  professionalCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  professionalName: {
    fontSize: typography.h3,
    lineHeight: typography.h3LineHeight,
    fontWeight: typography.weightSemibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  professionalSpecialty: {
    fontSize: typography.caption,
    lineHeight: typography.captionLineHeight,
    color: colors.textMuted,
  },
});
