import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colors = {
  bgApp: "#FAF9F6",
  bgCard: "#FFFFFF",
  primary: "#7FB77E",
  secondary: "#5F8F8B",
  text: "#2F2F2F",
  textSecondary: "#666666",
  textMuted: "#999999",
  border: "#E8E8E8",
  success: "#4CAF50",
  warning: "#FF9800",
  error: "#F44336",
};

const APPOINTMENTS_KEY = "@sanad_appointments";

interface Appointment {
  id: string;
  professionalId: string;
  professionalName: string;
  date: string;
  time: string;
  status: "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function AppointmentsScreen() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadAppointments = async () => {
    try {
      const data = await AsyncStorage.getItem(APPOINTMENTS_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        // Sort by date, newest first
        parsed.sort((a: Appointment, b: Appointment) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setAppointments(parsed);
      }
    } catch (error) {
      console.log("Error loading appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadAppointments();
    setRefreshing(false);
  }, []);

  const handleCancelAppointment = async (id: string) => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: async () => {
            try {
              const updated = appointments.map((apt) =>
                apt.id === id ? { ...apt, status: "cancelled" as const } : apt
              );
              await AsyncStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
              setAppointments(updated);
              Alert.alert("Cancelled", "Your appointment has been cancelled.");
            } catch (error) {
              Alert.alert("Error", "Failed to cancel appointment.");
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return colors.success;
      case "completed":
        return colors.secondary;
      case "cancelled":
        return colors.error;
      default:
        return colors.textMuted;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return "checkmark-circle";
      case "completed":
        return "checkbox";
      case "cancelled":
        return "close-circle";
      default:
        return "time";
    }
  };

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "confirmed" && new Date(apt.date) >= new Date()
  );
  const pastAppointments = appointments.filter(
    (apt) => apt.status !== "confirmed" || new Date(apt.date) < new Date()
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>My Appointments</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
      >
        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{upcomingAppointments.length}</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {appointments.filter((a) => a.status === "completed").length}
            </Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{appointments.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Upcoming</Text>
            {upcomingAppointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentCard}>
                <View style={styles.appointmentHeader}>
                  <View style={styles.doctorAvatar}>
                    <Ionicons name="person" size={24} color={colors.primary} />
                  </View>
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.doctorName}>{appointment.professionalName}</Text>
                    <View style={styles.dateTimeRow}>
                      <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
                      <Text style={styles.dateTimeText}>{formatDate(appointment.date)}</Text>
                      <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                      <Text style={styles.dateTimeText}>{appointment.time}</Text>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(appointment.status)}20` }]}>
                    <Ionicons
                      name={getStatusIcon(appointment.status) as any}
                      size={14}
                      color={getStatusColor(appointment.status)}
                    />
                    <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Text>
                  </View>
                </View>
                <View style={styles.appointmentActions}>
                  <Pressable
                    style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.7 }]}
                    onPress={() => handleCancelAppointment(appointment.id)}
                  >
                    <Ionicons name="close-circle-outline" size={18} color={colors.error} />
                    <Text style={[styles.actionText, { color: colors.error }]}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [styles.actionButton, styles.rescheduleButton, pressed && { opacity: 0.7 }]}
                  >
                    <Ionicons name="calendar-outline" size={18} color={colors.primary} />
                    <Text style={[styles.actionText, { color: colors.primary }]}>Reschedule</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </>
        )}

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Past</Text>
            {pastAppointments.map((appointment) => (
              <View key={appointment.id} style={[styles.appointmentCard, styles.pastCard]}>
                <View style={styles.appointmentHeader}>
                  <View style={[styles.doctorAvatar, { backgroundColor: "#F5F5F5" }]}>
                    <Ionicons name="person" size={24} color={colors.textMuted} />
                  </View>
                  <View style={styles.appointmentInfo}>
                    <Text style={[styles.doctorName, { color: colors.textSecondary }]}>
                      {appointment.professionalName}
                    </Text>
                    <View style={styles.dateTimeRow}>
                      <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
                      <Text style={[styles.dateTimeText, { color: colors.textMuted }]}>
                        {formatDate(appointment.date)}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(appointment.status)}15` }]}>
                    <Ionicons
                      name={getStatusIcon(appointment.status) as any}
                      size={14}
                      color={getStatusColor(appointment.status)}
                    />
                    <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}

        {/* Empty State */}
        {appointments.length === 0 && !isLoading && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="calendar-outline" size={48} color={colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>No Appointments Yet</Text>
            <Text style={styles.emptySubtitle}>
              Book an appointment with a professional to get started
            </Text>
            <Pressable
              style={styles.emptyButton}
              onPress={() => router.push("/(tabs)/professionals" as any)}
            >
              <Ionicons name="search" size={18} color="#FFFFFF" />
              <Text style={styles.emptyButtonText}>Find Professionals</Text>
            </Pressable>
          </View>
        )}
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
  // Stats
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  // Section
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 12,
  },
  // Appointment Card
  appointmentCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  pastCard: {
    opacity: 0.8,
  },
  appointmentHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.primary}20`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  appointmentInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  dateTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateTimeText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginRight: 8,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  appointmentActions: {
    flexDirection: "row",
    marginTop: 14,
    gap: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    gap: 6,
  },
  rescheduleButton: {
    backgroundColor: `${colors.primary}15`,
  },
  actionText: {
    fontSize: 13,
    fontWeight: "500",
  },
  // Empty State
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
    maxWidth: 280,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  emptyButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
