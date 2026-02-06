import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useState } from "react";
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

export default function LoginScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { login } = useAuth();
  const canGoBack = navigation.canGoBack();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

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
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        router.replace("/(tabs)");
      } else {
        Alert.alert("Login Failed", "Unable to sign in. Please try again.");
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

          <Text style={[styles.authTitle, !canGoBack && { marginTop: 20 }]}>Sign In</Text>
          <Text style={styles.authWelcome}>Welcome back</Text>
          <Text style={styles.authSub}>
            Sign in to continue. We're here to support you every step of the
            way.
          </Text>

          <View style={styles.authForm}>
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
                  placeholder="Enter your password"
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

            {/* Sign In Button */}
            <Pressable
              style={({ pressed }) => [
                styles.btnPrimary,
                pressed && { opacity: 0.8 },
                isLoading && { opacity: 0.7 },
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.btnPrimaryText}>Sign In</Text>
              )}
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
});
