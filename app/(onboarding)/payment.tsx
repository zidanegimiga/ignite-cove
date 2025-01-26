import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { SafeAreaThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useFonts } from "expo-font";
import PaymentScreenHeader from "@/components/features/Payment/PaymentScreenHeader";

const PaymentScreen = () => {
  const [loaded, error] = useFonts({
    "Oswald-Regular": require("../../assets/fonts/oswald/Oswald-Regular.ttf"),
  });
  
  return (
    <SafeAreaThemedView style={styles.mainView}>
      <PaymentScreenHeader title="Create an account"/>

      <ThemedText
        style={{ fontFamily: "Oswald-Regular", fontSize: 26, lineHeight: 28 }}
      >
        Welcome! What's your mobile number?
      </ThemedText>
      <ThemedText
        style={{
          fontFamily: "Oswald-Regular",
          fontSize: 14,
          lineHeight: 24,
          marginTop: 8,
          color: "#484646",
        }}
      >
        A verification code will be sent to WhatsApp
      </ThemedText>


    </SafeAreaThemedView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 24,
    paddingTop: 48,
  },
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
