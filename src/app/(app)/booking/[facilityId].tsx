import BackButton from "@/components/custom/back-button";
import ErrorState from "@/components/custom/error";
import LoadingState from "@/components/custom/loading";
import { Button } from "@/components/ui/button";
import DateInput from "@/components/ui/date-input";
import AvailabilityView from "@/features/bookings/components/availability-view";
import { useAvailability } from "@/features/facilities/hooks";
import { formatDate } from "@/libs/format";
import { useTheme } from "@/theme/ThemeProvider";
import { AvailabilityCourt, AvailabilitySlot } from "@/types/availability";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

export default function FacilityBooking() {
  const { facilityId } = useLocalSearchParams<{ facilityId: string }>();

  const router = useRouter();
  const { tokens } = useTheme();

  const [bookingDate, setBookingDate] = useState<Date>(new Date());
  const [selectedBooking, setSelectedBooking] = useState<{
    court: AvailabilityCourt;
    slot: AvailabilitySlot;
  } | null>(null);

  const formattedBookingDate = formatDate(bookingDate);

  const {
    data: availability,
    isPending,
    error,
    refetch,
  } = useAvailability(facilityId, formattedBookingDate);

  const handleDateChange = (newDate: Date) => {
    setBookingDate(newDate);
    setSelectedBooking(null);
  };

  const handleSelectSlot = (
    court: AvailabilityCourt,
    slot: AvailabilitySlot,
  ) => {
    const isSameSlot =
      selectedBooking?.court.id === court.id &&
      selectedBooking?.slot.startTime === slot.startTime &&
      selectedBooking?.slot.endTime === slot.endTime;

    console.log("Same Slot Selected:", isSameSlot);

    if (isSameSlot) {
      setSelectedBooking(null);
      return;
    }

    setSelectedBooking({ court, slot });
  };

  const handleBookingSubmit = () => {
    if (!selectedBooking) return;

    const payload = {
      facilityId,
      courtId: selectedBooking.court.id,
      date: formattedBookingDate,
      startTime: selectedBooking.slot.startTime,
      endTime: selectedBooking.slot.endTime,
      price: selectedBooking.slot.price,
    };

    console.log("Submit Payload:", payload);
  };

  return (
    <View style={[styles.container, { backgroundColor: tokens.background }]}>
      <BackButton onPress={() => router.back()} />

      <Text style={[styles.title, { color: tokens.foreground }]}>
        Booking for Facility
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
      >
        <DateInput
          label="Booking Date"
          value={bookingDate}
          onChange={handleDateChange}
        />

        <View style={styles.contentSection}>
          {isPending && <LoadingState tokens={tokens} />}

          {error && !isPending && (
            <ErrorState
              tokens={tokens}
              error={error.message}
              onRetry={refetch}
            />
          )}

          {!isPending && !error && availability && (
            <AvailabilityView
              data={availability}
              onSelectSlot={handleSelectSlot}
            />
          )}
        </View>
      </ScrollView>

      {selectedBooking && (
        <View
          style={[
            styles.bottomBar,
            {
              backgroundColor: tokens.card,
              borderTopColor: tokens.border,
            },
          ]}
        >
          <View>
            <Text style={{ color: tokens["muted-foreground"], fontSize: 12 }}>
              {selectedBooking.court.name}
            </Text>
            <Text
              style={{
                color: tokens["card-foreground"],
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {selectedBooking.slot.startTime} - {selectedBooking.slot.endTime}
            </Text>
          </View>

          <Button onPress={handleBookingSubmit} variant="default" size="sm">
            Book Now
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 18,
    marginBottom: 24,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },
  inputText: {
    fontSize: 16,
  },
  contentSection: {
    marginTop: 16,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submitButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});
