import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import { useAuth } from "../../context/AuthContext";

// Design system colors
const colors = {
  bgApp: "#FAF9F6",
  bgCard: "rgba(255, 255, 255, 0.6)",
  primary: "#7FB77E",
  primaryHover: "#6A9E69",
  primarySoft: "#E8F0E8",
  text: "#2F2F2F",
  textSecondary: "#4A4A4A",
  textTertiary: "#8A8A8A",
  border: "rgba(0, 0, 0, 0.06)",
  error: "#FF4B4B",
};

export default function RegisterScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { register } = useAuth();
  const canGoBack = navigation.canGoBack();
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", password: "", terms: "" };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Terms validation
    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the terms";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const success = await register(formData.name.trim(), formData.email, formData.password);
      if (success) {
        router.replace("/(tabs)");
      } else {
        Alert.alert("Registration Failed", "Unable to create account. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
          {/* Back button */}
          {canGoBack && (
            <Pressable
              style={({ pressed }) => [
                styles.authBack,
                pressed && { opacity: 0.7 },
              ]}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={22} color={colors.text} />
            </Pressable>
          )}

          <Text style={[styles.authTitle, !canGoBack && { marginTop: 20 }]}>Create Account</Text>
          <Text style={styles.authWelcome}>Welcome to SANAD</Text>
          <Text style={styles.authSub}>
            Create your account and we'll support you step by step. You're not
            alone.
          </Text>

          {/* Form */}
          <View style={styles.authForm}>
            {/* Full Name */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Enter your full name"
                placeholderTextColor={colors.textTertiary}
                value={formData.name}
                onChangeText={(text) => {
                  setFormData({ ...formData, name: text });
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                autoCapitalize="words"
              />
              {errors.name ? (
                <Text style={styles.errorText}>{errors.name}</Text>
              ) : null}
            </View>

            {/* Email */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Enter your email"
                placeholderTextColor={colors.textTertiary}
                value={formData.email}
                onChangeText={(text) => {
                  setFormData({ ...formData, email: text });
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            {/* Password */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={[styles.inputInWrap, errors.password && styles.inputError]}
                  placeholder="Create a secure password"
                  placeholderTextColor={colors.textTertiary}
                  value={formData.password}
                  onChangeText={(text) => {
                    setFormData({ ...formData, password: text });
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  secureTextEntry={!showPassword}
                />
                <Pressable
                  style={({ pressed }) => [
                    styles.togglePassword,
                    pressed && { opacity: 0.7 },
                  ]}
                  onPress={() => setShowPassword((p) => !p)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color={colors.textTertiary}
                  />
                </Pressable>
              </View>
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>

            {/* Phone */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Phone Number <Text style={styles.optional}>(optional)</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="+965 XXXX XXXX"
                placeholderTextColor={colors.textTertiary}
                value={formData.phone}
                onChangeText={(text) =>
                  setFormData({ ...formData, phone: text })
                }
                keyboardType="phone-pad"
              />
            </View>

            {/* Checkbox and Terms */}
            <View style={styles.checkboxRow}>
              <Pressable
                style={({ pressed }) => [
                  styles.checkbox,
                  agreedToTerms && styles.checkboxChecked,
                  errors.terms && !agreedToTerms && styles.checkboxError,
                  pressed && { opacity: 0.8 },
                ]}
                onPress={() => {
                  setAgreedToTerms((v) => !v);
                  if (errors.terms) setErrors({ ...errors, terms: "" });
                }}
              >
                {agreedToTerms && (
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                )}
              </Pressable>
              <View style={styles.checkboxLabelContainer}>
                <Text style={styles.checkboxLabel}>I agree to SANAD's </Text>
                <Pressable
                  onPress={() =>
                    Alert.alert("Community Guidelines", "Community guidelines for SANAD users.\n\n• Be respectful\n• Share helpful information\n• Support each other\n• Protect privacy")
                  }
                >
                  <Text style={styles.checkboxLink}>community guidelines</Text>
                </Pressable>
                <Text style={styles.checkboxLabel}> and </Text>
                <Pressable
                  onPress={() =>
                    Alert.alert("Privacy Policy", "SANAD Privacy Policy\n\n• Your data is secure\n• We don't share personal info\n• You control your data\n• GDPR compliant")
                  }
                >
                  <Text style={styles.checkboxLink}>privacy policy</Text>
                </Pressable>
                <Text style={styles.checkboxLabel}>.</Text>
              </View>
            </View>
            {errors.terms ? (
              <Text style={[styles.errorText, { marginTop: -16, marginBottom: 16 }]}>
                {errors.terms}
              </Text>
            ) : null}

            {/* Create Account Button */}
            <Pressable
              style={({ pressed }) => [
                styles.btnPrimary,
                pressed && { opacity: 0.8 },
                isLoading && { opacity: 0.7 },
              ]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.btnPrimaryText}>Create Account</Text>
              )}
            </Pressable>
          </View>

          {/* Footer */}
          <Pressable
            onPress={() => router.push("/(auth)/login")}
            style={({ pressed }) => pressed && { opacity: 0.7 }}
          >
            <Text style={styles.authFooter}>
              Already have an account?{" "}
              <Text style={styles.authFooterLink}>Sign in</Text>
            </Text>
          </Pressable>

          {/* Note */}
          <Text style={styles.authNote}>
            You can update your details anytime in settings
          </Text>
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
  authTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
    color: colors.text,
    letterSpacing: -0.32,
  },
  authWelcome: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
    color: colors.text,
    letterSpacing: -0.32,
  },
  authSub: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 32,
    maxWidth: 320,
    lineHeight: 22,
  },
  authForm: {
    width: "100%",
    maxWidth: 360,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: colors.text,
  },
  optional: {
    fontWeight: "400",
    color: colors.textTertiary,
  },
  input: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    backgroundColor: colors.bgCard,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 6,
  },
  inputWrap: {
    position: "relative",
  },
  inputInWrap: {
    width: "100%",
    paddingVertical: 14,
    paddingRight: 48,
    paddingLeft: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    backgroundColor: colors.bgCard,
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
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 26,
  },
  checkbox: {
    width: 22,
    height: 22,
    marginTop: 2,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxError: {
    borderColor: colors.error,
  },
  checkboxLabelContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 21,
  },
  checkboxLink: {
    color: colors.primary,
    textDecorationLine: "underline",
  },
  btnPrimary: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: colors.primary,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
    minHeight: 52,
  },
  btnPrimaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  authFooter: {
    textAlign: "center",
    fontSize: 14,
    color: colors.textSecondary,
  },
  authFooterLink: {
    color: colors.primary,
    fontWeight: "600",
  },
  authNote: {
    fontSize: 13,
    color: colors.textTertiary,
    marginTop: 12,
    textAlign: "center",
  },
});
