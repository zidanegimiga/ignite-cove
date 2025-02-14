import React, { useState, useEffect, useMemo } from "react";
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
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "@/components/shared/Button";
import InputField from "@/components/ui/InputField";
import StepIndicator from "@/components/shared/StepsIndicator";
import StepsHeader from "@/components/features/Profile-setup/StepsHeader";
import PersonalitySelection from "@/components/features/Profile-setup/PrivacySelection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { saveUserProgress } from "@/utilities/progressStorage";
import { useNavigation } from "expo-router";
import { SafeAreaThemedView } from "@/components/ThemedView";
import {
  saveProfileData,
  saveSkippedStep,
} from "@/utilities/profileDataStorage";
import { UserProfile } from "@/types/profile-setup-data";
import { loadProfileData } from "@/utilities/profileDataStorage";
import NameStep from "@/components/features/Profile-setup/NameStep";
import DOBStep from "@/components/features/Profile-setup/DOBStep";
import PhotoUploadStep from "@/components/features/Profile-setup/PhotoUploadStep";
import GenderSelection from "@/components/features/Profile-setup/GenderSelection";
import SexualOrientationStep from "@/components/features/Profile-setup/SexualOrientationStep";
import LocationStep from "@/components/features/Profile-setup/LocationStep";
import PhysicalAttributesStep from "@/components/features/Profile-setup/PhysicalAttributesStep";
import LifestyleHabitsStep from "@/components/features/Profile-setup/LifestyleHabitsStep";
import SocioEconomicStep from "@/components/features/Profile-setup/SocioEconomicStep";
import { ThemedView } from "@/components/ThemedView";
import LoadingScreen from "@/components/features/Profile-setup/LoadingScreen";
import ProfileIsReady from "@/components/features/Profile-setup/ProfileIsReady";

const STEP_COUNT = 12;

const ProfileSetup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepComplete, setIsStepComplete] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem("user_profile");
        if (storedProfile) {
          setUserProfile(JSON.parse(storedProfile));
        } else {
          const newProfile = { skippedSteps: [] };
          await AsyncStorage.setItem(
            "user_profile",
            JSON.stringify(newProfile)
          );
          setUserProfile(newProfile);
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handlePrevious = async () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      await AsyncStorage.setItem("profile_step", prevStep.toString());
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
    setIsStepComplete(false);

    if(currentStep >= 12){
      handleProfileSetupComplete()
    }

  };

  const handleSkip = async () => {
    await saveSkippedStep(currentStep);
    handleNext();
  };

  const renderStep = useMemo(() => {
    if (loading) return <ActivityIndicator size="large" color="#FA623B" />;

    if (!userProfile)
      return <Text>Error loading profile. Please restart.</Text>;

    const skippedSteps = userProfile.skippedSteps || [];

    let nextStep = currentStep;
    // while (skippedSteps.includes(nextStep) && nextStep < 10) {
    //   nextStep++;
    // }

    switch (nextStep) {
      case 0:
        return <PersonalitySelection onCompletionChange={setIsStepComplete} />;
      case 1:
        return <NameStep onCompletionChange={setIsStepComplete} />;
      case 2:
        return <DOBStep onCompletionChange={setIsStepComplete} />;
      case 3:
        return <GenderSelection onCompletionChange={setIsStepComplete} />;
      case 4:
        return <SexualOrientationStep onCompletionChange={setIsStepComplete} />;
      case 5:
        return <LocationStep onCompletionChange={setIsStepComplete} />;
      case 6:
        return (
          <PhysicalAttributesStep
            onCompletionChange={setIsStepComplete}
            onSkip={handleSkip}
          />
        );
      case 7:
        return (
          <LifestyleHabitsStep
            onCompletionChange={setIsStepComplete}
            onSkip={handleSkip}
          />
        );
      case 8:
        return (
          <SocioEconomicStep
            onCompletionChange={setIsStepComplete}
            onSkip={handleSkip}
          />
        );
      case 9:
        return (
          <PhotoUploadStep
            onCompletionChange={setIsStepComplete}
          />
        );
      case 10:
        return (
          <LoadingScreen
            onCompletionChange={setIsStepComplete}
            nextStep={handleNext}
          />
        );
      case 11:
        return (
          <ProfileIsReady
            onCompletionChange={setIsStepComplete}
          />
        );
      default:
        return <View />;
    }
  }, [loading, currentStep, userProfile]);

  const stepsHeaderProps = useMemo(
    () => ({
      currentStep,
      stepCount: STEP_COUNT,
      onPrevious: handlePrevious,
    }),
    [currentStep]
  );

  const handleProfileSetupComplete = () => {
    saveUserProgress("profile_setup_completed");
    router.replace("/(profile-setup)");
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{ width: "100%", flex: 1 }}
      >
        <View style={styles.inner}>
          {/* <Text>{currentStep}</Text> */}
          {
            currentStep !== 11 && currentStep !== 10 && (
              <StepsHeader {...stepsHeaderProps} />
            )
          }

          <View style={styles.scrollContent}>{renderStep}</View>

          {
             currentStep !== 11 && currentStep !== 10 && (
              <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.nextButton}>
                <Button
                  onPress={handleNext}
                  title={currentStep === STEP_COUNT - 1 ? "Complete" : "Next "}
                  // disabled={!isStepComplete}
                  loading={ loading }
                  spinnerColor="#fff"
                />
                {currentStep >= 5 && (
                  <Button
                    onPress={handleSkip}
                    title="Skip"
                    disabled={false}
                    loading={loading}
                    spinnerColor="red"
                    variant="text-only"
                  />
                )}
              </TouchableOpacity>
            </View>
             )
          }

        </View>
      </TouchableWithoutFeedback>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: Colors.light.background,
    width: Dimensions.get("screen").width,
    overflow: "hidden",
  },
  inner: {
    flex: 1,
    // justifyContent: "space-between",
  },

  scrollContent: {
    flexGrow: 1,
    // paddingHorizontal: 20,
    // paddingTop: 30,
    width: "100%",
  },
  stepContent: {
    // alignItems: "center",
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
    padding: 8,
    backgroundColor: "white",
  },
  nextButton: {
    padding: 15,
  },
});

export default ProfileSetup;
