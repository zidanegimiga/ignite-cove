import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "@/components/shared/Button";
import InputField from "@/components/ui/InputField";
import StepIndicator from "@/components/shared/StepsIndicator";
import StepsHeader from "@/components/features/Profile-setup/StepsHeader";
import PrivacySelection from "@/components/features/Profile-setup/PrivacySelection";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STEP_COUNT = 10;

const Step1 = () => (
  <View>
    <Text style={styles.stepTitle}>What is your name?</Text>
    <InputField label="First Name" placeholder="Enter first name" />
    <InputField label="Second Name" placeholder="Enter second name" />
  </View>
);

const ProfileSetup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepComplete, setIsStepComplete] = useState(false);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const storedStep = await AsyncStorage.getItem("profile_step");
      if (storedStep) {
        setCurrentStep(parseInt(storedStep, 10));
      }
    } catch (error) {
      console.error("Error loading progress", error);
    }
  };


  const handleNext = async () => {
    const nextStep = currentStep + 1;
    if (nextStep < STEP_COUNT) {
      setCurrentStep(nextStep);
      await AsyncStorage.setItem("profile_step", nextStep.toString());
    }
  };


  const handlePrevious = async () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      await AsyncStorage.setItem("profile_step", prevStep.toString());
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PrivacySelection onSelectionChange={() => {}} onCompletionChange={setIsStepComplete} />;
      case 1:
        return <Text>Step 2: Set Hobbies</Text>;
      case 2:
        return <Text>Step 3: Set Location</Text>;
      default:
        return <View />;
    }
  };

  // const currentStepTitle =
  //   stepComponents[currentStep]?.title || `Step ${currentStep + 1}`;

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    style={styles.container}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inner}>
        <StepsHeader
          currentStep={currentStep}
          stepCount={STEP_COUNT}
          onPrevious={handlePrevious}
        />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.stepContent}>
            { renderStep() }
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.nextButton}>
            <Button
              onPress={handleNext}
              title={currentStep === STEP_COUNT - 1 ? "Complete" : "Next"}
              disabled={!isStepComplete}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: Colors.light.background,
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
  },

  scrollContent: {
    flexGrow: 1,
  },
  stepContent: {
    alignItems: "center",
    paddingTop: 20,
  },
  stepTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: "white",
  },
  nextButton: {
    padding: 15,
  },
});

export default ProfileSetup;
