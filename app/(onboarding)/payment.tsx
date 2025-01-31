// @ts-nocheck
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useFonts } from "expo-font";
import PaymentScreenHeader from "@/components/features/Payment/PaymentScreenHeader";
import CountryCodePicker from "@/components/shared/CountryCodePicker";
import Button from "@/components/shared/Button";
import PhoneVerification from "@/components/features/Payment/PhoneVerification";
import PlanSelection from "@/components/features/Payment/PlanSelection";
import PaymentMethodSelection from "@/components/features/Payment/PaymentMethodSelection";
import PaymentLoader from "@/components/features/Payment/PaymentLoader";
import { useNavigation } from "expo-router";

const PaymentScreen = () => {
  const [paymentStep, setPaymentStep] = useState("enter_number");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState({
    name: "Kenya",
    dial_code: "+254",
    code: "KE",
    flag: "🇰🇪",
  });
  const [otp, setOTP] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [seconds, setSeconds] = useState(5);
  const [isCounting, setIsCounting] = useState(false);

  const [loaded, error] = useFonts({
    "Oswald-Regular": require("../../assets/fonts/oswald/Oswald-Regular.ttf"),
    "Oswald-Light": require("../../assets/fonts/oswald/Oswald-Light.ttf"),
  });

  const navigation = useNavigation();

  const possible_steps = [
    "enter_number",
    "otp_verification",
    "plan_selection",
    "payment_method_selection",
    "payment_processing",
  ];

  const startCountdown = () => {
    setIsCounting(true);
    setSeconds(5);
  };

  const handleCodeComplete = (code: string) => {
    setOTP(code);
    console.log("Entered Code: ", otp);
  };

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
          secondary: "A verification code will be sent via WhatsApp",
          buttonTitle: "Create an Account",
        };
        break;
      case "otp_verification":
        return {
          title: "Create an account",
          primary: "Verify your mobile number",
          secondary: `Enter the 4-digit code we have sent via WhatsApp to`,
          buttonTitle: "Submit",
        };
        break;
      case "plan_selection":
        return {
          title: "Payment",
          primary: "",
          secondary: `Select a plan`,
          buttonTitle: "",
        };
        break;
      case "payment_method_selection":
        return {
          title: "Payment",
          primary: "Select payment method",
          secondary: ``,
          buttonTitle: "Initiate Payment",
        };
        break;
      case "payment_processing":
        return {
          title: "Payment",
          primary: "",
          secondary: ``,
          buttonTitle: "Complete",
        };
        break;
      default:
        return {
          title: "",
          primary: "",
          secondary: ``,
          buttonTitle: "",
        };
    }
  }

  const handleBack = () => {
    const currentIndex = possible_steps.indexOf(paymentStep);

    if (currentIndex > 0) {
      setPaymentStep(possible_steps[currentIndex - 1]);
      console.log(possible_steps[currentIndex - 1]);
    } else {
      navigation.navigate("(onboarding)");
    }
  };

  const handleForward = () => {
    const currentIndex = possible_steps.indexOf(paymentStep);

    if (currentIndex < possible_steps.length - 1) {
      setPaymentStep(possible_steps[currentIndex + 1]);
      console.log("Now in: ", possible_steps[currentIndex + 1]);
    } else {
      // Alert.alert("You are at the last step!");
    }
  };

  function returnButtonActiveState() {
    switch (paymentStep) {
      case "enter_number":
        return (
          !phoneNumber || !country.dial_code || country.dial_code.length == 0
        );
        break;
      case "otp_verification":
        return !otp || otp.length < 4;
        break;
      case "plan_selection":
        return !selectedPlan;
        break;
      case "payment_method_selection":
        return !paymentMethod;
        break;
      case "payment_processing":
        return false;
        break;
      default:
        return false;
    }
  }

  function getOTP() {
    startCountdown();
    return {
      success: true,
      data: [],
    };
  }

  async function sendOTP() {
    setSeconds(5);
  }

  function handleButtonPress() {
    switch (paymentStep) {
      case "enter_number":
        const { success, data } = getOTP();
        if (success) {
          handleForward();
          startCountdown();
        }
        break;
      case "otp_verification":
        if (otp.length == 4) {
          handleForward();
        }
        break;
      case "plan_selection":
        if (selectedPlan) {
          handleForward();
        }
        break;
      case "payment_method_selection":
        if (paymentMethod) {
          handleForward();
          navigation.navigate("(profile-setup)");
        }
        break;
      case "payment_processing":
        navigation.navigate("(profile-setup)");
        if (paymentMethod) {
          handleForward();
          navigation.navigate("(profile-setup)");
          // navigation.navigate('profile')
        }
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCounting && seconds > 0) {
      timer = setTimeout(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsCounting(false);
    }

    return () => clearTimeout(timer);
  }, [isCounting, seconds]);

  return (
    <SafeAreaThemedView style={styles.mainView}>
      <PaymentScreenHeader
        title={getCurrentStepText({ paymentStep })?.title}
        onPress={handleBack}
      />
      {paymentStep !== "plan_selection" && (
        <ThemedText
          style={{ fontFamily: "Oswald-Regular", fontSize: 26, lineHeight: 28 }}
        >
          {getCurrentStepText({ paymentStep })?.primary}
        </ThemedText>
      )}

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
        <ThemedText
          style={{
            fontFamily: "Oswald-Bold",
            fontSize: 14,
            lineHeight: 24,
            marginTop: 4,
            color: "#484646",
          }}
        >
          {paymentStep === "otp_verification"
            ? " " + country.dial_code + " " + phoneNumber
            : ""}
        </ThemedText>
      </ThemedText>

      {paymentStep === "enter_number" && (
        <View style={styles.countryCodePickerContainer}>
          <CountryCodePicker
            onCountryChange={(value) => setCountry(value)}
            onPhoneChange={(value) => setPhoneNumber(value)}
            labels={{
              code: "Code",
              phone: "Phone Number",
              placeholder: "Enter phone number",
            }}
          />
        </View>
      )}

      {paymentStep === "otp_verification" && (
        <>
          <Pressable onPress={handleBack}>
            <ThemedText
              style={{
                fontFamily: "Oswald-Regular",
                fontSize: 14,
                lineHeight: 24,
                marginTop: 4,
                color: "#EB1E25",
                textDecorationStyle: "solid",
                textDecorationLine: "underline",
                marginBottom: 24,
              }}
            >
              Change number
            </ThemedText>
          </Pressable>
          <View style={{ width: "100%", marginBottom: 8 }}>
            <PhoneVerification onCodeComplete={handleCodeComplete} />
            <View>
              <ThemedText
                style={{
                  fontFamily: "Oswald-Regular",
                  fontSize: 12,
                  lineHeight: 24,
                  marginTop: 64,
                  color: "#000000",
                  textDecorationStyle: "solid",
                  marginBottom: 24,
                }}
              >
                {seconds <= 1 ? "Didn't get code? " : "Resend in "}
                {seconds <= 1 ? (
                  <Pressable onPress={getOTP}>
                    <Text
                      style={{
                        fontFamily: "Oswald-Regular",
                        fontSize: 12,
                        lineHeight: 24,
                        marginTop: 4,
                        color: "#EB1E25",
                        textDecorationStyle: "solid",
                        textDecorationLine: "underline",
                      }}
                    >
                      Resend Code
                    </Text>
                  </Pressable>
                ) : (
                  <Text
                    style={{
                      fontFamily: "Oswald-Regular",
                      fontSize: 12,
                      lineHeight: 24,
                      marginTop: 4,
                      color: "#EB1E25",
                      textDecorationStyle: "solid",
                      textDecorationLine: "underline",
                    }}
                  >
                    {`${seconds}s`}
                  </Text>
                )}
              </ThemedText>
            </View>
          </View>
        </>
      )}

      {paymentStep === "plan_selection" && (
        <PlanSelection handleForward={handleForward} />
      )}

      {paymentStep === "payment_method_selection" && (
        <PaymentMethodSelection initiatePayment={handleForward} />
      )}

      {paymentStep === "payment_processing" && <PaymentLoader />}

      {paymentStep !== "plan_selection" &&
        paymentStep !== "payment_method_selection" && (
          <Button
            title={getCurrentStepText({ paymentStep }).buttonTitle}
            disabled={returnButtonActiveState()}
            onPress={handleButtonPress}
          />
        )}
    </SafeAreaThemedView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 24,
    paddingTop: 48,
    backgroundColor: "#F6F6F6",
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
