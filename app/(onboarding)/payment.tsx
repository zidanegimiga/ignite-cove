// @ts-nocheck
// @zidanegimiga
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
import { useNavigation, useRouter } from "expo-router";
import { useSendOTP, useVerifyOTP } from "@/api/auth";
import { useGetPlans } from "@/api/plans";
import * as Network from "expo-network";
import { saveToken } from "@/utilities/storage";
import { saveUserProgress } from "@/utilities/progressStorage";
import { loadProgressStep, saveSetupProgress } from "@/utilities/profileDataStorage";
import { Steps } from "@/types/profile-setup-data";



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

  const { mutate: fetchOTP, isLoading, error: fetchOTPError, data: fetchOTPData } = useSendOTP();
  const { mutate: verifyOTP, isLoading: verifyingOTP, data: verifyOTPData } = useVerifyOTP();
  const { data: plans, isLoading: gettingPlans, error: getPlansError } = useGetPlans();
  // const networkState = await Network.getNetworkStateAsync();

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [seconds, setSeconds] = useState(5);
  const [isCounting, setIsCounting] = useState(false);
  const [loadedStep , setLoadedStep ] = useState<Steps>("enter_number")
  const [loading, setLoading] = useState<boolean>(false)

  const navigation = useNavigation();
  const router = useRouter()

  const possible_steps = [
    "enter_number",
    "otp_verification",
    "plan_selection",
    "payment_method_selection",
    "payment_processing",
  ];

  // const possible_steps = [
  //   "plan_selection",
  //   "payment_method_selection",
  //   "payment_processing",
  // ];

  const startCountdown = () => {
    setIsCounting(true);
    setSeconds(59);
  };

  // const handleCodeComplete = (code: string) => {
  //   setOTP(code);
  
  //   console.log("Entered Code: ", code);
  //   if (code.length === 4) {
  //     verifyOTP(
  //       { otp: code, phone: phoneNumber, countryCode: cleanPhoneCode(country.dial_code) },
  //       {
  //         onSuccess: async (data) => {
  //           console.log("OTP Verified Successfully:", data);
  //           ToastAndroid.show("OTP was verified successfully", ToastAndroid.LONG);
  //           handleForward();
  //           await saveUserProgress("otp_verified");
  //           await saveToken(data.accessToken);
  //         },
  //         onError: (error) => {
  //           console.error("OTP Verification Failed:", error);
  //           ToastAndroid.show("OTP was not verified. Please try again", ToastAndroid.SHORT);
  //         },
  //       }
  //     );
  //   }
  // };

  const handleCodeComplete = (code: string) => {
    setOTP(code);
    setLoading(true)
    if (code.length === 4) {      
      verifyOTP(
        { otp: code, phone: phoneNumber, countryCode: cleanPhoneCode(country.dial_code) },
        {
          onSuccess: async (data) => {
            if(Number(code) === data?.id){
              console.log("OTP Verified Successfully:", data);
              await saveToken(data.accessToken);
              await saveSetupProgress("personality")
              const progress = await loadProgressStep();
    
              ToastAndroid.show("OTP was verified successfully", ToastAndroid.LONG);
              setLoading(false)
    
              // TODO: Send user to profile setup instead of next step
              navigation.replace("(profile-setup)");
            } else {
              setLoading(false)
              ToastAndroid.
              show("Incorrect OTP code, please try again", ToastAndroid.LONG);
            }
          },
          onError: (error) => {
            console.error("OTP Verification Failed:", error);
            ToastAndroid.show("OTP was not verified due to a problem. Please try again", ToastAndroid.LONG);
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
  

  function cleanPhoneCode(code: string){
    // trim & remove the plus sign
    const cleanCode = code.trim().replace("+", "");
    return cleanCode;
  }

  const handleForward = async () => {
    const currentIndex = possible_steps.indexOf(paymentStep);  
    if (paymentStep === "otp_verification") {
      await saveSetupProgress("personality");
      navigation.replace("/(profile-setup)"); 
      return;
    }
  
    if (currentIndex < possible_steps.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 200)); // Small delay to ensure UI updates
      setPaymentStep(possible_steps[currentIndex + 1]);
    } else {
      // After payment, take user to final screen
      // navigation.replace("(final-step)"); 
    }
  };  

  async function getOTP() {
    console.log("Number and country", { paymentStep, phoneNumber, c: cleanPhoneCode(country.dial_code) });
  
    const networkState = await Network.getNetworkStateAsync();

    console.log("Net state: ", networkState)
    if (!networkState.isConnected || !networkState.isInternetReachable) {
      ToastAndroid.show("No Connection", ToastAndroid.SHORT);
      return [];
    }
  
    fetchOTP(
      { phone: phoneNumber, countryCode: cleanPhoneCode(country.dial_code) },
      {
        onSuccess: (data) => {
          ToastAndroid.show("OTP sent successfully via WhatsApp", ToastAndroid.SHORT);
          setIsOtpSent(true);
          startCountdown();
          console.log("✅ Mutation Success:", { isLoading, verifyingOTP });
  
          if (paymentStep === "enter_number") {
            handleForward();
          }

          console.log("Data: ", data)
        },

        onError: (error) => {
          ToastAndroid.show("OTP was not sent. Please try again", ToastAndroid.SHORT);
          console.error("Failed to send OTP:", error);
          console.log("✅ Mutation Fail:", { isLoading, verifyingOTP, data });
        },
      }
    );
  }  

  async function sendOTP() {
    setSeconds(59);
  }

  async function handleButtonPress() {
    console.log("Current: ", paymentStep)
    
    switch (paymentStep) {
      case "enter_number":
        getOTP();
        await saveSetupProgress(paymentStep)
        break;
      case "otp_verification":
          // handleCodeComplete()
          await saveSetupProgress("plan_selection");
          console.log("Handle OTP Verification")
        break;
      case "plan_selection":
        if (selectedPlan) {
          await saveSetupProgress("payment_method_selection");
          handleForward();
          console.log("Handle Plan")
        }
        break;
      case "payment_method_selection":
        if (paymentMethod) {
          handleForward();
          saveSetupProgress("payment_done")
          // navigation.navigate("(profile-setup)");
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
    const fetchStep = async () => {
      try {
        const data = await loadProgressStep();
        console.log("Step:", data);
  
        if (data) {
          if (data === "personality") {
            router.replace('/(profile-setup)');
          } else {
            setPaymentStep(data);
          }
        } else {
          setPaymentStep("enter_number");
        }
      } catch (error) {
        console.error("Error loading progress step:", error);
        setPaymentStep("enter_number");
      }
    };
  
    fetchStep();
  }, []);
  

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

      {paymentStep === "plan_selection" && plans && plans.length > 0 && (
        <PlanSelection
          handleForward={handleForward}
          planDetails={plans}
          error={getPlansError}
          isLoading={gettingPlans}
        />
      )}

      {paymentStep === "payment_method_selection" && (
        <PaymentMethodSelection initiatePayment={handleForward} />
      )}

      {paymentStep === "payment_processing" && <PaymentLoader />}

      {paymentStep !== "plan_selection" &&
        paymentStep !== "payment_method_selection" && (
          <Button
            title={
              verifyingOTP
                ? "Verifying..."
                : getCurrentStepText({ paymentStep }).buttonTitle
            }
            disabled={returnButtonActiveState() || isLoading || loading}
            onPress={handleButtonPress}
            loading={isLoading || verifyingOTP || loading}
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
