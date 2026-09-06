import EmptyState from "@/components/custom/empty";
import ErrorState from "@/components/custom/error";
import LoadingState from "@/components/custom/loading";
import { Alert } from "@/components/ui/alert";
import { BookingStatusParams } from "@/features/bookings/api";
import BookingCard from "@/features/bookings/components/booking-card";
import { CancelBookingModal } from "@/features/bookings/components/modal-delete-booking";
import StatusFilter from "@/features/bookings/components/status-filter";
import {
  useCancelBooking,
  useInfiniteBookings,
} from "@/features/bookings/hooks";
import { useTheme } from "@/theme/ThemeProvider";
import { Booking } from "@/types/booking";
import { CheckCircle2Icon, InfoIcon } from "lucide-react-native";
import { useCallback, useMemo, useState } from "react";
import { View, StyleSheet, FlatList, RefreshControl, Text } from "react-native";

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

  const renderFooter = useCallback((): React.ReactElement | null => {
    if (!isFetchingNextPage) return null;
    return <LoadingState tokens={tokens} />;
  }, [isFetchingNextPage, tokens]);

  const renderBooking = useCallback(
    ({ item }: { item: Booking }): React.ReactElement => (
      <BookingCard
        booking={item}
        tokens={tokens}
        onCancel={(bookingId: string) => setSelectedBookingId(bookingId)}
      />
    ),
    [tokens],
  );

  const renderContent = useCallback((): React.ReactElement => {
    if (isError) {
      return (
        <ErrorState
          error={
            error?.message || "Failed to load bookings. Please try again later."
          }
          onRetry={() => refetch()}
          tokens={tokens}
        />
      );
    }

    if (bookings.length === 0 && !isLoading) {
      return <EmptyState onRefresh={refetch} tokens={tokens} />;
    }

    return (
      <FlatList
        data={bookings}
        renderItem={renderBooking}
        keyExtractor={(item: Booking): string => item.id}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching && !isFetchingNextPage}
            onRefresh={refetch}
            colors={[tokens.primary]}
            tintColor={tokens.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    );
  }, [
    bookings,
    isLoading,
    isError,
    error,
    isRefetching,
    isFetchingNextPage,
    tokens,
    refetch,
    handleLoadMore,
    renderBooking,
    renderFooter,
  ]);

  return (
    <View style={[styles.container, { backgroundColor: tokens.background }]}>
      {showCancelConfirmation && (
        <View style={styles.alertPadding}>
          <Alert
            variant="success"
            tone="soft"
            theme={theme}
            icon={<CheckCircle2Icon size={18} color="#10B981" />}
            title="Berhasil Dibatalakan"
            description="Booking Anda telah resmi dibatalkan."
          />
        </View>
      )}

      {cancelBookingMutation.isError && (
        <View style={styles.alertPadding}>
          <Alert
            variant="destructive"
            tone="soft"
            theme={theme}
            icon={<InfoIcon size={18} color="#EF4444" />}
            title="Gagal Membatalkan"
            description={
              cancelBookingMutation.error?.message || "Terjadi kesalahan."
            }
          />
        </View>
      )}
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

      {isLoading && bookings.length === 0 ? (
        <LoadingState tokens={tokens} />
      ) : (
        renderContent()
      )}

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
  listContent: {
    paddingVertical: 8,
    paddingBottom: 24,
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
  alertPadding: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});
