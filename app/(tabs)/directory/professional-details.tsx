import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProfessionalDetails } from "../../../api/directory.api";
import { colors, spacing, typography } from "../../../theme";

export default function ProfessionalDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data: professional, isLoading } = useQuery({
    queryKey: ["professional", id],
    queryFn: () => getProfessionalDetails(id as string),
  });

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
        <Text style={styles.specialty}>{professional?.specialty}</Text>
        <Text style={styles.description}>{professional?.description}</Text>
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
    marginBottom: spacing.sm,
  },
  specialty: {
    fontSize: typography.h3,
    lineHeight: typography.h3LineHeight,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  description: {
    fontSize: typography.body,
    lineHeight: typography.bodyLineHeight,
    color: colors.textSecondary,
  },
});
