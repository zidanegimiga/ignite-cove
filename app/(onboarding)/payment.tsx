import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { SafeAreaThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useFonts } from "expo-font";
import PaymentScreenHeader from "@/components/features/Payment/PaymentScreenHeader";
import CountryCodePicker from "@/components/shared/CountryCodePicker";
import Button from "@/components/shared/Button";

const PaymentScreen = () => {
  const [paymentStep, setPaymentStep] = useState("enter_number");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");

  const [loaded, error] = useFonts({
    "Oswald-Regular": require("../../assets/fonts/oswald/Oswald-Regular.ttf"),
    "Oswald-Light": require("../../assets/fonts/oswald/Oswald-Light.ttf"),
  });
  const possible_steps = [
    "enter_number",
    "otp_verification",
    "plan_selection",
    "payment_method_selection",
    "payment_processing",
  ];

  function getCurrentStepText({
    paymentStep,
    phone_number,
  }: {
    paymentStep: string;
    phone_number?: string;
  }) {
    switch (paymentStep) {
      case "enter_number":
        return {
          title: "Create an account",
          primary: "Welcome! What is your mobile number?",
          secondary: "A verification code will be sent to WhatsApp",
        };
        break;
      case "otp_verification":
        return {
          title: "Create an account",
          primary: "Verify your mobile number",
          secondary: `Enter the 4-digit code we have sent via WhatsApp to ${phone_number}`,
        };
        break;
      case "plan_selection":
        return {
          title: "Payment",
          primary: "Select payment method",
          secondary: ``,
        };
        break;
      case "payment_method_selection":
        return {
          title: "Payment",
          primary: "Select payment method",
          secondary: ``,
        };
        break;
      case "payment_processing":
        return {
          title: "Payment",
          primary: "",
          secondary: ``,
        };
        break;
    }
  }

  return (
    <SafeAreaThemedView style={styles.mainView}>
      <PaymentScreenHeader title={getCurrentStepText({ paymentStep })?.title} />
      <ThemedText
        style={{ fontFamily: "Oswald-Regular", fontSize: 26, lineHeight: 28 }}
      >
        {getCurrentStepText({ paymentStep })?.primary}
      </ThemedText>
      <ThemedText
        style={{
          fontFamily: "Oswald-Light",
          fontSize: 14,
          lineHeight: 24,
          marginTop: 4,
          color: "#484646",
        }}
      >
        {
          getCurrentStepText({ paymentStep, phone_number: phoneNumber })
            ?.secondary
        }
      </ThemedText>
      <View style={styles.countryCodePickerContainer}>
        <CountryCodePicker
          onCountryChange={(value) => setCountry(value)}
          onPhoneChange={(value) => setPhoneNumber(value)}
        />
      </View>
      <Button title="Create an Account" disabled={!phoneNumber && !country} />
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
  countryCodePickerContainer: {
    marginTop: 32,
    marginBottom: 156,
  },
});
