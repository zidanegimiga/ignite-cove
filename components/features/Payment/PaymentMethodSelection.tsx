import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { Children } from "react";
import { ThemedText } from "@/components/ThemedText";
import { useFonts } from "expo-font";
import OutlinedCheckMark from "@/components/shared/Icons/OutlinedCheckmark";
import Button from "@/components/shared/Button";
import { Image } from "expo-image";
import { payment_methods } from "@/constants";
import PhoneVerification from "./PhoneVerification";
import CountryCodePicker from "@/components/shared/CountryCodePicker";

const CheckIndicator = ({ isActive }: { isActive: boolean }) => {
  return (
    <View
      style={[
        styles.check_indicator_container,
        { borderColor: isActive ? "#EB1E25" : "#CBD5E1" },
      ]}
    >
      {isActive && <View style={styles.check_active}></View>}
    </View>
  );
};

const PaymentMethodOption = ({
  payment_method,
  image,
  isActive,
  onPress,
}: {
  payment_method: string;
  image: any;
  isActive: boolean;
  onPress: () => void;
}) => {
  const [loaded, error] = useFonts({
    "Oswald-Regular": require("../../../assets/fonts/oswald/Oswald-Regular.ttf"),
    "Oswald-Light": require("../../../assets/fonts/oswald/Oswald-Light.ttf"),
    "Oswald-Medium": require("../../../assets/fonts/oswald/Oswald-Medium.ttf"),
  });

  return (
    <TouchableOpacity
      style={styles.option_container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <CheckIndicator isActive={isActive} />
      <Image source={{ uri: image }} style={styles.image} />
      <ThemedText style={styles.payment_text}>{payment_method}</ThemedText>
    </TouchableOpacity>
  );
};

const PaymentMethodSelection = ({initiatePayment}: {initiatePayment: () => void}) => {
  const [selectedMethod, setSelectedMethod] = React.useState<string | null>(
    null
  );
  const [country, setCountry] = React.useState({
    name: "",
    dial_code: "",
    code: "",
    flag: "",
  });
  const [phoneNumber, setPhoneNumber] = React.useState<string | null>(null);
  const [loaded, error] = useFonts({
    "Oswald-Regular": require("../../../assets/fonts/oswald/Oswald-Regular.ttf"),
    "Oswald-Light": require("../../../assets/fonts/oswald/Oswald-Light.ttf"),
    "Oswald-Medium": require("../../../assets/fonts/oswald/Oswald-Medium.ttf"),
  });

  return (
    <View>
      {payment_methods.map((method, index) => {
        return (
          <PaymentMethodOption
            key={index}
            payment_method={method.description_string}
            image={method.logo}
            onPress={() => setSelectedMethod(method.name)}
            isActive={selectedMethod === method.name}
          />
        );
      })}

      {selectedMethod && (
        <>
          <ThemedText
            style={{
              fontFamily: "Oswald-Medium",
              fontSize: 14,
              lineHeight: 24,
              marginBottom: 0,
              color: "#484646",
              marginTop: 32,
            }}
          >
            Complete payment
          </ThemedText>
          <ThemedText
            style={{
              fontFamily: "Oswald-Regular",
              fontSize: 12,
              lineHeight: 24,
              marginBottom: 4,
              color: "#484646",
            }}
          >
            You will receive a prompt to authenticate payment
          </ThemedText>
          <View style={styles.countryCodePickerContainer}>
            <CountryCodePicker
              onCountryChange={(value) => setCountry(value)}
              onPhoneChange={(value) => setPhoneNumber(value)}
              labels={{
                code: "Code",
                phone: "M-PESA Number",
                placeholder: "Enter M-PESA number"
              }}
            />
          </View>
          <Button
            title="Initiate Payment"
            disabled={!selectedMethod || !country || !phoneNumber}
            onPress={initiatePayment}
          />
        </>
      )}
    </View>
  );
};

export default PaymentMethodSelection;

const styles = StyleSheet.create({
  countryCodePickerContainer: {
    marginTop: 24,
    marginBottom: 56,
  },
  payment_text: {
    fontFamily: "Oswald-Medium",
    fontSize: 14,
    lineHeight: 24,
    color: "#484646",
  },
  option_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#CBD5E1",
    borderBottomWidth: 1,
    paddingVertical: 8,
    gap: 12,
  },
  image: {
    width: "auto",
    height: 24,
  },
  check_indicator_container: {
    width: 20,
    height: 20,
    padding: 2,
    borderRadius: 10,
    borderColor: "#EB1E25",
    borderWidth: 1,
    borderStyle: "solid",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  check_active: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EB1E25",
  },
});
