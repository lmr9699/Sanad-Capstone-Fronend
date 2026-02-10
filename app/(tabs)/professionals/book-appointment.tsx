import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
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
};

const APPOINTMENTS_KEY = "@sanad_appointments";

// Generate dates for next 14 days
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  return dates;
};

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function BookAppointmentScreen() {
  const router = useRouter();
  const { professionalId, professionalName } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const dates = generateDates();

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert("Missing Information", "Please select both date and time.");
      return;
    }

    setIsBooking(true);

    try {
      // Get existing appointments
      const existingData = await AsyncStorage.getItem(APPOINTMENTS_KEY);
      const appointments = existingData ? JSON.parse(existingData) : [];

      // Create new appointment
      const newAppointment = {
        id: Date.now().toString(),
        professionalId,
        professionalName: professionalName || "Dr. Unknown",
        date: selectedDate.toISOString(),
        time: selectedTime,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };

      appointments.push(newAppointment);
      await AsyncStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));

      Alert.alert(
        "Booking Confirmed!",
        `Your appointment with ${professionalName} has been scheduled for ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()} at ${selectedTime}.`,
        [
          {
            text: "View My Appointments",
            onPress: () => router.replace("/(tabs)/profile/appointments" as any),
          },
          {
            text: "Done",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to book appointment. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 5 || day === 6; // Friday and Saturday (Kuwait weekend)
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Professional Info */}
        <View style={styles.professionalCard}>
          <View style={styles.professionalAvatar}>
            <Ionicons name="person" size={28} color={colors.primary} />
          </View>
          <View style={styles.professionalInfo}>
            <Text style={styles.professionalName}>{professionalName}</Text>
            <Text style={styles.professionalSubtitle}>Select your preferred date and time</Text>
          </View>
        </View>

        {/* Date Selection */}
        <Text style={styles.sectionTitle}>Select Date</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroll}
          contentContainerStyle={styles.dateScrollContent}
        >
          {dates.map((date, index) => {
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            const isDisabled = isWeekend(date);
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.dateCard,
                  isSelected && styles.dateCardSelected,
                  isDisabled && styles.dateCardDisabled,
                  pressed && !isDisabled && { opacity: 0.8 },
                ]}
                onPress={() => !isDisabled && setSelectedDate(date)}
                disabled={isDisabled}
              >
                <Text
                  style={[
                    styles.dateDay,
                    isSelected && styles.dateDaySelected,
                    isDisabled && styles.dateTextDisabled,
                  ]}
                >
                  {DAYS[date.getDay()]}
                </Text>
                <Text
                  style={[
                    styles.dateNumber,
                    isSelected && styles.dateNumberSelected,
                    isDisabled && styles.dateTextDisabled,
                  ]}
                >
                  {date.getDate()}
                </Text>
                <Text
                  style={[
                    styles.dateMonth,
                    isSelected && styles.dateMonthSelected,
                    isDisabled && styles.dateTextDisabled,
                  ]}
                >
                  {MONTHS[date.getMonth()]}
                </Text>
                {isToday && !isDisabled && (
                  <View style={styles.todayBadge}>
                    <Text style={styles.todayText}>Today</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Time Selection */}
        <Text style={styles.sectionTitle}>Select Time</Text>
        <View style={styles.timeGrid}>
          {TIME_SLOTS.map((time, index) => {
            const isSelected = selectedTime === time;
            // Randomly disable some slots to simulate unavailability
            const isDisabled = !selectedDate || [2, 5, 8].includes(index);

            return (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.timeSlot,
                  isSelected && styles.timeSlotSelected,
                  isDisabled && styles.timeSlotDisabled,
                  pressed && !isDisabled && { opacity: 0.8 },
                ]}
                onPress={() => !isDisabled && setSelectedTime(time)}
                disabled={isDisabled}
              >
                <Text
                  style={[
                    styles.timeText,
                    isSelected && styles.timeTextSelected,
                    isDisabled && styles.timeTextDisabled,
                  ]}
                >
                  {time}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={20} color={colors.secondary} />
          <Text style={styles.infoText}>
            Appointments are 30-45 minutes. You'll receive a confirmation SMS.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Selected:</Text>
          <Text style={styles.summaryValue}>
            {selectedDate && selectedTime
              ? `${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedTime}`
              : "Please select date & time"}
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.bookButton,
            (!selectedDate || !selectedTime) && styles.bookButtonDisabled,
            pressed && { opacity: 0.9 },
          ]}
          onPress={handleBooking}
          disabled={!selectedDate || !selectedTime || isBooking}
        >
          {isBooking ? (
            <Text style={styles.bookButtonText}>Booking...</Text>
          ) : (
            <>
              <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
              <Text style={styles.bookButtonText}>Confirm Booking</Text>
            </>
          )}
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
    paddingBottom: 20,
  },
  // Professional Card
  professionalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  professionalAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${colors.primary}20`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  professionalInfo: {
    flex: 1,
  },
  professionalName: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  professionalSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  // Section Title
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 14,
    marginTop: 8,
  },
  // Date Selection
  dateScroll: {
    marginBottom: 24,
    marginHorizontal: -20,
  },
  dateScrollContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  dateCard: {
    width: 70,
    paddingVertical: 12,
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  dateCardSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dateCardDisabled: {
    backgroundColor: "#F5F5F5",
    opacity: 0.6,
  },
  dateDay: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "500",
    marginBottom: 4,
  },
  dateDaySelected: {
    color: "#FFFFFF",
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 2,
  },
  dateNumberSelected: {
    color: "#FFFFFF",
  },
  dateMonth: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: "500",
  },
  dateMonthSelected: {
    color: "rgba(255,255,255,0.8)",
  },
  dateTextDisabled: {
    color: colors.textMuted,
  },
  todayBadge: {
    marginTop: 6,
    backgroundColor: colors.secondary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  todayText: {
    fontSize: 9,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  // Time Selection
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  timeSlot: {
    width: "31%",
    paddingVertical: 14,
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  timeSlotSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeSlotDisabled: {
    backgroundColor: "#F5F5F5",
    opacity: 0.5,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  timeTextSelected: {
    color: "#FFFFFF",
  },
  timeTextDisabled: {
    color: colors.textMuted,
  },
  // Info Card
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${colors.secondary}15`,
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  // Bottom
  bottomContainer: {
    padding: 20,
    backgroundColor: colors.bgCard,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  bookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    gap: 8,
  },
  bookButtonDisabled: {
    backgroundColor: colors.textMuted,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
