import SafeImage from "@/components/custom/safe-image";
import { Tokens } from "@/theme/tokens";
import { FacilityDetail } from "@/types/facility";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ChevronLeftIcon, StarIcon } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FacilityDetailHeroProps {
  facility: FacilityDetail;
  tokens: Tokens;
}

export default function FacilityDetailHero({
  facility,
  tokens,
}: FacilityDetailHeroProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.heroWrap}>
      <SafeImage
        source={facility.imageUrl}
        style={styles.hero}
        iconSize={64}
        iconColor={tokens["muted-foreground"]}
        backgroundColor={tokens.muted}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.4)", "transparent", "rgba(0,0,0,0.85)"]}
        locations={[0, 0.4, 1]}
        style={StyleSheet.absoluteFill}
      />

      <Pressable
        style={[styles.backButton, { top: Math.max(insets.top, 12) }]}
        onPress={() => router.back()}
        hitSlop={12}
      >
        <ChevronLeftIcon size={22} color={tokens["primary-foreground"]} />
      </Pressable>

      <View style={styles.heroBody}>
        <View style={styles.sportChips}>
          {facility.sports.map((s) => (
            <View key={s} style={styles.sportChipBadge}>
              <Text style={styles.sportChipText}>{s.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.name}>{facility.name}</Text>

        <View style={styles.ratingRow}>
          <StarIcon size={14} color="#f59e0b" />
          <Text style={styles.ratingText}>{facility.rating.toFixed(1)}</Text>
          <Text style={styles.reviewCount}>
            ({facility.reviewCount} reviews)
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroWrap: {
    height: 320,
    justifyContent: "space-between",
  },
  hero: { ...StyleSheet.absoluteFill },
  backButton: {
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  heroBody: {
    padding: 16,
    gap: 6,
  },
  sportChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 2,
  },
  sportChipBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  sportChipText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#ffffff",
  },
  reviewCount: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
});
