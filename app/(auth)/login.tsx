import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Design requirements: #F7F6F2 background, semi-transparent cards, soft gray typography
const colors = {
  bgApp: "#F7F6F2",
  bgCard: "rgba(255, 255, 255, 0.6)", // Light, semi-transparent
  primary: "#C89B8B",
  primaryHover: "#B88A7A",
  primarySoft: "#F0E6E2",
  text: "#2B2B2B", // Soft gray
  textSecondary: "#6B6B6B", // Soft gray
  textTertiary: "#8A8A8A", // Soft gray
  border: "rgba(0, 0, 0, 0.06)",
};

export default function LoginScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboard}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            style={({ pressed }) => [
              styles.authBack,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => router.back()}
          >
            <Text style={styles.authBackText}>←</Text>
          </Pressable>

          <Text style={styles.authTitle}>Sign In</Text>
          <Text style={styles.authWelcome}>Welcome back</Text>
          <Text style={styles.authSub}>
            Sign in to continue. We're here to support you every step of the
            way.
          </Text>

          <View style={styles.authForm}>
            <View style={styles.authError} />
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={colors.textTertiary}
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.inputInWrap}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.textTertiary}
                  value={formData.password}
                  onChangeText={(text) =>
                    setFormData({ ...formData, password: text })
                  }
                  secureTextEntry={!showPassword}
                />
                <Pressable
                  style={({ pressed }) => [
                    styles.togglePassword,
                    pressed && { opacity: 0.7 },
                  ]}
                  onPress={() => setShowPassword((p) => !p)}
                >
                  <Text style={styles.togglePasswordText}>👁</Text>
                </Pressable>
              </View>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.btnPrimary,
                pressed && { opacity: 0.8 },
              ]}
            >
              <Text style={styles.btnPrimaryText}>Sign In</Text>
            </Pressable>
          </View>

          <Pressable onPress={() => router.push("/(auth)/register")}>
            {({ pressed }) => (
              <Text style={[styles.authFooter, pressed && { opacity: 0.7 }]}>
                Don't have an account?{" "}
                <Text style={styles.authFooterLink}>Create account</Text>
              </Text>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgApp,
  },
  keyboard: {
    flex: 1,
  },
  scrollContent: {
    padding: 28,
    paddingHorizontal: 24,
    paddingBottom: 48,
    alignItems: "center",
  },
  authBack: {
    alignSelf: "flex-start",
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: colors.bgCard,
    borderWidth: 1.5,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  authBackText: {
    fontSize: 20,
    color: colors.text,
  },
  authTitle: {
    fontSize: 22.4, // 1.4rem
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
    color: colors.text,
    letterSpacing: -0.32,
  },
  authWelcome: {
    fontSize: 24, // 1.5rem
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
    color: colors.text,
    letterSpacing: -0.32,
  },
  authSub: {
    fontSize: 15.2, // 0.95rem
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 32,
    maxWidth: 320,
    lineHeight: 22.8,
  },
  authForm: {
    width: "100%",
    maxWidth: 360,
  },
  authError: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14.4, // 0.9rem
    fontWeight: "600",
    marginBottom: 8,
    color: colors.text,
  },
  input: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12, // Rounded inputs
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    backgroundColor: colors.bgCard, // Semi-transparent
    color: colors.text,
  },
  inputWrap: {
    position: "relative",
  },
  inputInWrap: {
    width: "100%",
    paddingVertical: 14,
    paddingRight: 48,
    paddingLeft: 16,
    borderRadius: 12, // Rounded inputs
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    backgroundColor: colors.bgCard, // Semi-transparent
    color: colors.text,
  },
  togglePassword: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -11 }],
    borderRadius: 6,
    padding: 6,
  },
  togglePasswordText: {
    fontSize: 17.6, // 1.1rem
    color: colors.textTertiary,
  },
  btnPrimary: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: colors.primary,
    borderRadius: 24, // Rounded button
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  btnPrimaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  createAccountContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  createAccountText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
  },
  authFooter: {
    textAlign: "center",
    fontSize: 14.4,
    color: colors.textSecondary,
  },
  authFooterLink: {
    color: colors.primary,
    fontWeight: "600",
  },
});
