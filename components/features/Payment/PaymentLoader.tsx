import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { ThemedText } from "@/components/ThemedText";

const PaymentLoader = () => {
  const [loaded, error] = useFonts({
    "Oswald-Bold": require("@/assets/fonts/oswald/Oswald-Bold.ttf"),
    "Oswald-Light": require("@/assets/fonts/oswald/Oswald-Light.ttf"),
  });
  return (
    <View style={{ flex: 1, paddingBottom: 48 }}>
      <ThemedText
        style={{
          fontFamily: "Oswald-Bold",
          fontSize: 18,
          lineHeight: 24,
          marginTop: 4,
          color: "#484646",
        }}
      >Processing Payment...</ThemedText>
    </View>
  );
};

export default PaymentLoader;

const styles = StyleSheet.create({});
