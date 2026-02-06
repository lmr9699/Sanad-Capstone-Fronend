import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const colors = {
  primary: "#7FB77E",
  secondary: "#5F8F8B",
  background: "#FAF9F6",
  text: "#2F2F2F",
  textSecondary: "#666666",
  white: "#FFFFFF",
};

const ONBOARDING_KEY = "@sanad_onboarding_complete";

const SLIDES = [
  {
    id: 1,
    icon: "heart",
    iconColor: "#FF6B6B",
    title: "Welcome to SANAD",
    titleAr: "مرحباً في سند",
    subtitle: "Your trusted companion for supporting People of Determination",
    subtitleAr: "رفيقك الموثوق لدعم ذوي الهمم",
  },
  {
    id: 2,
    icon: "people",
    iconColor: "#7FB77E",
    title: "Find Expert Care",
    titleAr: "ابحث عن رعاية متخصصة",
    subtitle: "Connect with verified professionals and specialized centers in Kuwait",
    subtitleAr: "تواصل مع متخصصين معتمدين ومراكز متخصصة في الكويت",
  },
  {
    id: 3,
    icon: "calendar",
    iconColor: "#5F8F8B",
    title: "Book Appointments",
    titleAr: "احجز المواعيد",
    subtitle: "Schedule sessions with therapists and track your child's progress",
    subtitleAr: "جدول جلسات مع المعالجين وتابع تقدم طفلك",
  },
  {
    id: 4,
    icon: "library",
    iconColor: "#E8A838",
    title: "Access Resources",
    titleAr: "احصل على الموارد",
    subtitle: "Explore articles, videos, and guides tailored for your needs",
    subtitleAr: "استكشف المقالات والفيديوهات والأدلة المخصصة لاحتياجاتك",
  },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef<any>(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      slideRef.current?.scrollTo({
        x: width * (currentIndex + 1),
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, "true");
      router.replace("/(auth)/login");
    } catch (error) {
      router.replace("/(auth)/login");
    }
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.skipButton, pressed && { opacity: 0.7 }]}
          onPress={handleSkip}
        >
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      {/* Slides */}
      <Animated.ScrollView
        ref={slideRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        {SLIDES.map((slide) => (
          <View key={slide.id} style={styles.slide}>
            <View style={[styles.iconContainer, { backgroundColor: `${slide.iconColor}20` }]}>
              <Ionicons name={slide.icon as any} size={80} color={slide.iconColor} />
            </View>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.titleAr}>{slide.titleAr}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
            <Text style={styles.subtitleAr}>{slide.subtitleAr}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      {/* Pagination */}
      <View style={styles.pagination}>
        {SLIDES.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 24, 8],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={index}
              style={[styles.dot, { width: dotWidth, opacity }]}
            />
          );
        })}
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.nextButton,
            pressed && { transform: [{ scale: 0.98 }] },
          ]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentIndex === SLIDES.length - 1 ? "Get Started" : "Next"}
          </Text>
          <Ionicons
            name={currentIndex === SLIDES.length - 1 ? "checkmark" : "arrow-forward"}
            size={20}
            color={colors.white}
          />
        </Pressable>

        {currentIndex === SLIDES.length - 1 && (
          <Text style={styles.termsText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  slide: {
    width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: 8,
  },
  titleAr: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 8,
  },
  subtitleAr: {
    fontSize: 15,
    color: colors.secondary,
    textAlign: "center",
    lineHeight: 22,
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginHorizontal: 4,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white,
  },
  termsText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 18,
  },
});
