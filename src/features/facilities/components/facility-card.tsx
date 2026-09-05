import { priceFormat } from "@/libs/price-format";
import { Tokens } from "@/theme/tokens";
import { Facility } from "@/types/facility";
import { Link } from "expo-router";
import { SportShoeIcon } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FacilityCardProps {
  facility: Facility;
  tokens: Tokens;
}

export default function FacilityCard({ facility, tokens }: FacilityCardProps) {
  return (
    <Link
      href={{
        pathname: "/(app)/facilities/[id]",
        params: { id: facility.id },
      }}
      asChild
    >
      <TouchableOpacity
        style={StyleSheet.flatten([
          styles.card,
          {
            backgroundColor: tokens.card,
            shadowColor: tokens.foreground,
          },
        ])}
      >
        <View style={styles.cardContent}>
          <View
            style={[
              styles.cardImagePlaceholder,
              { backgroundColor: tokens.primary + "20" },
            ]}
          >
            <SportShoeIcon size={40} />
          </View>
          <View style={styles.cardInfo}>
            <Text style={[styles.cardName, { color: tokens.foreground }]}>
              {facility.name}
            </Text>
            <Text style={[styles.cardSport, { color: tokens.primary }]}>
              {facility.sports.join(", ").toUpperCase()}
            </Text>
            <Text
              style={[styles.cardCity, { color: tokens["muted-foreground"] }]}
            >
              {facility.location} - {facility.distanceKm.toFixed(1)} km
            </Text>
            <Text style={[styles.cardPrice, { color: tokens.foreground }]}>
              {priceFormat(facility.startingPrice)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    padding: 12,
  },
  cardImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardImageIcon: {
    fontSize: 40,
  },
  cardInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardSport: {
    fontSize: 14,
    marginVertical: 2,
  },
  cardCity: {
    fontSize: 12,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
});
