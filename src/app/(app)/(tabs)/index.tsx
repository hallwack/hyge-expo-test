import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import React, { useState, useCallback, useMemo } from "react";
import { useTheme } from "@/theme/ThemeProvider";
import Header from "@/features/facilities/components/header";
import SearchBar from "@/features/facilities/components/search-bar";
import FacilityCard from "@/features/facilities/components/facility-card";
import Filters from "@/features/facilities/components/filters";
import { useInfiniteFacilities } from "@/features/facilities/hooks";
import { Facility } from "@/types/facility";
import { useDebouncedValue } from "@/hooks/use-debounce-value";
import LoadingState from "@/components/custom/loading";
import ErrorState from "@/components/custom/error";
import EmptyState from "@/components/custom/empty";

export default function Index() {
  const { tokens } = useTheme();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 400);

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
  } = useInfiniteFacilities({
    sport: selectedSport ?? undefined,
    city: selectedCity ?? undefined,
    search: debouncedSearchQuery.trim() || undefined,
  });

  const facilities = useMemo(
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

  const renderFacility = useCallback(
    ({ item }: { item: Facility }): React.ReactElement => (
      <FacilityCard facility={item} tokens={tokens} />
    ),
    [tokens],
  );

  const renderContent = useCallback((): React.ReactElement => {
    if (isError) {
      return (
        <ErrorState
          error={
            error?.message || "Failed to load facilities. Please try again."
          }
          onRetry={() => refetch()}
          tokens={tokens}
        />
      );
    }

    if (facilities.length === 0 && !isLoading) {
      return <EmptyState onRefresh={refetch} tokens={tokens} />;
    }

    return (
      <FlatList
        data={facilities}
        renderItem={renderFacility}
        keyExtractor={(item: Facility): string => item.id.toString()}
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
    facilities,
    isLoading,
    isError,
    error,
    isRefetching,
    isFetchingNextPage,
    hasNextPage,
    tokens,
    refetch,
    fetchNextPage,
    renderFacility,
    renderFooter,
  ]);

  return (
    <View style={[styles.container, { backgroundColor: tokens.background }]}>
      <Header
        userName="John Doe"
        onProfilePress={() => console.log("Profile pressed")}
        tokens={tokens}
      />

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        tokens={tokens}
      />

      <Filters
        selectedSport={selectedSport}
        setSelectedSport={setSelectedSport}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        tokens={tokens}
      />

      {isLoading && facilities.length === 0 ? (
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
    paddingBottom: 20,
  },
});
