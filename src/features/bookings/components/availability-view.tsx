import { priceFormat } from "@/libs/format";
import { useTheme } from "@/theme/ThemeProvider";
import {
  Availability,
  AvailabilityCourt,
  AvailabilitySlot,
} from "@/types/availability";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface CourtSlotsProps {
  data: Availability;
  onSelectSlot?: (court: AvailabilityCourt, slot: AvailabilitySlot) => void;
}

export default function AvailabilityView({
  data,
  onSelectSlot,
}: CourtSlotsProps) {
  const { tokens } = useTheme();
  const [selectedSlot, setSelectedSlot] = useState<{
    courtId: string;
    startTime: string;
    endTime: string;
  } | null>(null);

  const handleSelect = (court: AvailabilityCourt, slot: AvailabilitySlot) => {
    if (!slot.available) return;

    const isSameSlot =
      selectedSlot?.courtId === court.id &&
      selectedSlot?.startTime === slot.startTime &&
      selectedSlot?.endTime === slot.endTime;

    if (isSameSlot) {
      setSelectedSlot(null);
      if (onSelectSlot) onSelectSlot(court, slot);
      return;
    }

    setSelectedSlot({
      courtId: court.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
    });

    if (onSelectSlot) onSelectSlot(court, slot);
  };

  return (
    <View style={styles.container}>
      {data.courts.map((court) => (
        <View
          key={court.id}
          style={[
            styles.courtCard,
            {
              backgroundColor: tokens.card,
              borderColor: tokens.border,
              borderRadius: tokens.radius.lg,
            },
          ]}
        >
          <View style={styles.courtHeader}>
            <Text
              style={[styles.courtName, { color: tokens["card-foreground"] }]}
            >
              {court.name}
            </Text>
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

          <View style={styles.slotsGrid}>
            {court.slots?.map((slot) => {
              const slotKey = `${court.id}-${slot.startTime}-${slot.endTime}`;

              const isSelected =
                selectedSlot?.courtId === court.id &&
                selectedSlot?.startTime === slot.startTime &&
                selectedSlot?.endTime === slot.endTime;

              const isAvailable = slot.available;

              let bgColor = tokens.background;
              let textColor = tokens.foreground;
              let borderColor = tokens.border;

              if (!isAvailable) {
                bgColor = tokens.muted;
                textColor = tokens["muted-foreground"];
              } else if (isSelected) {
                bgColor = tokens.primary;
                textColor = tokens["primary-foreground"];
                borderColor = tokens.primary;
              }

              return (
                <TouchableOpacity
                  key={slotKey}
                  disabled={!isAvailable}
                  onPress={() => handleSelect(court, slot)}
                  style={[
                    styles.slotButton,
                    {
                      backgroundColor: bgColor,
                      borderColor: borderColor,
                      borderRadius: tokens.radius.md,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.slotText,
                      { color: textColor },
                      !isAvailable && styles.disabledText,
                    ]}
                  >
                    {slot.startTime} - {slot.endTime}
                  </Text>

                  {slot.price > 0 && (
                    <Text
                      style={[
                        styles.priceText,
                        {
                          color: isSelected
                            ? tokens["primary-foreground"]
                            : tokens["muted-foreground"],
                        },
                      ]}
                    >
                      {priceFormat(slot.price)}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginTop: 12,
  },
  courtCard: {
    padding: 16,
    borderWidth: 1,
  },
  courtHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  courtName: {
    fontSize: 16,
    fontWeight: "600",
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
  slotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  slotButton: {
    width: "31%",
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: "center",
    borderWidth: 1,
  },
  slotText: {
    fontSize: 11,
    fontWeight: "600",
  },
  disabledText: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  priceText: {
    fontSize: 10,
    marginTop: 2,
  },
});
