import { Tokens } from "@/theme/tokens";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  tokens: Tokens;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search facilities...",
  tokens,
}: SearchBarProps) {
  return (
    <View
      style={[
        styles.searchContainer,
        {
          backgroundColor: tokens.card,
          borderBottomColor: tokens.border,
        },
      ]}
    >
      <TextInput
        style={[
          styles.searchInput,
          {
            backgroundColor: tokens.muted,
            color: tokens.foreground,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={tokens["muted-foreground"]}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  searchInput: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
