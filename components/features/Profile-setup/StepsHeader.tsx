import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import StepIndicator from "@/components/shared/StepsIndicator";

type HeaderProps = {
  currentStep: number;
  stepCount: number;
  onPrevious: () => void;
};

const StepsHeader: React.FC<HeaderProps> = ({ currentStep, stepCount, onPrevious }) => {
  return (
    <View style={styles.headerContainer}>
      {currentStep > 0 && (
        <TouchableOpacity style={styles.previousButton} onPress={onPrevious}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
      )}

      <StepIndicator stepCount={stepCount} currentStep={currentStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    // paddingVertical: 16,
    paddingHorizontal: 16,
  },
  previousButton: {
    // position: 'absolute',
    // top: 20,
    // left: 10,
    // zIndex: 2,
    // padding: 10,
    // borderRadius: 20,
  },
});

export default StepsHeader;
