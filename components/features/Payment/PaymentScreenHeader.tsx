import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import ChevronLeft from "@/components/shared/Icons/ChevronLeft";
import { ThemedText } from "@/components/ThemedText";
import { useFonts } from "expo-font";

export default function PaymentScreenHeader({title}: {title: string}) {
  const [loaded, error] = useFonts({
    "Oswald-Regular": require("../../../assets/fonts/oswald/Oswald-Regular.ttf"),
  });

  return (
    <View style={styles.header}>
      <ChevronLeft />
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