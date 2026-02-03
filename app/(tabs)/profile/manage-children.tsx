import { useQuery } from "@tanstack/react-query";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getChildren } from "../../../api/care-path.api";
import {
  cardShadow,
  colors,
  radius,
  sectionSpacing,
  spacing,
  typography,
} from "../../../theme";
import { Child } from "../../../types/child.types";

export default function ManageChildrenScreen() {
  const { data: children, isLoading } = useQuery({
    queryKey: ["children"],
    queryFn: getChildren,
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
        <Text style={styles.title}>Manage Children</Text>
        {children?.map((child: Child) => (
          <View key={child.id} style={[styles.childCard, cardShadow]}>
            <Text style={styles.childName}>{child.name}</Text>
            <Text style={styles.childAge}>Age: {child.age}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} activeOpacity={0.85}>
          <Text style={styles.addButtonText}>+ Add Child</Text>
        </TouchableOpacity>
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
    fontSize: typography.display,
    lineHeight: typography.displayLineHeight,
    fontWeight: typography.weightBold,
    color: colors.text,
    marginBottom: sectionSpacing.default,
  },
  childCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  childName: {
    fontSize: typography.h3,
    lineHeight: typography.h3LineHeight,
    fontWeight: typography.weightSemibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  childAge: {
    fontSize: typography.caption,
    lineHeight: typography.captionLineHeight,
    color: colors.textMuted,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.lg,
    minHeight: 52,
  },
  addButtonText: {
    color: colors.backgroundCard,
    fontSize: typography.body,
    fontWeight: typography.weightSemibold,
  },
});
