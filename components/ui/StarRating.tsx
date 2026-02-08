import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, spacing, typography } from "../../theme";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  showRatingNumber?: boolean;
  readonly?: boolean;
}

export function StarRating({
  rating,
  onRatingChange,
  size = 24,
  showRatingNumber = false,
  readonly = false,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const handleStarPress = (starIndex: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  const Star = ({ filled, half, index }: { filled: boolean; half: boolean; index: number }) => {
    if (readonly) {
      return (
        <Text style={[
          styles.star, 
          { fontSize: size }, 
          filled && styles.starFilled, 
          half && styles.starHalf
        ]}>
          {filled ? "★" : half ? "★" : "☆"}
        </Text>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => handleStarPress(index)}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`Rate ${index + 1} stars`}
      >
        <Text style={[
          styles.star, 
          { fontSize: size }, 
          filled && styles.starFilled, 
          half && styles.starHalf
        ]}>
          {filled ? "★" : "☆"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} filled={true} half={false} index={i} />
        ))}
        {hasHalfStar && <Star key="half" filled={false} half={true} index={fullStars} />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star 
            key={`empty-${i}`} 
            filled={false} 
            half={false} 
            index={fullStars + (hasHalfStar ? 1 : 0) + i} 
          />
        ))}
      </View>
      {showRatingNumber && (
        <Text style={styles.ratingNumber}>{rating.toFixed(1)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  star: {
    color: colors.border,
  },
  starFilled: {
    color: "#f59e0b",
  },
  starHalf: {
    color: "#fcd34d",
  },
  ratingNumber: {
    marginLeft: spacing.xs,
    fontSize: typography.body,
    fontWeight: typography.weightMedium,
    color: colors.text,
  },
});