import EmptyState from "@/components/custom/empty";
import ErrorState from "@/components/custom/error";
import LoadingState from "@/components/custom/loading";
import { Tokens } from "@/theme/tokens";
import { Booking } from "@/types/booking";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import BookingCard from "./booking-card";

interface BookingListProps {
  bookings: Booking[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isRefetching: boolean;
  isFetchingNextPage: boolean;
  tokens: Tokens;
  onRefresh: () => void;
  onLoadMore: () => void;
  onCancelBooking: (bookingId: string) => void;
}

export default function BookingList({
  bookings,
  isLoading,
  isError,
  error,
  isRefetching,
  isFetchingNextPage,
  tokens,
  onRefresh,
  onLoadMore,
  onCancelBooking,
}: BookingListProps) {
  if (isLoading && bookings.length === 0) {
    return <LoadingState tokens={tokens} />;
  }

  if (isError) {
    return (
      <ErrorState
        error={
          error?.message || "Failed to load bookings. Please try again later."
        }
        onRetry={onRefresh}
        tokens={tokens}
      />
    );
  }

  if (bookings.length === 0) {
    return <EmptyState onRefresh={onRefresh} tokens={tokens} />;
  }

  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <BookingCard
          booking={item}
          tokens={tokens}
          onCancel={onCancelBooking}
        />
      )}
      contentContainerStyle={styles.listContent}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? <LoadingState tokens={tokens} /> : null
      }
      refreshControl={
        <RefreshControl
          refreshing={isRefetching && !isFetchingNextPage}
          onRefresh={onRefresh}
          colors={[tokens.primary]}
          tintColor={tokens.primary}
        />
      }
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 8,
    paddingBottom: 24,
  },
});

