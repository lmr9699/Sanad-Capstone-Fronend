import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../../../context/LanguageContext";

const colors = {
  bgApp: "#FAF9F6",
  bgCard: "#FFFFFF",
  primary: "#7FB77E",
  secondary: "#5F8F8B",
  text: "#2F2F2F",
  textSecondary: "#666666",
  textMuted: "#999999",
  border: "#E8E8E8",
};

interface FAQ {
  id: string;
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
}

const FAQS: FAQ[] = [
  {
    id: "1",
    question: "How do I book an appointment?",
    questionAr: "كيف أحجز موعداً؟",
    answer: "Navigate to the Professionals tab, select a professional, and tap 'Book Appointment'. Choose your preferred date and time from the available slots.",
    answerAr: "انتقل إلى تبويب الخبراء، اختر متخصصاً، ثم اضغط على 'حجز موعد'. اختر التاريخ والوقت المناسب من الأوقات المتاحة.",
  },
  {
    id: "2",
    question: "How do I add my child's information?",
    questionAr: "كيف أضيف معلومات طفلي؟",
    answer: "Go to Profile > Manage Children > Add a Child. Fill in the required information including diagnosis, medications, and allergies.",
    answerAr: "اذهب إلى الملف الشخصي > إدارة الأطفال > إضافة طفل. أدخل المعلومات المطلوبة بما في ذلك التشخيص والأدوية والحساسية.",
  },
  {
    id: "3",
    question: "Can I save favorite professionals and centers?",
    questionAr: "هل يمكنني حفظ الخبراء والمراكز المفضلة؟",
    answer: "Yes! Tap the heart icon on any professional or center card to add them to your favorites. Access your favorites from Profile > My Favorites.",
    answerAr: "نعم! اضغط على أيقونة القلب في أي بطاقة خبير أو مركز لإضافتهم للمفضلة. يمكنك الوصول للمفضلة من الملف الشخصي > المفضلة.",
  },
  {
    id: "4",
    question: "How do I upload documents?",
    questionAr: "كيف أرفع المستندات؟",
    answer: "Go to the Documents tab and tap the upload button. You can upload PDFs or images of medical records, reports, and other important documents.",
    answerAr: "اذهب إلى تبويب المستندات واضغط على زر الرفع. يمكنك رفع ملفات PDF أو صور للسجلات الطبية والتقارير والمستندات المهمة.",
  },
  {
    id: "5",
    question: "Is my data secure?",
    questionAr: "هل بياناتي آمنة؟",
    answer: "Yes, we take data security very seriously. All personal information is encrypted and stored securely. We never share your data with third parties without your consent.",
    answerAr: "نعم، نولي أمان البيانات أهمية كبيرة. جميع المعلومات الشخصية مشفرة ومخزنة بشكل آمن. لا نشارك بياناتك مع أطراف ثالثة دون موافقتك.",
  },
  {
    id: "6",
    question: "How do I change the app language?",
    questionAr: "كيف أغيّر لغة التطبيق؟",
    answer: "Go to Profile > App Settings > Language. You can choose between English and Arabic. The app will update immediately.",
    answerAr: "اذهب إلى الملف الشخصي > إعدادات التطبيق > اللغة. يمكنك الاختيار بين العربية والإنجليزية. سيتم تحديث التطبيق فوراً.",
  },
  {
    id: "7",
    question: "How do I cancel an appointment?",
    questionAr: "كيف ألغي موعداً؟",
    answer: "Go to Profile > My Appointments, find the appointment you want to cancel, and tap the 'Cancel' button. Please note cancellation policies may apply.",
    answerAr: "اذهب إلى الملف الشخصي > مواعيدي، ابحث عن الموعد الذي تريد إلغاءه، واضغط على زر 'إلغاء'. يرجى ملاحظة أنه قد تنطبق سياسات الإلغاء.",
  },
];

const CONTACT_OPTIONS = [
  {
    id: "email",
    icon: "mail",
    label: "Email Us",
    labelAr: "راسلنا",
    subtitle: "support@sanad.kw",
    action: () => Linking.openURL("mailto:support@sanad.kw"),
  },
  {
    id: "phone",
    icon: "call",
    label: "Call Us",
    labelAr: "اتصل بنا",
    subtitle: "+965 2200 0000",
    action: () => Linking.openURL("tel:+96522000000"),
  },
  {
    id: "whatsapp",
    icon: "logo-whatsapp",
    label: "WhatsApp",
    labelAr: "واتساب",
    subtitle: "+965 5000 0000",
    action: () => Linking.openURL("https://wa.me/96550000000"),
  },
];

export default function HelpScreen() {
  const router = useRouter();
  const { locale } = useLanguage();
  const isArabic = locale === "ar";
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>
          {isArabic ? "المساعدة والدعم" : "Help & Support"}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <Ionicons name="help-buoy" size={48} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>
            {isArabic ? "كيف يمكننا مساعدتك؟" : "How can we help you?"}
          </Text>
          <Text style={styles.heroSubtitle}>
            {isArabic
              ? "اعثر على إجابات للأسئلة الشائعة أو تواصل معنا"
              : "Find answers to common questions or contact us"}
          </Text>
        </View>

        {/* FAQ Section */}
        <Text style={styles.sectionTitle}>
          {isArabic ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
        </Text>
        <View style={styles.faqContainer}>
          {FAQS.map((faq) => (
            <Pressable
              key={faq.id}
              style={styles.faqItem}
              onPress={() => toggleFaq(faq.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>
                  {isArabic ? faq.questionAr : faq.question}
                </Text>
                <Ionicons
                  name={expandedFaq === faq.id ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={colors.textSecondary}
                />
              </View>
              {expandedFaq === faq.id && (
                <Text style={styles.faqAnswer}>
                  {isArabic ? faq.answerAr : faq.answer}
                </Text>
              )}
            </Pressable>
          ))}
        </View>

        {/* Contact Section */}
        <Text style={styles.sectionTitle}>
          {isArabic ? "تواصل معنا" : "Contact Us"}
        </Text>
        <View style={styles.contactContainer}>
          {CONTACT_OPTIONS.map((option) => (
            <Pressable
              key={option.id}
              style={({ pressed }) => [
                styles.contactCard,
                pressed && { opacity: 0.8 },
              ]}
              onPress={option.action}
            >
              <View style={styles.contactIcon}>
                <Ionicons name={option.icon as any} size={24} color={colors.primary} />
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactLabel}>
                  {isArabic ? option.labelAr : option.label}
                </Text>
                <Text style={styles.contactSubtitle}>{option.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <View style={styles.aboutIcon}>
            <Text style={styles.logoText}>SANAD</Text>
          </View>
          <Text style={styles.aboutTitle}>
            {isArabic ? "عن سند" : "About SANAD"}
          </Text>
          <Text style={styles.aboutText}>
            {isArabic
              ? "سند هو تطبيق مصمم لدعم أولياء الأمور والأسر التي لديها أطفال من ذوي الهمم في الكويت. نحن نربطكم بالمتخصصين والمراكز والموارد المعتمدة."
              : "SANAD is an app designed to support parents and families with People of Determination in Kuwait. We connect you with verified professionals, centers, and resources."}
          </Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgApp,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.bgCard,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  headerSpacer: {
    width: 40,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  // Hero Section
  heroSection: {
    alignItems: "center",
    paddingVertical: 24,
    marginBottom: 16,
  },
  heroIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
    maxWidth: 280,
  },
  // Section Title
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 14,
    marginTop: 8,
  },
  // FAQ Section
  faqContainer: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  faqItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    paddingRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  // Contact Section
  contactContainer: {
    gap: 12,
    marginBottom: 24,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  contactContent: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  // About Section
  aboutSection: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    marginBottom: 20,
  },
  aboutIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
  },
  versionText: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
