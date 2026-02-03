import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Design requirements: #F7F6F2 background, semi-transparent cards, soft gray typography
const colors = {
  bgApp: "#F7F6F2",
  bgCard: "rgba(255, 255, 255, 0.6)", // Light, semi-transparent
  text: "#2B2B2B", // Soft gray (dark gray)
  textSecondary: "#6B6B6B", // Soft gray (lighter gray)
  border: "rgba(0, 0, 0, 0.06)",
};

export default function DocumentsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.content}>
        {/* Icon Container - Square with rounded corners */}
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>📄</Text>
        </View>

        {/* Title - Bold, dark gray */}
        <Text style={styles.title}>Documents</Text>

        {/* Description - Two-line text, centered, lighter gray */}
        <Text style={styles.description}>
          Keep your reports and important papers in one place. Upload documents
          from the Home screen when you're ready.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgApp, // Very light off-white/cream background
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 140, // Clear spacing: 64px (tab bar) + safe area (up to 34px) + 24px (spacing) + 18px (extra safety)
  },
  // Icon Container - Square with slightly rounded corners
  iconContainer: {
    width: 64, // Square container
    height: 64,
    borderRadius: 14, // Slightly rounded corners
    backgroundColor: "#FFFFFF", // White or very light background
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // Ample vertical spacing between icon and title
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2, // Subtle shadow for depth
  },
  iconText: {
    fontSize: 32, // Icon size - documents emoji
  },
  // Title - Bold, dark gray sans-serif
  title: {
    fontSize: 22, // Large and prominent
    fontWeight: "600", // Bold or semi-bold (600-700)
    color: colors.text, // Dark gray (#333333 or #2B2B2B)
    textAlign: "center",
    marginBottom: 12, // Ample vertical spacing between title and description
  },
  // Description - Two-line text, lighter gray, centered
  description: {
    fontSize: 15, // Standard readable size
    color: colors.textSecondary, // Lighter gray (#666666 or #6B6B6B)
    textAlign: "center",
    lineHeight: 22, // Comfortable line height for readability
    maxWidth: 320, // Prevents full-width spanning, allows wrapping into two lines
    paddingHorizontal: 16,
  },
});
