import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text, ViewStyle } from "react-native";

interface HapticButtonProps extends Omit<PressableProps, "style"> {
  label?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  hapticType?: "light" | "medium" | "heavy" | "success" | "warning" | "error" | "none";
  style?: ViewStyle;
  textStyle?: object;
  children?: React.ReactNode;
}

const colors = {
  primary: "#7FB77E",
  secondary: "#5F8F8B",
  text: "#2F2F2F",
  textSecondary: "#666666",
  white: "#FFFFFF",
  border: "#E8E8E8",
};

export const HapticButton: React.FC<HapticButtonProps> = ({
  label,
  variant = "primary",
  size = "medium",
  hapticType = "light",
  style,
  textStyle,
  children,
  onPress,
  disabled,
  ...props
}) => {
  const triggerHaptic = () => {
    if (hapticType === "none") return;
    
    switch (hapticType) {
      case "light":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case "medium":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case "heavy":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case "success":
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case "warning":
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case "error":
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
    }
  };

  const handlePress = (e: any) => {
    triggerHaptic();
    onPress?.(e);
  };

  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`button_${size}`]];
    
    switch (variant) {
      case "primary":
        return [...baseStyle, styles.buttonPrimary, disabled && styles.buttonDisabled];
      case "secondary":
        return [...baseStyle, styles.buttonSecondary];
      case "outline":
        return [...baseStyle, styles.buttonOutline];
      case "ghost":
        return [...baseStyle, styles.buttonGhost];
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const baseTextStyle = [styles.buttonText, styles[`text_${size}`]];
    
    switch (variant) {
      case "primary":
        return [...baseTextStyle, styles.textPrimary];
      case "secondary":
        return [...baseTextStyle, styles.textSecondary];
      case "outline":
        return [...baseTextStyle, styles.textOutline];
      case "ghost":
        return [...baseTextStyle, styles.textGhost];
      default:
        return baseTextStyle;
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        ...getButtonStyle(),
        pressed && !disabled && { opacity: 0.85, transform: [{ scale: 0.98 }] },
        style,
      ]}
      onPress={handlePress}
      disabled={disabled}
      {...props}
    >
      {children || <Text style={[...getTextStyle(), textStyle]}>{label}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button_small: {
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  button_medium: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  button_large: {
    paddingVertical: 18,
    paddingHorizontal: 28,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.primary,
  },
  buttonGhost: {
    backgroundColor: "transparent",
  },
  buttonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  buttonText: {
    fontWeight: "600",
  },
  text_small: {
    fontSize: 13,
  },
  text_medium: {
    fontSize: 15,
  },
  text_large: {
    fontSize: 17,
  },
  textPrimary: {
    color: colors.white,
  },
  textSecondary: {
    color: colors.white,
  },
  textOutline: {
    color: colors.primary,
  },
  textGhost: {
    color: colors.primary,
  },
});

// Utility function to trigger haptic feedback anywhere
export const triggerHaptic = (
  type: "light" | "medium" | "heavy" | "success" | "warning" | "error" = "light"
) => {
  switch (type) {
    case "light":
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;
    case "medium":
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      break;
    case "heavy":
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      break;
    case "success":
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      break;
    case "warning":
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      break;
    case "error":
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      break;
  }
};

export default HapticButton;
