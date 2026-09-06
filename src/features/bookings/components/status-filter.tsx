import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { BookingStatusParams } from "../api";
import { Tokens } from "@/theme/tokens";

interface StatusFilterProps {
  selectedStatus?: BookingStatusParams;
  onSelectStatus: (status?: BookingStatusParams) => void;
  tokens: Tokens;
}

const FILTER_OPTIONS: { label: string; value?: BookingStatusParams }[] = [
  { label: "All", value: undefined },
  { label: "Upcoming", value: "UPCOMING" },
  { label: "Past", value: "PAST" },
  { label: "Cancelled", value: "CANCELLED" },
];

export default function StatusFilter({
  selectedStatus,
  onSelectStatus,
  tokens,
}: StatusFilterProps) {
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {FILTER_OPTIONS.map((option) => {
            const isActive = selectedStatus === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => onSelectStatus(option.value)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isActive ? tokens.primary : tokens.muted,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    {
                      color: isActive
                        ? tokens["primary-foreground"]
                        : tokens["muted-foreground"],
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
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
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginVertical: 2,
  },
  chipText: {
    fontSize: 13,
  },
});
