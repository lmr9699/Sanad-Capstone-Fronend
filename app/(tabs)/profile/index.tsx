import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Design system colors
const colors = {
  bgApp: "#FAF9F6",
  bgCard: "rgba(255, 255, 255, 0.6)",
  primary: "#7FB77E",
  text: "#2F2F2F",
  textSecondary: "#4A4A4A",
  textTertiary: "#8A8A8A",
  border: "rgba(0, 0, 0, 0.06)",
  signOut: "#D9534F",
};

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.content}>
        {/* Header - Bold, dark brown/black */}
        <Text style={styles.title}>Profile</Text>

        {/* Description - Smaller, lighter font */}
        <Text style={styles.description}>
          Your account details and settings will appear here.
        </Text>

        {/* Input Fields - Three fields stacked vertically */}
        <View style={styles.inputFieldsContainer}>
          <View style={styles.inputField}>
            <TextInput
              style={styles.inputText}
              placeholder="NAME"
              placeholderTextColor={colors.textTertiary}
              editable={false}
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              style={styles.inputText}
              placeholder="EMAIL"
              placeholderTextColor={colors.textTertiary}
              editable={false}
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              style={styles.inputText}
              placeholder="PHONE"
              placeholderTextColor={colors.textTertiary}
              editable={false}
            />
          </View>
        </View>

        {/* Sign Out Link - Centered, reddish-orange */}
        <Pressable
          onPress={() => router.push("/(auth)/login")}
          style={({ pressed }) => [
            styles.signOutContainer,
            pressed && { opacity: 0.7 },
          ]}
        >
          <Text style={styles.signOutText}>Sign out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgApp, // Light beige/cream background
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 140, // Clear spacing: 64px (tab bar) + safe area (up to 34px) + 24px (spacing) + 18px (extra safety)
  },
  // Title - Bold, dark brown/black
  title: {
    fontSize: 22, // Large and prominent
    fontWeight: "600", // Bold
    color: colors.text, // Dark brown/black (#333333)
    textAlign: "center",
    marginBottom: 12, // Spacing below title
  },
  // Description - Smaller, lighter font
  description: {
    fontSize: 15, // Standard readable size
    color: colors.textSecondary, // Lighter brown/gray (#666666)
    textAlign: "center",
    marginBottom: 32, // Spacing below description
    lineHeight: 22,
  },
  // Input Fields Container
  inputFieldsContainer: {
    width: "100%",
    maxWidth: 360,
    gap: 16, // Spacing between fields
    marginBottom: 28, // Spacing below fields
  },
  // Input Field - Rectangular with rounded corners, white background, subtle shadow
  inputField: {
    width: "100%",
    height: 56, // Standard input field height
    backgroundColor: "#FFFFFF", // White background
    borderRadius: 16, // Significantly rounded corners
    paddingHorizontal: 16,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2, // Subtle shadow for raised appearance
    borderWidth: 1,
    borderColor: colors.border, // Very light gray border
  },
  inputText: {
    fontSize: 16,
    color: colors.textTertiary, // Light to medium gray for placeholder/text
  },
  // Sign Out Container
  signOutContainer: {
    marginTop: 8,
  },
  // Sign Out Text - Reddish-orange, centered
  signOutText: {
    fontSize: 16,
    color: colors.signOut, // Reddish-orange (#DC7633)
    fontWeight: "600",
    textAlign: "center",
  },
});
