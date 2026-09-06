import { BookingStatusParams } from "@/features/bookings/api";
import BookingAlert from "@/features/bookings/components/booking-alert";
import { CancelBookingModal } from "@/features/bookings/components/booking-cancel-modal";
import BookingList from "@/features/bookings/components/booking-list";
import StatusFilter from "@/features/bookings/components/status-filter";
import {
  useCancelBooking,
  useInfiniteBookings,
} from "@/features/bookings/hooks";
import { useTheme } from "@/theme/ThemeProvider";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Bookings() {
  const { tokens, theme } = useTheme();

  const [selectedStatus, setSelectedStatus] = useState<
    BookingStatusParams | undefined
  >(undefined);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null,
  );
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteBookings({
    status: selectedStatus,
  });

  const cancelBookingMutation = useCancelBooking();

  const bookings = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const handleCancelBooking = () => {
    if (!selectedBookingId) return;

    cancelBookingMutation.mutate(selectedBookingId, {
      onSuccess: () => {
        setSelectedBookingId(null);
        setShowCancelConfirmation(true);

        setTimeout(() => setShowCancelConfirmation(false), 3000);
      },
    });
  };

  const handleLoadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <View style={[styles.container, { backgroundColor: tokens.background }]}>
      <BookingAlert
        showSuccess={showCancelConfirmation}
        errorMessage={cancelBookingMutation.error?.message}
        theme={theme}
        onClearError={() => cancelBookingMutation.reset()}
      />

      <View
        style={[
          styles.header,
          {
            backgroundColor: tokens.card,
            borderBottomColor: tokens.border,
          },
        ]}
      >
        <View style={styles.headerLeft}>
          <Text style={[styles.appName, { color: tokens.primary }]}>
            Booking
          </Text>
        </View>
      </View>

      <StatusFilter
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
        tokens={tokens}
      />

      <BookingList
        bookings={bookings}
        isLoading={isLoading}
        isError={isError}
        error={error}
        isRefetching={isRefetching}
        isFetchingNextPage={isFetchingNextPage}
        tokens={tokens}
        onRefresh={refetch}
        onLoadMore={handleLoadMore}
        onCancelBooking={(id) => setSelectedBookingId(id)}
      />

      <CancelBookingModal
        visible={!!selectedBookingId}
        isLoading={cancelBookingMutation.isPending}
        onClose={() => setSelectedBookingId(null)}
        onConfirm={handleCancelBooking}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flex: 1,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
