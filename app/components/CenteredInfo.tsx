import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
};

export default function CenteredInfo({ icon, title, subtitle }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>{icon}</View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F6F2",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    gap: 10,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.04)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#2B2B2B",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B6B6B",
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 320,
  },
});
