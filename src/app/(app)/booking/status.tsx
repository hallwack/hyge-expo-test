import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";
import { BookingStatus } from "@/types/booking";
import { useBookingDetail } from "@/features/bookings/hooks";
import LoadingState from "@/components/custom/loading";
import ErrorState from "@/components/custom/error";
import { CheckIcon } from "lucide-react-native";
import { priceFormat } from "@/libs/format";
import { Button } from "@/components/ui/button";
import SafeImage from "@/components/custom/safe-image";

export default function BookingStatusPage() {
  const router = useRouter();
  const { tokens } = useTheme();
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();

  const {
    data: bookingData,
    isPending,
    error,
    refetch,
  } = useBookingDetail(bookingId);

  if (isPending) {
    return <LoadingState tokens={tokens} />;
  }

  if (error || !bookingData) {
    return (
      <ErrorState
        error={error?.message || "Failed to load Booking. Please try again."}
        onRetry={() => refetch()}
        tokens={tokens}
      />
    );
  }

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "CONFIRMED":
        return { label: "Confirmed", bg: "#DCFCE7", text: "#15803D" };
      case "COMPLETED":
        return { label: "Completed", bg: "#E0F2FE", text: "#0369A1" };
      case "CANCELLED":
        return { label: "Cancelled", bg: "#FEE2E2", text: "#B91C1C" };
      default:
        return {
          label: status,
          bg: tokens.muted,
          text: tokens["muted-foreground"],
        };
    }
  };

  const statusBadge = getStatusBadge(bookingData.status);

  return (
    <View style={[styles.container, { backgroundColor: tokens.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View
            style={[styles.iconCircle, { backgroundColor: tokens.primary }]}
          >
            <CheckIcon size={32} color={tokens["primary-foreground"]} />
          </View>
          <Text style={[styles.title, { color: tokens.foreground }]}>
            Booking Successful!
          </Text>
          <Text
            style={[styles.subtitle, { color: tokens["muted-foreground"] }]}
          >
            Show this receipt to the facility staff when you arrive. Your
            booking details are below.
          </Text>
        </View>

        <View
          style={[
            styles.ticketCard,
            { backgroundColor: tokens.card, borderColor: tokens.border },
          ]}
        >
          <View style={styles.refContainer}>
            <Text style={{ color: tokens["muted-foreground"], fontSize: 12 }}>
              Reference Code
            </Text>
            <Text style={[styles.refCode, { color: tokens.primary }]}>
              {bookingData.bookingReference}
            </Text>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: statusBadge.bg,
                  borderRadius: tokens.radius.sm,
                },
              ]}
            >
              <Text style={[styles.badgeText, { color: statusBadge.text }]}>
                {statusBadge.label}
              </Text>
            </View>
          </View>

          <View style={[styles.dashedLine, { borderColor: tokens.border }]} />

          <View style={styles.facilitySection}>
            <SafeImage
              source={bookingData.facility.imageUrl}
              style={[styles.image, { borderRadius: tokens.radius.md }]}
              iconSize={32}
              iconColor={tokens["muted-foreground"]}
              backgroundColor={tokens.muted}
            />

            <View style={{ flex: 1, gap: 4 }}>
              <Text
                style={[
                  styles.facilityName,
                  { color: tokens["card-foreground"] },
                ]}
              >
                {bookingData.facility.name}
              </Text>
              <Text style={{ color: tokens["muted-foreground"], fontSize: 13 }}>
                {bookingData.court.name}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.infoGrid,
              {
                backgroundColor: tokens.background,
                borderRadius: tokens.radius.md,
              },
            ]}
          >
            <View style={styles.infoItem}>
              <Text
                style={[
                  styles.infoLabel,
                  { color: tokens["muted-foreground"] },
                ]}
              >
                Date
              </Text>
              <Text style={[styles.infoValue, { color: tokens.foreground }]}>
                {bookingData.date}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text
                style={[
                  styles.infoLabel,
                  { color: tokens["muted-foreground"] },
                ]}
              >
                Time
              </Text>
              <Text style={[styles.infoValue, { color: tokens.foreground }]}>
                {bookingData.startTime} - {bookingData.endTime}
              </Text>
            </View>
          </View>

          <View style={styles.paymentSection}>
            <View style={styles.row}>
              <Text style={{ color: tokens["muted-foreground"] }}>
                Court Booking Fee
              </Text>
              <Text style={{ color: tokens["card-foreground"] }}>
                {priceFormat(bookingData.price)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={{ color: tokens["muted-foreground"] }}>
                Service Fee
              </Text>
              <Text style={{ color: tokens["card-foreground"] }}>
                {priceFormat(bookingData.serviceFee)}
              </Text>
            </View>
            <View
              style={[
                styles.row,
                styles.totalRow,
                { borderTopColor: tokens.border },
              ]}
            >
              <Text style={{ color: tokens.foreground, fontWeight: "bold" }}>
                Total
              </Text>
              <Text
                style={{
                  color: tokens.primary,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {priceFormat(bookingData.totalPrice)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          { backgroundColor: tokens.card, borderTopColor: tokens.border },
        ]}
      >
        <Button onPress={() => router.replace("/")}>Back to Home</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  ticketCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  refContainer: {
    alignItems: "center",
    gap: 6,
  },
  refCode: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 2,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    marginVertical: 4,
  },
  facilitySection: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
  },
  facilityName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  infoGrid: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    gap: 2,
  },
  infoLabel: {
    fontSize: 11,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "600",
  },
  paymentSection: {
    gap: 8,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalRow: {
    paddingTop: 10,
    borderTopWidth: 1,
    marginTop: 4,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingHorizontal: 24,
    borderTopWidth: 1,
  },
  primaryButton: {
    padding: 16,
    alignItems: "center",
  },
});
