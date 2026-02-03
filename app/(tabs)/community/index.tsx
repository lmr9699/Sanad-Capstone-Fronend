import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Design requirements: #F7F6F2 background, semi-transparent cards, soft gray typography
const colors = {
  bgApp: "#F7F6F2",
  bgCard: "rgba(255, 255, 255, 0.6)", // Light, semi-transparent
  text: "#2B2B2B", // Soft gray (dark grey)
  textSecondary: "#6B6B6B", // Soft gray (lighter grey)
  border: "rgba(0, 0, 0, 0.06)",
};

export default function CommunityScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.content}>
        {/* Icon Container - Square with rounded corners, white background */}
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>👥</Text>
        </View>

        {/* Title - Bold, dark grey */}
        <Text style={styles.title}>Community</Text>

        {/* Description - Three-line text, centered, lighter grey */}
        <Text style={styles.description}>
          Connect with other families, share experiences, and find support.
          You're part of a caring community.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgApp, // Light beige/off-white background
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 140, // Clear spacing: 64px (tab bar) + safe area (up to 34px) + 24px (spacing) + 18px (extra safety)
  },
  // Icon Container - Square with rounded corners, white background
  iconContainer: {
    width: 64, // Square container
    height: 64,
    borderRadius: 14, // Rounded corners
    backgroundColor: "#FFFFFF", // White background
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
    fontSize: 32, // Icon size - two human figures emoji
  },
  // Title - Bold, dark grey sans-serif
  title: {
    fontSize: 22, // Large and prominent
    fontWeight: "600", // Bold or semi-bold
    color: colors.text, // Dark grey
    textAlign: "center",
    marginBottom: 12, // Ample vertical spacing between title and description
  },
  // Description - Three-line text, lighter grey, centered
  description: {
    fontSize: 15, // Standard readable size
    color: colors.textSecondary, // Lighter grey
    textAlign: "center",
    lineHeight: 22, // Comfortable line height for readability
    maxWidth: 320, // Prevents full-width spanning, allows wrapping into three lines
    paddingHorizontal: 16,
  },
});
