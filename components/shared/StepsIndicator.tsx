import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

type StepIndicatorProps = {
  stepCount: number;
  currentStep: number;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({
  stepCount,
  currentStep,
}) => {
  return (
    <View style={styles.stepContainer}>
      {[...Array(stepCount)].map((_, index) => {
        const isCompleted = index <= currentStep;

        return (
          <View
            key={index}
            style={[
              styles.stepIndicator,
              isCompleted ? styles.completedStep : styles.defaultStep,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  stepIndicator: {
    height: 4,
    borderRadius: 2,
    flex: 1,
    marginHorizontal: 2,
  },
  defaultStep: {
    backgroundColor: "#bdc3c7",
  },
  completedStep: {
    backgroundColor: Colors.light.primaryColor,
  },
});

export default StepIndicator;
