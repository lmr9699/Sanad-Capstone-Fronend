import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFavorites } from "../../../context/FavoritesContext";
import { useLanguage } from "../../../context/LanguageContext";

// Design system colors
const colors = {
  bgApp: "#FAF9F6",
  bgCard: "#FFFFFF",
  primary: "#7FB77E",
  primaryLight: "#E8F5E8",
  secondary: "#5F8F8B",
  text: "#2F2F2F",
  textSecondary: "#4A4A4A",
  textMuted: "#8A8A8A",
  border: "rgba(0, 0, 0, 0.06)",
};

// Professional data (in real app, this would come from API)
// Note: Location refers to the professional's WORKPLACE (clinic/center), not personal address
const PROFESSIONALS_DATA: Record<
  string,
  {
    id: string;
    name: string;
    specialty: string;
    specialtyLabel: string;
    experience: string;
    rating: number;
    reviews: number;
    availability: string;
    verified: boolean;
    color: string;
    bio: string;
    education: string[];
    certifications: string[];
    languages: string[];
    services: string[];
    workplace: string;
    workplaceAddress: string;
    consultationFee: string;
    nextAvailable: string;
  }
> = {
  "1": {
    id: "1",
    name: "Dr. Sarah Al-Mutairi",
    specialty: "speech",
    specialtyLabel: "Speech Therapist",
    experience: "10 years",
    rating: 4.9,
    reviews: 127,
    availability: "Available today",
    verified: true,
    color: "#7FB77E",
    bio: "Dr. Sarah Al-Mutairi is a certified speech-language pathologist specializing in pediatric speech and language disorders. With over 10 years of experience in Kuwait, she has helped hundreds of children improve their communication skills through evidence-based therapy techniques.",
    education: [
      "PhD in Speech-Language Pathology, Kuwait University",
      "MSc in Communication Disorders, American University of Kuwait",
    ],
    certifications: [
      "Board Certified Specialist in Child Language",
      "PROMPT Certified",
      "Hanen Certified",
    ],
    languages: ["Arabic", "English"],
    services: [
      "Speech Delay Therapy",
      "Articulation Therapy",
      "Language Development",
      "Fluency Disorders",
    ],
    workplace: "Kuwait Autism Center",
    workplaceAddress: "Sharq, Capital Governorate, Kuwait",
    consultationFee: "25 KWD",
    nextAvailable: "Today, 3:00 PM",
  },
  "2": {
    id: "2",
    name: "Dr. Mohammed Al-Sabah",
    specialty: "behavioral",
    specialtyLabel: "Behavioral Specialist",
    experience: "8 years",
    rating: 4.8,
    reviews: 98,
    availability: "Next available: Tomorrow",
    verified: true,
    color: "#E8A838",
    bio: "Dr. Mohammed Al-Sabah is a board-certified behavior analyst (BCBA) specializing in Applied Behavior Analysis (ABA) for children with autism and developmental disorders. He focuses on creating individualized treatment plans that help children reach their full potential.",
    education: [
      "Master's in Applied Behavior Analysis, Florida Institute of Technology",
      "Bachelor's in Psychology, Kuwait University",
    ],
    certifications: [
      "Board Certified Behavior Analyst (BCBA)",
      "Registered Behavior Technician Supervisor",
    ],
    languages: ["Arabic", "English"],
    services: [
      "ABA Therapy",
      "Behavior Modification",
      "Social Skills Training",
      "Parent Training",
    ],
    workplace: "Hope Therapy Clinic",
    workplaceAddress: "Mirqab, Capital Governorate, Kuwait",
    consultationFee: "30 KWD",
    nextAvailable: "Tomorrow, 10:00 AM",
  },
  "3": {
    id: "3",
    name: "Dr. Fatima Al-Kandari",
    specialty: "occupational",
    specialtyLabel: "Occupational Therapist",
    experience: "12 years",
    rating: 4.9,
    reviews: 156,
    availability: "Available today",
    verified: true,
    color: "#5F8F8B",
    bio: "Dr. Fatima Al-Kandari is an experienced occupational therapist who helps children develop the skills they need for daily living and academic success. She specializes in sensory integration therapy and fine motor skill development.",
    education: [
      "Doctorate in Occupational Therapy, University of Jordan",
      "BSc in Occupational Therapy, Cairo University",
    ],
    certifications: [
      "Sensory Integration and Praxis Tests (SIPT) Certified",
      "Handwriting Without Tears Certified",
    ],
    languages: ["Arabic", "English", "French"],
    services: [
      "Sensory Integration Therapy",
      "Fine Motor Skills Development",
      "Self-Care Training",
      "School Readiness",
    ],
    workplace: "Al-Wafaa Rehabilitation Center",
    workplaceAddress: "Salmiya, Hawalli Governorate, Kuwait",
    consultationFee: "28 KWD",
    nextAvailable: "Today, 5:00 PM",
  },
  "4": {
    id: "4",
    name: "Dr. Omar Al-Rashidi",
    specialty: "educational",
    specialtyLabel: "Educational Psychologist",
    experience: "6 years",
    rating: 4.7,
    reviews: 67,
    availability: "Next available: Wed",
    verified: true,
    color: "#7B68EE",
    bio: "Dr. Omar Al-Rashidi is an educational psychologist dedicated to helping children with learning differences achieve academic success. He conducts comprehensive assessments and develops personalized learning strategies aligned with Kuwait's educational system.",
    education: [
      "PhD in Educational Psychology, University of Edinburgh",
      "MA in Special Education, Lebanese American University",
    ],
    certifications: [
      "Licensed Educational Psychologist",
      "Certified Learning Disabilities Specialist",
    ],
    languages: ["Arabic", "English"],
    services: [
      "Psychological Assessment",
      "Learning Disability Evaluation",
      "IEP Development",
      "Academic Counseling",
    ],
    workplace: "Al-Amal Learning Center",
    workplaceAddress: "Jahra City, Jahra Governorate, Kuwait",
    consultationFee: "35 KWD",
    nextAvailable: "Wednesday, 11:00 AM",
  },
  "5": {
    id: "5",
    name: "Dr. Layla Al-Enezi",
    specialty: "speech",
    specialtyLabel: "Speech Therapist",
    experience: "15 years",
    rating: 5.0,
    reviews: 203,
    availability: "Available today",
    verified: true,
    color: "#7FB77E",
    bio: "Dr. Layla Al-Enezi is one of the most experienced speech therapists in Kuwait, with 15 years of expertise in treating children with complex communication disorders. She is known for her patient-centered approach and exceptional outcomes.",
    education: [
      "PhD in Communication Sciences, Boston University",
      "MSc in Speech-Language Pathology, McGill University",
    ],
    certifications: [
      "ASHA Certified",
      "PROMPT Level 3 Instructor",
      "AAC Specialist",
    ],
    languages: ["Arabic", "English", "French"],
    services: [
      "Complex Communication Disorders",
      "Augmentative Communication (AAC)",
      "Childhood Apraxia of Speech",
      "Feeding and Swallowing",
    ],
    workplace: "Al-Noor Special Education School",
    workplaceAddress: "Khaitan, Farwaniya Governorate, Kuwait",
    consultationFee: "40 KWD",
    nextAvailable: "Today, 4:30 PM",
  },
  "6": {
    id: "6",
    name: "Dr. Youssef Al-Hajri",
    specialty: "behavioral",
    specialtyLabel: "Behavioral Analyst",
    experience: "9 years",
    rating: 4.8,
    reviews: 112,
    availability: "Available today",
    verified: true,
    color: "#E8A838",
    bio: "Dr. Youssef Al-Hajri specializes in behavioral interventions for children with autism spectrum disorder. His approach combines ABA principles with naturalistic teaching strategies to promote meaningful skill development.",
    education: [
      "Master's in Behavior Analysis, Western Michigan University",
      "Bachelor's in Psychology, American University of Kuwait",
    ],
    certifications: [
      "Board Certified Behavior Analyst (BCBA)",
      "Early Start Denver Model (ESDM) Certified",
    ],
    languages: ["Arabic", "English"],
    services: [
      "Early Intervention",
      "Verbal Behavior Therapy",
      "Naturalistic Teaching",
      "Behavior Support Plans",
    ],
    workplace: "Kuwait Autism Center",
    workplaceAddress: "Sharq, Capital Governorate, Kuwait",
    consultationFee: "28 KWD",
    nextAvailable: "Today, 2:00 PM",
  },
  "7": {
    id: "7",
    name: "Dr. Nour Al-Shammari",
    specialty: "occupational",
    specialtyLabel: "Occupational Therapist",
    experience: "7 years",
    rating: 4.6,
    reviews: 89,
    availability: "Next available: Thu",
    verified: false,
    color: "#5F8F8B",
    bio: "Dr. Nour Al-Shammari is an occupational therapist focusing on helping children with developmental delays and sensory processing challenges. She creates fun, engaging therapy sessions that motivate children to learn new skills.",
    education: [
      "MSc in Occupational Therapy, University of Toronto",
      "BSc in Rehabilitation Sciences, Kuwait University",
    ],
    certifications: [
      "Certified Autism Specialist",
      "DIR/Floortime Trained",
    ],
    languages: ["Arabic", "English"],
    services: [
      "Developmental Delay Therapy",
      "Sensory Processing",
      "Play-Based Therapy",
      "Visual Motor Skills",
    ],
    workplace: "Kuwait Physical Therapy Center",
    workplaceAddress: "Abu Fatira, Mubarak Al-Kabeer Governorate, Kuwait",
    consultationFee: "25 KWD",
    nextAvailable: "Thursday, 9:00 AM",
  },
  "8": {
    id: "8",
    name: "Dr. Ahmad Al-Fadhli",
    specialty: "physical",
    specialtyLabel: "Physical Therapist",
    experience: "11 years",
    rating: 4.9,
    reviews: 145,
    availability: "Available today",
    verified: true,
    color: "#D9534F",
    bio: "Dr. Ahmad Al-Fadhli is a pediatric physical therapist specializing in gross motor development and rehabilitation. He works with children of all ages to improve mobility, strength, and coordination through evidence-based interventions.",
    education: [
      "Doctorate in Physical Therapy, University of Southern California",
      "BSc in Physical Therapy, Ain Shams University",
    ],
    certifications: [
      "Pediatric Clinical Specialist (PCS)",
      "NDT Certified",
      "Kinesio Taping Certified",
    ],
    languages: ["Arabic", "English"],
    services: [
      "Gross Motor Development",
      "Gait Training",
      "Strength and Balance",
      "Post-Surgery Rehabilitation",
    ],
    workplace: "Kuwait Physical Therapy Center",
    workplaceAddress: "Abu Fatira, Mubarak Al-Kabeer Governorate, Kuwait",
    consultationFee: "28 KWD",
    nextAvailable: "Today, 1:00 PM",
  },
};

export default function ProfessionalDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { t } = useLanguage();
  const professional = PROFESSIONALS_DATA[id as string];

  if (!professional) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Professional not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(professional.id, "professional");

  const handleToggleFavorite = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (isFav) {
      await removeFavorite(professional.id, "professional");
    } else {
      await addFavorite({
        id: professional.id,
        type: "professional",
        name: professional.name,
        subtitle: professional.specialtyLabel,
      });
    }
  };

  const handleBookAppointment = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({
      pathname: "/(tabs)/professionals/book-appointment",
      params: {
        professionalId: professional.id,
        professionalName: professional.name,
      },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t("professionals.profile")}</Text>
        <Pressable 
          style={({ pressed }) => [styles.shareBtn, pressed && { opacity: 0.7 }]}
          onPress={handleToggleFavorite}
        >
          <Ionicons 
            name={isFav ? "heart" : "heart-outline"} 
            size={22} 
            color={isFav ? "#FF6B6B" : colors.text} 
          />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Hero */}
        <View style={styles.heroSection}>
          <View
            style={[
              styles.heroAvatar,
              { backgroundColor: `${professional.color}20` },
            ]}
          >
            <Text style={[styles.heroAvatarText, { color: professional.color }]}>
              {professional.name.split(" ").slice(1, 3).map(n => n[0]).join("")}
            </Text>
            {professional.verified && (
              <View style={styles.verifiedBadgeLarge}>
                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
              </View>
            )}
          </View>

          <Text style={styles.professionalName}>{professional.name}</Text>
          <Text style={[styles.specialtyLabel, { color: professional.color }]}>
            {professional.specialtyLabel}
          </Text>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.statIconWrap}>
                <Ionicons name="star" size={18} color="#F5A623" />
              </View>
              <Text style={styles.statValue}>{professional.rating}</Text>
              <Text style={styles.statLabel}>{professional.reviews} {t("professionals.reviews")}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.statIconWrap}>
                <Ionicons name="briefcase-outline" size={18} color={colors.primary} />
              </View>
              <Text style={styles.statValue}>{professional.experience}</Text>
              <Text style={styles.statLabel}>{t("professionals.experience")}</Text>
            </View>
          </View>
        </View>

        {/* Quick Info Card */}
        <View style={styles.quickInfoCard}>
          <View style={styles.quickInfoRow}>
            <Ionicons name="cash-outline" size={20} color={colors.primary} />
            <View style={styles.quickInfoContent}>
              <Text style={styles.quickInfoLabel}>{t("professionals.consultationFee")}</Text>
              <Text style={styles.quickInfoValue}>{professional.consultationFee}</Text>
            </View>
          </View>
          <View style={styles.quickInfoDivider} />
          <View style={styles.quickInfoRow}>
            <Ionicons name="business-outline" size={20} color={colors.primary} />
            <View style={styles.quickInfoContent}>
              <Text style={styles.quickInfoLabel}>{t("professionals.worksAt")}</Text>
              <Text style={styles.quickInfoValue}>{professional.workplace}</Text>
              <Text style={styles.quickInfoSubValue}>{professional.workplaceAddress}</Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("professionals.about")}</Text>
          <Text style={styles.bioText}>{professional.bio}</Text>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("professionals.servicesOffered")}</Text>
          <View style={styles.servicesList}>
            {professional.services.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <View style={[styles.serviceDot, { backgroundColor: professional.color }]} />
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("professionals.education")}</Text>
          {professional.education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <Ionicons name="school-outline" size={18} color={colors.textMuted} />
              <Text style={styles.educationText}>{edu}</Text>
            </View>
          ))}
        </View>

        {/* Certifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("professionals.certifications")}</Text>
          <View style={styles.certificationsList}>
            {professional.certifications.map((cert, index) => (
              <View key={index} style={styles.certificationBadge}>
                <Ionicons name="ribbon-outline" size={14} color={colors.primary} />
                <Text style={styles.certificationText}>{cert}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Languages Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("professionals.languages")}</Text>
          <View style={styles.languagesRow}>
            {professional.languages.map((lang, index) => (
              <View key={index} style={styles.languageBadge}>
                <Text style={styles.languageText}>{lang}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <Pressable style={styles.messageButton}>
          <Ionicons name="chatbubble-outline" size={22} color={colors.primary} />
        </Pressable>
        <Pressable style={styles.callButton}>
          <Ionicons name="call-outline" size={22} color={colors.primary} />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.bookButton,
            pressed && { transform: [{ scale: 0.98 }] },
          ]}
          onPress={handleBookAppointment}
        >
          <Text style={styles.bookButtonText}>{t("professionals.bookAppointment")}</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgApp,
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.bgCard,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.text,
  },
  shareBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.bgCard,
    alignItems: "center",
    justifyContent: "center",
  },
  // Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  // Hero Section
  heroSection: {
    alignItems: "center",
    paddingVertical: 24,
  },
  heroAvatar: {
    width: 100,
    height: 100,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    position: "relative",
  },
  heroAvatarText: {
    fontSize: 32,
    fontWeight: "700",
  },
  verifiedBadgeLarge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.bgApp,
  },
  professionalName: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 6,
  },
  specialtyLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 20,
  },
  // Stats Row
  statsRow: {
    flexDirection: "row",
    backgroundColor: colors.bgCard,
    borderRadius: 18,
    padding: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statIconWrap: {
    marginBottom: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  // Quick Info Card
  quickInfoCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  quickInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 8,
  },
  quickInfoContent: {
    flex: 1,
  },
  quickInfoLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 2,
  },
  quickInfoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  quickInfoSubValue: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  quickInfoDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  // Section
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
  },
  bioText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  // Services
  servicesList: {
    gap: 10,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  serviceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  serviceText: {
    fontSize: 15,
    color: colors.text,
  },
  // Education
  educationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 10,
  },
  educationText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  // Certifications
  certificationsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  certificationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: `${colors.primary}12`,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  certificationText: {
    fontSize: 13,
    color: colors.text,
  },
  // Languages
  languagesRow: {
    flexDirection: "row",
    gap: 10,
  },
  languageBadge: {
    backgroundColor: colors.bgCard,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  languageText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  // Bottom CTA
  bottomCTA: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: colors.bgCard,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  messageButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
  },
  callButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
  },
  bookButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  // Error
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.textMuted,
    marginBottom: 16,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
