// @ts-nocheck
import { StyleSheet, Text, View, SafeAreaView, Pressable, ToastAndroid, } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import PaymentScreenHeader from "@/components/features/Payment/PaymentScreenHeader";
import CountryCodePicker from "@/components/shared/CountryCodePicker";
import Button from "@/components/shared/Button";
import PhoneVerification from "@/components/features/Payment/PhoneVerification";
import PlanSelection from "@/components/features/Payment/PlanSelection";
import PaymentMethodSelection from "@/components/features/Payment/PaymentMethodSelection";
import PaymentLoader from "@/components/features/Payment/PaymentLoader";
import { useNavigation } from "expo-router";
import { useSendOTP, useVerifyOTP } from "@/api/auth";
import * as Network from "expo-network";
import { saveToken } from "@/utilities/storage";


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

  const { mutate, isLoading, error, data } = useSendOTP();
  const { mutate: verifyOTP, isLoading: verifyingOTP } = useVerifyOTP();
  // const networkState = await Network.getNetworkStateAsync();

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [seconds, setSeconds] = useState(5);
  const [isCounting, setIsCounting] = useState(false);

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
    setSeconds(59);
  };

  const handleCodeComplete = (code: string) => {
    setOTP(code);
    console.log("Entered Code: ", code);
    if (code.length === 4) {

      // TODO: OTP Verifies successfully despite entering the wrong digits
      verifyOTP(
        { code, phone: phoneNumber, countryCode: cleanPhoneCode(country.dial_code) },
        {
          onSuccess: async (data) => {
            console.log("OTP Verified Successfully:", data);
            await saveUserProgress("otp_verified");

            ToastAndroid.show("OTP was verified successfully", ToastAndroid.SHORT);
            await saveToken(data.accessToken);

            handleForward();
          },
          onError: (error) => {
            console.error("OTP Verification Failed:", error);

            ToastAndroid.show("OTP was not verified", ToastAndroid.SHORT);
          },
        }
      );
    }
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

  function returnButtonActiveState() {
    switch (paymentStep) {
      case "enter_number":
        return isLoading || !phoneNumber || !country.dial_code;
      case "otp_verification":
        return verifyingOTP || !otp || otp.length < 4;
      case "plan_selection":
        return !selectedPlan;
      case "payment_method_selection":
        return !paymentMethod;
      case "payment_processing":
        return false;
      default:
        return false;
    }
  }
  

  function cleanPhoneCode(code){
    // remove the plus sign
    const cleanCode = code.replace("+", "");
    return cleanCode;
  }

  const handleForward = () => {
    const currentIndex = possible_steps.indexOf(paymentStep);

    if (currentIndex < possible_steps.length - 1) {
      setPaymentStep(possible_steps[currentIndex + 1]);
      console.log("Now in: ", possible_steps[currentIndex + 1]);
    } else {
      // Alert.alert("You are at the last step!");
    }
  };

  async function getOTP() {
    console.log("Number and country", { paymentStep, phoneNumber, c: cleanPhoneCode(country.dial_code) });
  
    const networkState = await Network.getNetworkStateAsync();
    if (!networkState.isConnected) {
      // ToastAndroid.show("No Connection", ToastAndroid.SHORT);
      return;
    }
  
    mutate(
      { phone: phoneNumber, countryCode: cleanPhoneCode(country.dial_code) },
      {
        onSuccess: (data) => {
          ToastAndroid.show("OTP sent successfully via WhatsApp", ToastAndroid.SHORT);
          setIsOtpSent(true);
          startCountdown();
  
          if (paymentStep === "enter_number") {
            handleForward();
          }

          console.log("Data: ", data)
        },
        onError: (error) => {
          ToastAndroid.show("OTP was not sent", ToastAndroid.SHORT);
          console.error("Failed to send OTP:", error);
  
        },
      }
    );
  }
  
  

  async function sendOTP() {
    setSeconds(59);
  }

  function handleButtonPress() {
    switch (paymentStep) {
      case "enter_number":
        getOTP();
        break;
        case "otp_verification":
          // handleCodeComplete()
          console.log("Handle OTP Verification")
          break;
      case "plan_selection":
        if (selectedPlan) {
          // handleForward();
          console.log("Handle Plan")
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
            title={verifyingOTP ? "Verifying..." : getCurrentStepText({ paymentStep }).buttonTitle}
            disabled={returnButtonActiveState() || isLoading}
            onPress={handleButtonPress}
            loading={isLoading || verifyingOTP}
            spinnerColor="#fff"
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
