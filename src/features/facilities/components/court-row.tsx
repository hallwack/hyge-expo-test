import { priceFormat } from "@/libs/price-format";
import { Tokens } from "@/theme/tokens";
import { Court, FacilityType } from "@/types/facility";
import { StyleSheet, Text, View } from "react-native";

const TYPE_LABEL: Record<FacilityType, string> = {
  STANDARD: "Standard",
  PANORAMIC: "Panoramic",
  VIP: "VIP",
};

const TYPE_COLOR: Record<FacilityType, string> = {
  STANDARD: "#3b82f6",
  PANORAMIC: "#f59e0b",
  VIP: "#9333ea",
};

export default function CourtRow({
  court,
  tokens,
}: {
  court: Court;
  tokens: Tokens;
}) {
  return (
    <View
      style={[
        styles.courtCard,
        {
          backgroundColor: tokens.card,
          borderColor: tokens.border,
          borderRadius: tokens.radius.md,
        },
      ]}
    >
      <View style={styles.courtTop}>
        <Text
          style={[styles.courtName, { color: tokens["card-foreground"] }]}
          numberOfLines={1}
        >
          {court.name}
        </Text>

        <View style={styles.badgeGroup}>
          <View
            style={[
              styles.typeBadge,
              {
                backgroundColor: TYPE_COLOR[court.type],
                borderRadius: tokens.radius.sm,
              },
            ]}
          >
            <Text
              style={[
                styles.typeBadgeText,
                { color: tokens["primary-foreground"] },
              ]}
            >
              {TYPE_LABEL[court.type]}
            </Text>
          </View>

          <View
            style={[
              styles.typeBadge,
              {
                backgroundColor: court.indoor ? "#16a34a" : "#d97706",
                borderRadius: tokens.radius.sm,
              },
            ]}
          >
            <Text style={[styles.typeBadgeText, { color: "#ffffff" }]}>
              {court.indoor ? "Indoor" : "Outdoor"}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.courtBottom}>
        <Text
          style={[styles.courtSport, { color: tokens["muted-foreground"] }]}
          numberOfLines={1}
        >
          {court.sports}
        </Text>

        <Text style={[styles.courtPrice, { color: tokens.primary }]}>
          {priceFormat(court.basePrice)}
          <Text
            style={[styles.priceUnit, { color: tokens["muted-foreground"] }]}
          >
            /hour
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  courtCard: {
    padding: 14,
    borderWidth: 1,
    gap: 12,
  },
  courtTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  courtName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
  },
  badgeGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  courtBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  courtSport: {
    flex: 1,
    fontSize: 13,
  },
  courtPrice: {
    fontSize: 15,
    fontWeight: "700",
  },
  priceUnit: {
    fontSize: 12,
    fontWeight: "400",
  },
});
