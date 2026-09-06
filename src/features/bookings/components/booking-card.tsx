import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { priceFormat } from "@/libs/format";
import { Tokens } from "@/theme/tokens";
import { Booking, BookingStatus } from "@/types/booking";
import SafeImage from "@/components/custom/safe-image";
import { Button } from "@/components/ui/button";

interface BookingCardProps {
  booking: Booking;
  tokens: Tokens;
  onCancel?: (bookingId: string) => void;
}

export default function BookingCard({
  booking,
  tokens,
  onCancel,
}: BookingCardProps) {
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
          bg: tokens.muted ?? "#f3f4f6",
          text: tokens["muted-foreground"] ?? "#6b7280",
        };
    }
  };

  const statusStyle = getStatusBadge(booking.status);
  const isCancelled = booking.status === "CANCELLED";

  return (
    <Link
      href={{
        pathname: "/(app)/booking/status",
        params: { bookingId: booking.id, from: "list" },
      }}
      asChild
    >
      <TouchableOpacity
        style={StyleSheet.flatten([
          styles.card,
          {
            backgroundColor: tokens.card,
            shadowColor: tokens.foreground,
          },
        ])}
      >
        <View style={styles.cardHeader}>
          <Text style={[styles.refCode, { color: tokens.primary }]}>
            {booking.bookingReference}
          </Text>
          <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.badgeText, { color: statusStyle.text }]}>
              {statusStyle.label}
            </Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <SafeImage
            source={booking.facility.imageUrl}
            style={styles.cardImage}
            iconSize={32}
            iconColor={tokens["muted-foreground"]}
            backgroundColor={tokens.muted}
          />

          <View style={styles.cardInfo}>
            <Text
              numberOfLines={1}
              style={[styles.cardName, { color: tokens.foreground }]}
            >
              {booking.facility.name}
            </Text>
            <Text
              style={[styles.cardCourt, { color: tokens["muted-foreground"] }]}
            >
              {booking.court.name}
            </Text>
            <Text
              style={[styles.cardDate, { color: tokens["muted-foreground"] }]}
            >
              {booking.date} • {booking.startTime} - {booking.endTime}
            </Text>
          </View>
        </View>

        <View style={[styles.cardFooter, { borderTopColor: tokens.border }]}>
          <View>
            <Text
              style={[styles.priceLabel, { color: tokens["muted-foreground"] }]}
            >
              Total
            </Text>
            <Text style={[styles.cardPrice, { color: tokens.foreground }]}>
              {priceFormat(booking.totalPrice)}
            </Text>
          </View>

          {!isCancelled && (
            <Button
              size="sm"
              variant="destructive"
              onPress={(e) => {
                e.stopPropagation();
                onCancel?.(booking.id);
              }}
            >
              Cancel Book
            </Button>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  refCode: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 72,
    height: 72,
    borderRadius: 8,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
    justifyContent: "center",
  },
  cardName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  cardCourt: {
    fontSize: 13,
    marginTop: 2,
  },
  cardDate: {
    fontSize: 12,
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
  },
  priceLabel: {
    fontSize: 11,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: "700",
  },
});
