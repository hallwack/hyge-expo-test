import { useState } from "react";
import { View, StyleSheet, StyleProp } from "react-native";
import { Image, ImageStyle } from "expo-image";
import { SportShoeIcon } from "lucide-react-native";

interface SafeImageProps {
  source?: string | null;
  style?: StyleProp<ImageStyle>;

  iconSize?: number;
  iconColor?: string;
  backgroundColor?: string;
  contentFit?: "cover" | "contain" | "fill";
}

export default function SafeImage({
  source,
  style,
  iconSize = 36,
  iconColor = "#9ca3af",
  backgroundColor = "#e5e7eb",
  contentFit = "cover",
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!source || hasError) {
    return (
      <View style={[style, styles.fallbackContainer, { backgroundColor }]}>
        <SportShoeIcon size={iconSize} color={iconColor} />
      </View>
    );
  }

  return (
    <Image
      source={{ uri: source }}
      style={style}
      contentFit={contentFit}
      onError={() => setHasError(true)}
    />
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
