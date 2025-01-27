import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import Chevron from "@/components/shared/Icons/ChevronLeft";
import { ThemedText } from "@/components/ThemedText";
import { useFonts } from "expo-font";

type PaymentScreenHeaderProps = {
  title?: string;
  onPress: () => void;
};

export default function PaymentScreenHeader({
  title,
  onPress,
}: PaymentScreenHeaderProps) {
  const [loaded, error] = useFonts({
    "Oswald-Regular": require("../../../assets/fonts/oswald/Oswald-Regular.ttf"),
  });

  if (!loaded || error) {
    return null;
  }

  return (
    <View style={styles.header}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View>
          <Chevron />
        </View>
      </TouchableWithoutFeedback>
      <ThemedText
        type="defaultSemiBold"
        style={{ fontFamily: "Oswald-Regular" }}
      >
        {title}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    marginBottom: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 12,
  },
});
