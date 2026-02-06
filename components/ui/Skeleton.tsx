import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 20,
  borderRadius = 8,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width, height, borderRadius, opacity },
        style,
      ]}
    />
  );
};

// Pre-built skeleton patterns for common use cases
export const CardSkeleton: React.FC = () => (
  <View style={styles.card}>
    <View style={styles.cardRow}>
      <Skeleton width={56} height={56} borderRadius={28} />
      <View style={styles.cardContent}>
        <Skeleton width="60%" height={18} style={{ marginBottom: 8 }} />
        <Skeleton width="40%" height={14} style={{ marginBottom: 6 }} />
        <Skeleton width="30%" height={12} />
      </View>
    </View>
  </View>
);

export const ListItemSkeleton: React.FC = () => (
  <View style={styles.listItem}>
    <Skeleton width={48} height={48} borderRadius={12} />
    <View style={styles.listContent}>
      <Skeleton width="70%" height={16} style={{ marginBottom: 6 }} />
      <Skeleton width="50%" height={13} />
    </View>
    <Skeleton width={20} height={20} borderRadius={10} />
  </View>
);

export const ProfileSkeleton: React.FC = () => (
  <View style={styles.profileContainer}>
    <Skeleton width={100} height={100} borderRadius={50} style={{ alignSelf: "center" }} />
    <Skeleton width="50%" height={20} style={{ alignSelf: "center", marginTop: 16 }} />
    <Skeleton width="40%" height={14} style={{ alignSelf: "center", marginTop: 8 }} />
  </View>
);

export const GridSkeleton: React.FC<{ columns?: number; count?: number }> = ({
  columns = 3,
  count = 6,
}) => (
  <View style={[styles.grid, { flexDirection: "row", flexWrap: "wrap" }]}>
    {Array.from({ length: count }).map((_, index) => (
      <View
        key={index}
        style={[styles.gridItem, { width: `${100 / columns - 2}%` }]}
      >
        <Skeleton height={80} borderRadius={12} style={{ marginBottom: 8 }} />
        <Skeleton width="60%" height={12} style={{ marginBottom: 4 }} />
        <Skeleton width="40%" height={10} />
      </View>
    ))}
  </View>
);

export const ChipSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => (
  <View style={styles.chipContainer}>
    {Array.from({ length: count }).map((_, index) => (
      <Skeleton
        key={index}
        width={80 + Math.random() * 40}
        height={36}
        borderRadius={18}
        style={{ marginRight: 8 }}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#E1E9EE",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
    marginLeft: 14,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  listContent: {
    flex: 1,
    marginLeft: 12,
  },
  profileContainer: {
    paddingVertical: 20,
  },
  grid: {
    gap: 12,
  },
  gridItem: {
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
});

export default Skeleton;
