import { Tokens } from "@/theme/tokens";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLookupCity, useLookupSport } from "../hooks";

interface FiltersProps {
  selectedSport: string | null;
  setSelectedSport: (sport: string | null) => void;
  selectedCity: string | null;
  setSelectedCity: (city: string | null) => void;
  tokens: Tokens;
}

export default function Filters({
  selectedSport,
  setSelectedSport,
  selectedCity,
  setSelectedCity,
  tokens,
}: FiltersProps) {
  const {
    data: citiesData,
    isLoading: citiesLoading,
    error: citiesError,
  } = useLookupCity();
  const {
    data: sportsData,
    isLoading: sportsLoading,
    error: sportsError,
  } = useLookupSport();

  const cities = citiesData?.data ?? [];
  const sports = sportsData?.data?.map((sport) => sport.name) ?? [];

  const handleSelectSport = (sport: string | null) => {
    setSelectedSport(selectedSport === sport ? null : sport);
  };

  const handleSelectCity = (city: string | null) => {
    setSelectedCity(selectedCity === city ? null : city);
  };

  if (citiesLoading || sportsLoading) {
    return (
      <View
        style={[
          styles.filtersContainer,
          { backgroundColor: tokens.card, borderBottomColor: tokens.border },
        ]}
      >
        <Text style={{ color: tokens.foreground }}>Loading filters...</Text>
      </View>
    );
  }

  if (citiesError || sportsError) {
    return (
      <View
        style={[
          styles.filtersContainer,
          { backgroundColor: tokens.card, borderBottomColor: tokens.border },
        ]}
      >
        <Text style={{ color: tokens.destructive }}>Error loading filters</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.filtersContainer,
        {
          backgroundColor: tokens.card,
          borderBottomColor: tokens.border,
        },
      ]}
    >
      <View style={styles.filterGroup}>
        <Text style={[styles.filterLabel, { color: tokens.foreground }]}>
          Sport:
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sports.map((sport) => (
            <TouchableOpacity
              key={sport}
              style={[
                styles.filterChip,
                {
                  backgroundColor:
                    selectedSport === sport ? tokens.primary : tokens.muted,
                },
              ]}
              onPress={() => handleSelectSport(sport)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  {
                    color:
                      selectedSport === sport
                        ? tokens["primary-foreground"]
                        : tokens["muted-foreground"],
                  },
                ]}
              >
                {sport}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.filterGroup}>
        <Text style={[styles.filterLabel, { color: tokens.foreground }]}>
          City:
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cities.map((city) => (
            <TouchableOpacity
              key={city}
              style={[
                styles.filterChip,
                {
                  backgroundColor:
                    selectedCity === city ? tokens.primary : tokens.muted,
                },
              ]}
              onPress={() => handleSelectCity(city)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  {
                    color:
                      selectedCity === city
                        ? tokens["primary-foreground"]
                        : tokens["muted-foreground"],
                  },
                ]}
              >
                {city}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filtersContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  filterGroup: {
    marginVertical: 4,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginVertical: 2,
  },
  filterChipText: {
    fontSize: 14,
  },
});
