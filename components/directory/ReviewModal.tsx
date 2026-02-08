import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { StarRating } from "../ui/StarRating";
import { colors, radius, spacing, typography } from "../../theme";

interface ReviewModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => Promise<void>;
  isLoading?: boolean;
  title?: string;
}

export function ReviewModal({
  visible,
  onClose,
  onSubmit,
  isLoading = false,
  title = "Rate this Center",
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setError("");
    
    try {
      await onSubmit(rating, comment.trim());
      setRating(0);
      setComment("");
      onClose();
    } catch (err) {
      setError("Failed to submit review. Please try again.");
    }
  };

  const handleClose = () => {
    setRating(0);
    setComment("");
    setError("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.modalOverlay} edges={["top", "bottom"]}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.label}>Your Rating</Text>
              <StarRating
                rating={rating}
                onRatingChange={setRating}
                size={32}
                readonly={false}
              />
            </View>

            <View style={styles.section}>
              <Input
                label="Your Review"
                placeholder="Share your experience with this center..."
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                containerStyle={styles.commentContainer}
                inputStyle={styles.commentInput}
              />
            </View>

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <View style={styles.actions}>
              <Button
                title="Cancel"
                onPress={handleClose}
                variant="secondary"
                disabled={isLoading}
                style={styles.cancelButton}
              />
              <Button
                title={isLoading ? "Submitting..." : "Submit Review"}
                onPress={handleSubmit}
                disabled={isLoading || rating === 0}
                loading={isLoading}
                style={styles.submitButton}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.backgroundCard,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    maxHeight: "90%",
    paddingTop: spacing.xl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.h2,
    fontWeight: typography.weightBold,
    color: colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: colors.textMuted,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  label: {
    fontSize: typography.body,
    fontWeight: typography.weightMedium,
    color: colors.text,
    marginBottom: spacing.md,
  },
  commentContainer: {
    marginBottom: 0,
  },
  commentInput: {
    minHeight: 120,
    paddingTop: spacing.md,
  },
  errorContainer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  errorText: {
    fontSize: typography.caption,
    color: colors.error,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  cancelButton: {
    flex: 1,
  },
  submitButton: {
    flex: 1,
  },
});