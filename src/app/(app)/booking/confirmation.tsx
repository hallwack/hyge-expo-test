import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";
import { useBookingStore } from "@/stores/booking-store";
import { useCreateBooking } from "@/features/bookings/hooks";
import { Booking } from "@/types/booking";
import { priceFormat } from "@/libs/format";
import BackButton from "@/components/custom/back-button";
import { Button } from "@/components/ui/button";

export default function BookingConfirmation() {
  const router = useRouter();
  const { tokens } = useTheme();

  const bookingDraft = useBookingStore((state) => state.bookingDraft);
  const clearBookingDraft = useBookingStore((state) => state.clearBookingDraft);

  const { mutate: createBooking, isPending } = useCreateBooking();

  if (!bookingDraft) {
    return (
      <View style={[styles.container, { backgroundColor: tokens.background }]}>
        <Text style={{ color: tokens.foreground }}>
          Data booking tidak ditemukan.
        </Text>
      </View>
    );
  }

  const { payload, facility, court, price } = bookingDraft;

  const handleConfirmPayment = () => {
    createBooking(payload, {
      onSuccess: (bookingResult: Booking) => {
        clearBookingDraft();
        router.replace({
          pathname: "/booking/status",
          params: { bookingId: bookingResult.id },
        });
      },
      onError: (error) => {
        console.error("Gagal membuat booking:", error);
      },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: tokens.background }]}>
      <BackButton onPress={() => router.back()} />
      <Text style={[styles.title, { color: tokens.foreground }]}>
        Booking Confirmation
      </Text>

      <View
        style={[
          styles.card,
          { backgroundColor: tokens.card, borderColor: tokens.border },
        ]}
      >
        <Image
          source={{ uri: facility.imageUrl }}
          style={[styles.image, { borderRadius: tokens.radius.md }]}
        />
        <View style={{ gap: 4 }}>
          <Text
            style={[styles.facilityName, { color: tokens["card-foreground"] }]}
          >
            {facility.name}
          </Text>
          <Text style={{ color: tokens["muted-foreground"] }}>
            {court.name}
          </Text>
          <Text style={{ color: tokens["card-foreground"], marginTop: 4 }}>
            Date: {payload.date}
          </Text>
          <Text style={{ color: tokens["card-foreground"], marginTop: 4 }}>
            Time: {payload.startTime} - {payload.endTime}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: tokens.card,
            borderColor: tokens.border,
            marginTop: 16,
          },
        ]}
      >
        <Text
          style={[styles.sectionTitle, { color: tokens["card-foreground"] }]}
        >
          Payment Summary
        </Text>
        <View style={styles.row}>
          <Text style={{ color: tokens["muted-foreground"] }}>
            Court Booking Fee
          </Text>
          <Text style={{ color: tokens["card-foreground"] }}>
            {priceFormat(price)}
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
            style={{ color: tokens.primary, fontWeight: "bold", fontSize: 16 }}
          >
            {priceFormat(price)}
          </Text>
        </View>
      </View>

      <Button
        style={{ marginHorizontal: 20 }}
        disabled={isPending}
        onPress={handleConfirmPayment}
      >
        {isPending ? (
          <ActivityIndicator color={tokens["primary-foreground"]} />
        ) : (
          <Text
            style={{
              color: tokens["primary-foreground"],
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Confirm Payment
          </Text>
        )}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 24,
  },
  card: {
    margin: 20,
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    gap: 12,
  },
  image: {
    width: "100%",
    height: 140,
    objectFit: "cover",
  },
  facilityName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalRow: {
    paddingTop: 12,
    borderTopWidth: 1,
    marginTop: 4,
  },
  button: {
    marginTop: 24,
    padding: 16,
    alignItems: "center",
  },
});
