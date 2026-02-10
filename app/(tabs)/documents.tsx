import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../../context/LanguageContext";

// Design system colors
const colors = {
  bgApp: "#FAF9F6",
  bgCard: "#FFFFFF",
  primary: "#7FB77E",
  secondary: "#5F8F8B",
  text: "#2F2F2F",
  textSecondary: "#4A4A4A",
  textMuted: "#8A8A8A",
  border: "rgba(0, 0, 0, 0.06)",
  error: "#F44336",
  warning: "#FF9800",
};

const DOCUMENTS_KEY = "@sanad_documents";

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  childName: string;
  dateAdded: string;
  size: string;
  notes?: string;
}

const CATEGORIES = [
  { id: "all", label: "All", labelAr: "الكل", icon: "folder" },
  { id: "medical", label: "Medical Records", labelAr: "السجلات الطبية", icon: "medkit" },
  { id: "diagnosis", label: "Diagnosis Reports", labelAr: "تقارير التشخيص", icon: "document-text" },
  { id: "therapy", label: "Therapy Sessions", labelAr: "جلسات العلاج", icon: "heart" },
  { id: "school", label: "School Reports", labelAr: "التقارير المدرسية", icon: "school" },
  { id: "other", label: "Other", labelAr: "أخرى", icon: "documents" },
];

// Mock documents for demo
const MOCK_DOCUMENTS: Document[] = [
  {
    id: "1",
    name: "Initial Diagnosis Report",
    type: "PDF",
    category: "diagnosis",
    childName: "Ahmed",
    dateAdded: "2024-01-15",
    size: "2.4 MB",
    notes: "First assessment at Kuwait Autism Center",
  },
  {
    id: "2",
    name: "Speech Therapy Progress - Q1",
    type: "PDF",
    category: "therapy",
    childName: "Ahmed",
    dateAdded: "2024-03-20",
    size: "1.8 MB",
  },
  {
    id: "3",
    name: "Vaccination Record",
    type: "PDF",
    category: "medical",
    childName: "Ahmed",
    dateAdded: "2024-02-10",
    size: "856 KB",
  },
  {
    id: "4",
    name: "School IEP Document",
    type: "PDF",
    category: "school",
    childName: "Ahmed",
    dateAdded: "2024-01-05",
    size: "3.2 MB",
    notes: "Individual Education Plan for 2024",
  },
];

export default function DocumentsScreen() {
  const { locale } = useLanguage();
  const isArabic = locale === "ar";
  
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDoc, setNewDoc] = useState({
    name: "",
    category: "medical",
    childName: "",
    notes: "",
  });

  const loadDocuments = async () => {
    try {
      const data = await AsyncStorage.getItem(DOCUMENTS_KEY);
      if (data) {
        setDocuments(JSON.parse(data));
      } else {
        // Load mock data for demo
        setDocuments(MOCK_DOCUMENTS);
        await AsyncStorage.setItem(DOCUMENTS_KEY, JSON.stringify(MOCK_DOCUMENTS));
      }
    } catch (error) {
      setDocuments(MOCK_DOCUMENTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadDocuments();
    setRefreshing(false);
  }, []);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const file = result.assets[0];
        setNewDoc((prev) => ({
          ...prev,
          name: file.name || "Untitled Document",
        }));
        setShowUploadModal(true);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick document. Please try again.");
    }
  };

  const handleSaveDocument = async () => {
    if (!newDoc.name.trim()) {
      Alert.alert("Missing Information", "Please enter a document name.");
      return;
    }

    const document: Document = {
      id: Date.now().toString(),
      name: newDoc.name,
      type: "PDF",
      category: newDoc.category,
      childName: newDoc.childName || "Not specified",
      dateAdded: new Date().toISOString().split("T")[0],
      size: "1.2 MB",
      notes: newDoc.notes,
    };

    const updatedDocs = [document, ...documents];
    setDocuments(updatedDocs);
    await AsyncStorage.setItem(DOCUMENTS_KEY, JSON.stringify(updatedDocs));

    setShowUploadModal(false);
    setNewDoc({ name: "", category: "medical", childName: "", notes: "" });
    Alert.alert("Success", "Document uploaded successfully!");
  };

  const handleDeleteDocument = async (id: string) => {
    Alert.alert(
      isArabic ? "حذف المستند" : "Delete Document",
      isArabic ? "هل أنت متأكد من حذف هذا المستند؟" : "Are you sure you want to delete this document?",
      [
        { text: isArabic ? "إلغاء" : "Cancel", style: "cancel" },
        {
          text: isArabic ? "حذف" : "Delete",
          style: "destructive",
          onPress: async () => {
            const updated = documents.filter((d) => d.id !== id);
            setDocuments(updated);
            await AsyncStorage.setItem(DOCUMENTS_KEY, JSON.stringify(updated));
          },
        },
      ]
    );
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.childName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getCategoryIcon = (category: string) => {
    return CATEGORIES.find((c) => c.id === category)?.icon || "document";
  };

  const getCategoryLabel = (category: string) => {
    const cat = CATEGORIES.find((c) => c.id === category);
    return isArabic ? cat?.labelAr : cat?.label;
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{isArabic ? "المستندات" : "Documents"}</Text>
            <Text style={styles.subtitle}>
              {isArabic
                ? "نظّم سجلات طفلك وتقاريره"
                : "Organize your child's records & reports"}
            </Text>
          </View>
          <Pressable
            style={({ pressed }) => [styles.uploadButton, pressed && { opacity: 0.8 }]}
            onPress={handlePickDocument}
          >
            <Ionicons name="cloud-upload" size={20} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="document" size={24} color={colors.primary} />
            <Text style={styles.statNumber}>{documents.length}</Text>
            <Text style={styles.statLabel}>{isArabic ? "إجمالي" : "Total"}</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="medkit" size={24} color="#FF6B6B" />
            <Text style={styles.statNumber}>
              {documents.filter((d) => d.category === "medical").length}
            </Text>
            <Text style={styles.statLabel}>{isArabic ? "طبي" : "Medical"}</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="school" size={24} color="#4ECDC4" />
            <Text style={styles.statNumber}>
              {documents.filter((d) => d.category === "school").length}
            </Text>
            <Text style={styles.statLabel}>{isArabic ? "مدرسة" : "School"}</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder={isArabic ? "البحث في المستندات..." : "Search documents..."}
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color={colors.textMuted} />
            </Pressable>
          )}
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterRow}
        >
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              style={({ pressed }) => [
                styles.filterChip,
                selectedCategory === cat.id && styles.filterChipActive,
                pressed && { opacity: 0.8 },
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Ionicons
                name={cat.icon as any}
                size={16}
                color={selectedCategory === cat.id ? "#FFFFFF" : colors.textSecondary}
              />
              <Text
                style={[
                  styles.filterChipText,
                  selectedCategory === cat.id && styles.filterChipTextActive,
                ]}
              >
                {isArabic ? cat.labelAr : cat.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Documents List */}
        <View style={styles.documentsList}>
          {filteredDocuments.map((doc) => (
            <Pressable
              key={doc.id}
              style={({ pressed }) => [styles.documentCard, pressed && { opacity: 0.9 }]}
            >
              <View style={styles.docIconContainer}>
                <Ionicons name={getCategoryIcon(doc.category) as any} size={24} color={colors.primary} />
              </View>
              <View style={styles.docContent}>
                <Text style={styles.docName} numberOfLines={1}>
                  {doc.name}
                </Text>
                <View style={styles.docMeta}>
                  <Text style={styles.docMetaText}>{getCategoryLabel(doc.category)}</Text>
                  <Text style={styles.docDot}>•</Text>
                  <Text style={styles.docMetaText}>{doc.childName}</Text>
                </View>
                <View style={styles.docFooter}>
                  <Text style={styles.docDate}>{formatDate(doc.dateAdded)}</Text>
                  <Text style={styles.docSize}>{doc.size}</Text>
                </View>
              </View>
              <Pressable
                style={({ pressed }) => [styles.deleteButton, pressed && { opacity: 0.6 }]}
                onPress={() => handleDeleteDocument(doc.id)}
              >
                <Ionicons name="trash-outline" size={18} color={colors.error} />
              </Pressable>
            </Pressable>
          ))}
        </View>

        {/* Empty State */}
        {filteredDocuments.length === 0 && !isLoading && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="folder-open-outline" size={48} color={colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>
              {isArabic ? "لا توجد مستندات" : "No Documents Found"}
            </Text>
            <Text style={styles.emptySubtitle}>
              {isArabic
                ? "ارفع مستنداتك الأولى للبدء"
                : "Upload your first document to get started"}
            </Text>
            <Pressable style={styles.emptyButton} onPress={handlePickDocument}>
              <Ionicons name="cloud-upload" size={18} color="#FFFFFF" />
              <Text style={styles.emptyButtonText}>
                {isArabic ? "رفع مستند" : "Upload Document"}
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

      {/* Upload Modal */}
      <Modal visible={showUploadModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {isArabic ? "تفاصيل المستند" : "Document Details"}
              </Text>
              <Pressable onPress={() => setShowUploadModal(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </Pressable>
            </View>

            <View style={styles.modalForm}>
              <Text style={styles.inputLabel}>
                {isArabic ? "اسم المستند" : "Document Name"}
              </Text>
              <TextInput
                style={styles.input}
                value={newDoc.name}
                onChangeText={(text) => setNewDoc((prev) => ({ ...prev, name: text }))}
                placeholder={isArabic ? "أدخل اسم المستند" : "Enter document name"}
              />

              <Text style={styles.inputLabel}>{isArabic ? "الفئة" : "Category"}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                  <Pressable
                    key={cat.id}
                    style={[
                      styles.categoryChip,
                      newDoc.category === cat.id && styles.categoryChipActive,
                    ]}
                    onPress={() => setNewDoc((prev) => ({ ...prev, category: cat.id }))}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        newDoc.category === cat.id && styles.categoryChipTextActive,
                      ]}
                    >
                      {isArabic ? cat.labelAr : cat.label}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>

              <Text style={styles.inputLabel}>{isArabic ? "اسم الطفل" : "Child Name"}</Text>
              <TextInput
                style={styles.input}
                value={newDoc.childName}
                onChangeText={(text) => setNewDoc((prev) => ({ ...prev, childName: text }))}
                placeholder={isArabic ? "أدخل اسم الطفل" : "Enter child name"}
              />

              <Text style={styles.inputLabel}>{isArabic ? "ملاحظات" : "Notes (Optional)"}</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={newDoc.notes}
                onChangeText={(text) => setNewDoc((prev) => ({ ...prev, notes: text }))}
                placeholder={isArabic ? "أضف ملاحظات..." : "Add notes..."}
                multiline
                numberOfLines={3}
              />
            </View>

            <Pressable
              style={({ pressed }) => [styles.saveButton, pressed && { opacity: 0.9 }]}
              onPress={handleSaveDocument}
            >
              <Ionicons name="checkmark" size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>{isArabic ? "حفظ المستند" : "Save Document"}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgApp,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  uploadButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  // Stats
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  // Search
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    marginLeft: 10,
  },
  // Filter
  filterScroll: {
    marginHorizontal: -20,
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.bgCard,
    gap: 6,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },
  // Documents List
  documentsList: {
    gap: 12,
  },
  documentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  docIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  docContent: {
    flex: 1,
  },
  docName: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  docMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  docMetaText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  docDot: {
    color: colors.textMuted,
    marginHorizontal: 6,
  },
  docFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  docDate: {
    fontSize: 11,
    color: colors.textMuted,
  },
  docSize: {
    fontSize: 11,
    color: colors.textMuted,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  deleteButton: {
    padding: 8,
  },
  // Empty State
  emptyState: {
    alignItems: "center",
    paddingTop: 40,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 20,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  emptyButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.bgCard,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  modalForm: {
    gap: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  categoryScroll: {
    marginBottom: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryChipText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  categoryChipTextActive: {
    color: "#FFFFFF",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 20,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
