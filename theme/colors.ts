/**
 * SANAD — Colors
 *
 * DESIGN DIRECTION:
 * - Calm, soft, minimal, mobile-first
 * - Primary: #D99E8E (warm coral/peach)
 * - Background: #F6E4DE (soft warm beige)
 * - Text: #333333 (dark gray)
 */

export const colors = {
  // Surfaces — soft, warm, minimal
  background: "#F6E4DE",
  backgroundCard: "#FFFFFF",
  backgroundElevated: "#FFFFFF",
  backgroundSecondary: "#F0E0DA",

  // Primary (warm coral/peach — calm, soft)
  primary: "#D99E8E",
  primaryLight: "#F5E8E3",
  primaryMuted: "#C88E7E",

  // Secondary (complementary soft tones)
  secondary: "#D99E8E",
  secondaryLight: "#F5E8E3",

  // Text — clear hierarchy
  text: "#333333",
  textSecondary: "#555555",
  textMuted: "#777777",
  textLight: "#999999",

  // UI — soft borders (no sharp contrast)
  border: "#E8D8D2",
  borderLight: "#F0E8E3",

  // Semantic
  success: "#D99E8E",
  error: "#C88E7E",
  errorLight: "#F9EEED",
  warning: "#D99E8E",
  info: "#D99E8E",

  // Specific
  signOut: "#C88E7E",
  accent: "#D99E8E",
} as const;
