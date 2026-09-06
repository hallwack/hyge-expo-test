import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
} from "react-native";
import DateTimePicker, {
  DateTimePickerChangeEvent,
} from "@react-native-community/datetimepicker";
import { useTheme } from "@/theme/ThemeProvider";

interface DateInputProps {
  value: Date;
  onChange: (date: Date) => void;
  label?: string;
  mode?: "date" | "time";
}

export default function DateInput({
  value,
  onChange,
  label = "Choose Date",
  mode = "date",
}: DateInputProps) {
  const { tokens } = useTheme();
  const [show, setShow] = useState<boolean>(false);

  const handleDateChange = (
    _: DateTimePickerChangeEvent,
    selectedDate?: Date,
  ) => {
    if (Platform.OS === "android") setShow(false);
    if (selectedDate) onChange(selectedDate);
  };

  return (
    <View>
      {label && (
        <Text style={[styles.label, { color: tokens["muted-foreground"] }]}>
          {label}
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.inputBox,
          {
            backgroundColor: tokens.card,
            borderColor: tokens.border,
            borderRadius: tokens.radius.md,
          },
        ]}
        onPress={() => setShow(true)}
      >
        <Text style={[styles.inputText, { color: tokens["card-foreground"] }]}>
          {value.toLocaleDateString("id-ID")}
        </Text>
      </TouchableOpacity>

      {Platform.OS === "android" && show && (
        <DateTimePicker
          value={value}
          mode={mode}
          display="default"
          onValueChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {Platform.OS === "ios" && (
        <Modal visible={show} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContent,
                {
                  backgroundColor: tokens.popover,
                  borderTopLeftRadius: tokens.radius.xl,
                  borderTopRightRadius: tokens.radius.xl,
                },
              ]}
            >
              <View
                style={[
                  styles.headerModal,
                  { borderBottomColor: tokens.border },
                ]}
              >
                <TouchableOpacity onPress={() => setShow(false)}>
                  <Text style={[styles.doneText, { color: tokens.primary }]}>
                    Selesai
                  </Text>
                </TouchableOpacity>
              </View>

              <DateTimePicker
                value={value}
                mode={mode}
                display="spinner"
                onValueChange={handleDateChange}
                textColor={tokens["popover-foreground"]}
                minimumDate={new Date()}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "500",
  },
  inputBox: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    paddingBottom: 24,
  },
  headerModal: {
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  doneText: {
    fontWeight: "600",
    fontSize: 16,
  },
});
