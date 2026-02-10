import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const ONBOARDING_KEY = "@sanad_onboarding_complete";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [checkedToken, setCheckedToken] = useState(false);

  useEffect(() => {
    checkOnboarding();
    checkTokenValidity();
  }, []);

  const checkOnboarding = async () => {
    try {
      const onboardingComplete = await AsyncStorage.getItem(ONBOARDING_KEY);
      setShowOnboarding(onboardingComplete !== "true");
    } catch (error) {
      setShowOnboarding(false);
    } finally {
      setIsLoading(false);
    }
  };
  const checkTokenValidity = async () => {
    const token = await SecureStore.getItemAsync("token");

    if (token) {
      setCheckedToken(true);
    } else {
      setCheckedToken(false);
    }
  };
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#7FB77E" />
      </View>
    );
  }

  if (showOnboarding) {
    return <Redirect href="/(onboarding)/welcome" />;
  } else if (checkedToken) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF9F6",
  },
});
