import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Pressable, Linking, Alert } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getServiceProviders } from '../../../api/services.api';
import {
    cardShadow,
    colors,
    radius,
    sectionSpacing,
    spacing,
    typography,
} from '../../../theme';

type FilterType = "all" | "centers" | "professionals";

const SerivceProviders = () => {
    const router = useRouter();
    const { serviceId } = useLocalSearchParams();
    const [filter, setFilter] = React.useState<FilterType>("all");

    const { data: providers, isLoading, error } = useQuery({
        queryKey: ["serviceProviders", serviceId],
        queryFn: () => getServiceProviders(serviceId as string),
        enabled: !!serviceId,
        retry: false,
    });

    const centers = providers?.centers || [];
    const professionals = providers?.professionals || [];

    // Filter data based on selected filter
    const filteredCenters = filter === "all" || filter === "centers" ? centers : [];
    const filteredProfessionals = filter === "all" || filter === "professionals" ? professionals : [];

    const handleCall = async (phone: string) => {
        if (!phone) return;

        // Clean phone number for display
        const displayPhone = phone;

        Alert.alert(
            "Call Center",
            `Phone: ${displayPhone}`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Call",
                    onPress: async () => {
                        try {
                            // Clean phone number - remove spaces, dashes, and parentheses
                            const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
                            const url = `tel:${cleanPhone}`;

                            const canOpen = await Linking.canOpenURL(url);
                            if (canOpen) {
                                await Linking.openURL(url);
                            } else {
                                Alert.alert("Error", "Cannot make phone calls on this device.");
                            }
                        } catch (error) {
                            console.error("Error opening phone URL:", error);
                            Alert.alert("Error", "Failed to open phone dialer.");
                        }
                    },
                },
            ]
        );
    };

    const handleEmail = async (email: string) => {
        if (!email) return;

        Alert.alert(
            "Email Center",
            `Email: ${email}`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Send Email",
                    onPress: async () => {
                        try {
                            const url = `mailto:${email}`;
                            const canOpen = await Linking.canOpenURL(url);
                            if (canOpen) {
                                await Linking.openURL(url);
                            } else {
                                Alert.alert("Error", "Cannot send emails on this device.");
                            }
                        } catch (error) {
                            console.error("Error opening email URL:", error);
                            Alert.alert("Error", "Failed to open email client.");
                        }
                    },
                },
            ]
        );
    };

    // Loading State
    if (isLoading) {
        return (
            <SafeAreaView style={styles.wrapper} edges={["top"]}>
                <View style={styles.header}>
                    <Pressable
                        style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
                        onPress={() => router.push({
                            pathname: "/(tabs)/services/service-details",
                            params: {
                                id: serviceId as string,
                            },
                        })}
                    >
                        <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </Pressable>
                    <Text style={styles.headerTitle}>Service Providers</Text>
                    <View style={styles.headerRight} />
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.loadingText}>Loading providers...</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Error State
    if (error) {
        return (
            <SafeAreaView style={styles.wrapper} edges={["top"]}>
                <View style={styles.header}>
                    <Pressable
                        style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
                        onPress={() => router.push({
                            pathname: "/(tabs)/services/service-details",
                            params: {
                                id: serviceId as string,
                            },
                        })}
                    >
                        <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </Pressable>
                    <Text style={styles.headerTitle}>Service Providers</Text>
                    <View style={styles.headerRight} />
                </View>
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
                    <Text style={styles.errorText}>Failed to load providers</Text>
                    <Text style={styles.errorSubtext}>Please try again later</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.wrapper} edges={["top"]}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable
                    style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
                    onPress={() => router.push({
                        pathname: "/(tabs)/services/service-details",
                        params: {
                            id: serviceId as string,
                        },
                    })}
                >
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </Pressable>
                <Text style={styles.headerTitle}>Service Providers</Text>
                <View style={styles.headerRight} />
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Centers Section */}
                {centers.length > 0 && (
                    <>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}> providers</Text>
                            <View style={styles.filterContainer}>
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.filterButton,
                                        filter === "all" && styles.filterButtonActive,
                                        pressed && { opacity: 0.7 },
                                    ]}
                                    onPress={() => setFilter("all")}
                                >
                                    <Text style={[
                                        styles.filterButtonText,
                                        filter === "all" && styles.filterButtonTextActive,
                                    ]}>
                                        All
                                    </Text>
                                </Pressable>
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.filterButton,
                                        filter === "centers" && styles.filterButtonActive,
                                        pressed && { opacity: 0.7 },
                                    ]}
                                    onPress={() => setFilter("centers")}
                                >
                                    <Text style={[
                                        styles.filterButtonText,
                                        filter === "centers" && styles.filterButtonTextActive,
                                    ]}>
                                        Centers
                                    </Text>
                                </Pressable>
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.filterButton,
                                        filter === "professionals" && styles.filterButtonActive,
                                        pressed && { opacity: 0.7 },
                                    ]}
                                    onPress={() => setFilter("professionals")}
                                >
                                    <Text style={[
                                        styles.filterButtonText,
                                        filter === "professionals" && styles.filterButtonTextActive,
                                    ]}>
                                        Professionals
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                        <Text style={styles.sectionTitle}>centers</Text>
                        {filteredCenters.map((center: any) => (
                            <TouchableOpacity
                                key={center._id || center.id}
                                style={[styles.centerCard, cardShadow]}
                                onPress={() =>
                                    router.push(`/(tabs)/directory/center-details?id=${center._id || center.id}`)
                                }
                                activeOpacity={0.85}
                            >
                                <View style={styles.cardHeader}>
                                    <View style={styles.cardIcon}>
                                        <Ionicons name="medical" size={24} color={colors.primary} />
                                    </View>
                                    <View style={styles.cardContent}>
                                        <Text style={styles.centerName}>{center.name}</Text>
                                        {center.type && (
                                            <View style={[styles.typeBadge, center.type === "public" ? styles.publicBadge : styles.privateBadge]}>
                                                <Text style={[styles.typeBadgeText, center.type === "public" ? styles.publicText : styles.privateText]}>
                                                    {center.type}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                                {center.address && (
                                    <View style={styles.infoRow}>
                                        <Ionicons name="location-outline" size={16} color={colors.textMuted} />
                                        <Text style={styles.infoText}>{center.address}</Text>
                                    </View>
                                )}
                                {(center.rating !== undefined || (center.reviews && center.reviews.length > 0)) && (
                                    <View style={styles.infoRow}>
                                        <Ionicons name="star" size={16} color={colors.warning} />
                                        <Text style={styles.infoText}>
                                            {center.rating?.toFixed(1) || "0.0"}
                                            {center.reviews && center.reviews.length > 0 && (
                                                <Text style={styles.reviewsCount}>
                                                    {" "}({center.reviews.length} {center.reviews.length === 1 ? "review" : "reviews"})
                                                </Text>
                                            )}
                                        </Text>
                                    </View>
                                )}
                                <View style={styles.actionsRow}>
                                    {center.phone && (
                                        <Pressable
                                            style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.7 }]}
                                            onPress={() => handleCall(center.phone)}
                                        >
                                            <Ionicons name="call-outline" size={18} color={colors.primary} />
                                            <Text style={styles.actionButtonText}>Call</Text>
                                        </Pressable>
                                    )}
                                    {center.email && (
                                        <Pressable
                                            style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.7 }]}
                                            onPress={() => handleEmail(center.email)}
                                        >
                                            <Ionicons name="mail-outline" size={18} color={colors.primary} />
                                            <Text style={styles.actionButtonText}>Email</Text>
                                        </Pressable>
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </>
                )}

                {/* Professionals Section */}
                {professionals.length > 0 && (
                    <>
                        <Text style={[styles.sectionTitle, filteredCenters.length > 0 && styles.sectionTitleWithMargin]}>
                            Professionals
                        </Text>
                        {filteredProfessionals.map((professional: any) => (
                            <TouchableOpacity
                                key={professional._id || professional.id}
                                style={[styles.professionalCard, cardShadow]}
                                onPress={() =>
                                    router.push(`/(tabs)/directory/professional-details?id=${professional._id || professional.id}`)
                                }
                                activeOpacity={0.85}
                            >
                                <View style={styles.cardHeader}>
                                    <View style={styles.cardIcon}>
                                        <Ionicons name="person" size={24} color={colors.primary} />
                                    </View>
                                    <View style={styles.cardContent}>
                                        <Text style={styles.professionalName}>{professional.name}</Text>
                                        {professional.specialtyLabel && (
                                            <Text style={styles.professionalSpecialty}>{professional.specialtyLabel}</Text>
                                        )}
                                    </View>
                                </View>
                                {professional.location && (
                                    <View style={styles.infoRow}>
                                        <Ionicons name="location-outline" size={16} color={colors.textMuted} />
                                        <Text style={styles.infoText}>{professional.location}</Text>
                                    </View>
                                )}
                                {professional.rating !== undefined && (
                                    <View style={styles.ratingRow}>
                                        <Ionicons name="star" size={16} color={colors.warning} />
                                        <Text style={styles.ratingText}>
                                            {professional.rating.toFixed(1)} ({professional.reviews || 0} reviews)
                                        </Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </>
                )}

                {/* Empty State */}
                {(filteredCenters.length === 0 && filteredProfessionals.length === 0) && (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="business-outline" size={64} color={colors.textMuted} />
                        <Text style={styles.emptyText}>
                            {filter === "all"
                                ? "No providers available"
                                : filter === "centers"
                                    ? "No health centers available"
                                    : "No professionals available"}
                        </Text>
                        <Text style={styles.emptySubtext}>
                            {filter === "all"
                                ? "There are no centers or professionals offering this service at the moment."
                                : filter === "centers"
                                    ? "There are no health centers offering this service at the moment."
                                    : "There are no professionals offering this service at the moment."}
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default SerivceProviders;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.background,
    },
    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: radius.md,
        backgroundColor: colors.backgroundCard,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: typography.h3,
        fontWeight: typography.weightSemibold,
        color: colors.text,
    },
    headerRight: {
        width: 40,
    },
    // Scroll
    scroll: {
        flex: 1,
    },
    container: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.lg,
        paddingBottom: 100,
    },
    // Section Header
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: spacing.lg,
        backgroundColor: colors.backgroundCard,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.sm,
        borderRadius: radius.md,
    },
    // Section Title
    sectionTitle: {
        fontSize: typography.h2,
        lineHeight: typography.h2LineHeight,
        fontWeight: typography.weightBold,
        color: colors.text,
        flex: 1,
    },
    sectionTitleWithMargin: {
        marginTop: sectionSpacing.default,
    },
    // Filter Container
    filterContainer: {
        flexDirection: "row",
        gap: spacing.xs,
        alignItems: "center",
    },
    filterButton: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: colors.backgroundSecondary,
        borderWidth: 1,
        borderColor: colors.border,
    },
    filterButtonActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    filterButtonText: {
        fontSize: typography.caption,
        fontWeight: typography.weightSemibold,
        color: colors.textSecondary,
    },
    filterButtonTextActive: {
        color: colors.backgroundCard,
    },
    // Center Card
    centerCard: {
        backgroundColor: colors.backgroundCard,
        borderRadius: radius.lg,
        padding: spacing.lg,
        marginBottom: spacing.md,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: spacing.md,
    },
    cardIcon: {
        width: 48,
        height: 48,
        borderRadius: radius.md,
        backgroundColor: `${colors.primary}15`,
        alignItems: "center",
        justifyContent: "center",
        marginRight: spacing.md,
    },
    cardContent: {
        flex: 1,
    },
    centerName: {
        fontSize: typography.h3,
        lineHeight: typography.h3LineHeight,
        fontWeight: typography.weightSemibold,
        color: colors.text,
        marginBottom: spacing.xs,
    },
    typeBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
    },
    publicBadge: {
        backgroundColor: `${colors.success}20`,
        borderWidth: 1,
        borderColor: `${colors.success}40`,
    },
    privateBadge: {
        backgroundColor: `${colors.warning}20`,
        borderWidth: 1,
        borderColor: `${colors.warning}40`,
    },
    typeBadgeText: {
        fontSize: typography.caption,
        fontWeight: typography.weightSemibold,
        textTransform: "capitalize",
    },
    publicText: {
        color: colors.success,
    },
    privateText: {
        color: colors.warning,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.sm,
        gap: spacing.xs,
    },
    infoText: {
        fontSize: typography.body,
        lineHeight: typography.bodyLineHeight,
        color: colors.textSecondary,
        flex: 1,
    },
    reviewsCount: {
        fontSize: typography.body,
        lineHeight: typography.bodyLineHeight,
        color: colors.textMuted,
    },
    actionsRow: {
        flexDirection: "row",
        gap: spacing.sm,
        marginTop: spacing.sm,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radius.md,
        backgroundColor: `${colors.primary}15`,
        borderWidth: 1,
        borderColor: `${colors.primary}30`,
    },
    actionButtonText: {
        fontSize: typography.caption,
        fontWeight: typography.weightSemibold,
        color: colors.primary,
    },
    // Professional Card
    professionalCard: {
        backgroundColor: colors.backgroundCard,
        borderRadius: radius.lg,
        padding: spacing.lg,
        marginBottom: spacing.md,
    },
    professionalName: {
        fontSize: typography.h3,
        lineHeight: typography.h3LineHeight,
        fontWeight: typography.weightSemibold,
        color: colors.text,
        marginBottom: spacing.xs,
    },
    professionalSpecialty: {
        fontSize: typography.body,
        lineHeight: typography.bodyLineHeight,
        color: colors.textMuted,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        marginTop: spacing.sm,
    },
    ratingText: {
        fontSize: typography.caption,
        color: colors.textSecondary,
    },
    // Loading & Error States
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
    },
    loadingText: {
        marginTop: spacing.md,
        fontSize: typography.body,
        color: colors.textSecondary,
    },
    errorContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.xl,
    },
    errorText: {
        fontSize: typography.h3,
        fontWeight: typography.weightSemibold,
        color: colors.text,
        marginTop: spacing.md,
        marginBottom: spacing.sm,
    },
    errorSubtext: {
        fontSize: typography.body,
        color: colors.textMuted,
        textAlign: "center",
    },
    // Empty State
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: typography.h3,
        fontWeight: typography.weightSemibold,
        color: colors.text,
        marginTop: spacing.lg,
        marginBottom: spacing.sm,
    },
    emptySubtext: {
        fontSize: typography.body,
        color: colors.textMuted,
        textAlign: "center",
        paddingHorizontal: spacing.xl,
    },
});
