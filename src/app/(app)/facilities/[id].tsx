import ErrorState from "@/components/custom/error";
import LoadingState from "@/components/custom/loading";
import { Button } from "@/components/ui/button";
import CourtRow from "@/features/facilities/components/court-row";
import FacilityDetailHero from "@/features/facilities/components/facility-detail-hero";
import { useFacility } from "@/features/facilities/hooks";
import { useTheme } from "@/theme/ThemeProvider";
import { Link, useLocalSearchParams } from "expo-router";
import { CheckCircleIcon } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FacilityDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { tokens } = useTheme();
  const { data: facility, isPending, error, refetch } = useFacility(id);

  if (isPending) return <LoadingState tokens={tokens} />;

  if (error || !facility)
    return (
      <ErrorState
        error={error?.message || "Facility not found"}
        onRetry={() => refetch()}
        tokens={tokens}
      />
    );

  return (
    <View style={[styles.container, { backgroundColor: tokens.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <FacilityDetailHero facility={facility} tokens={tokens} />

        <View style={styles.body}>
          <View style={styles.section}>
            <Text style={[styles.heading, { color: tokens.foreground }]}>
              Description
            </Text>
            <Text
              style={[
                styles.description,
                { color: tokens["muted-foreground"] },
              ]}
            >
              {facility.description}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: tokens.foreground }]}>
              Amenities
            </Text>
            <View style={styles.chips}>
              {facility.amenities.map((a) => (
                <View
                  key={a}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: tokens.secondary,
                      borderRadius: tokens.radius.full,
                      borderColor: tokens.border,
                    },
                  ]}
                >
                  <CheckCircleIcon
                    size={14}
                    color={tokens["secondary-foreground"]}
                  />
                  <Text
                    style={[
                      styles.chipText,
                      { color: tokens["secondary-foreground"] },
                    ]}
                  >
                    {a}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: tokens.foreground }]}>
              Courts
            </Text>
            <View style={styles.courtList}>
              {facility.courts.map((court) => (
                <CourtRow key={court.id} court={court} tokens={tokens} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.ctaBar,
          {
            backgroundColor: tokens.card,
            borderTopColor: tokens.border,
            paddingBottom: Math.max(insets.bottom, 16),
          },
        ]}
      >
        <Link
          href={{
            pathname: "/(app)/booking/[facilityId]",
            params: { facilityId: facility.id },
          }}
          asChild
        >
          <Button>Check Availability</Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  section: {
    marginTop: 20,
  },
  heading: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "500",
  },
  courtList: {
    gap: 10,
  },
  ctaBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  ctaButton: {
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    fontSize: 15,
    fontWeight: "700",
  },
});
