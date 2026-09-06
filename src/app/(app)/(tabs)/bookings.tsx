import EmptyState from "@/components/custom/empty";
import ErrorState from "@/components/custom/error";
import LoadingState from "@/components/custom/loading";
import { BookingStatusParams } from "@/features/bookings/api";
import BookingCard from "@/features/bookings/components/booking-card";
import StatusFilter from "@/features/bookings/components/status-filter";
import { useInfiniteBookings } from "@/features/bookings/hooks";
import Header from "@/features/facilities/components/header";
import { useTheme } from "@/theme/ThemeProvider";
import { Booking } from "@/types/booking";
import { useCallback, useMemo, useState } from "react";
import { View, StyleSheet, FlatList, RefreshControl, Text } from "react-native";

export default function Bookings() {
  const { tokens } = useTheme();

  const [selectedStatus, setSelectedStatus] = useState<
    BookingStatusParams | undefined
  >(undefined);

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

  const bookings = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

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
      <BookingCard booking={item} tokens={tokens} />
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
});
