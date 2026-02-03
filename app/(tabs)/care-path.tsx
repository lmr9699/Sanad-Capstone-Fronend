import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Design system colors
const colors = {
  bgApp: "#FAF9F6",
  bgCard: "rgba(255, 255, 255, 0.6)",
  text: "#2F2F2F",
  textSecondary: "#4A4A4A",
  border: "rgba(0, 0, 0, 0.06)",
};

export default function CarePathScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.content}>
        {/* Icon Container - Square with rounded corners, subtle shadow */}
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>🛤</Text>
        </View>

        {/* Title - Bold, dark gray */}
        <Text style={styles.title}>Care Path</Text>

        {/* Description - Centered, wrapped over three lines */}
        <Text style={styles.description}>
          Your personalized care journey will appear here. We'll guide you
          through each step so you never feel alone.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgApp, // Light off-white/beige background
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 140, // Clear spacing: 64px (tab bar) + safe area (up to 34px) + 24px (spacing) + 18px (extra safety)
  },
  // Icon Container - Square with rounded corners, light background, subtle shadow
  iconContainer: {
    width: 64, // Square container
    height: 64,
    borderRadius: 14, // Rounded corners
    backgroundColor: "#FFFFFF", // White or very light gray background
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // Ample vertical spacing between icon and title
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2, // Subtle shadow for raised appearance
  },
  iconText: {
    fontSize: 32, // Icon size - larger to fill the container
  },
  // Title - Bold or semi-bold, dark gray/black
  title: {
    fontSize: 22, // Large and prominent
    fontWeight: "600", // Bold or semi-bold
    color: colors.text, // Dark gray/black
    textAlign: "center",
    marginBottom: 12, // Ample vertical spacing between title and description
  },
  // Description - Smaller, lighter gray, centered, wrapped over three lines
  description: {
    fontSize: 15, // Standard readable size
    color: colors.textSecondary, // Lighter shade of gray than title
    textAlign: "center",
    lineHeight: 22, // Comfortable line height for readability
    maxWidth: 320, // Prevents full-width spanning, allows wrapping
    paddingHorizontal: 16,
  },
});
