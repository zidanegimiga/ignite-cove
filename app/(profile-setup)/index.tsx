import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '@/components/shared/Button';
import NameForm from './steps/nameForm';
import InputField from '@/components/ui/InputField';

const STEP_COUNT = 10; 


const Step1 = () => (
  <View>
     
    <Text style={styles.stepTitle}>What is your name?</Text>
    <InputField label="First Name" placeholder="Enter first name" />
    <InputField label="Second Name" placeholder="Enter second name" />
  </View>
);

const Step2 = () => (
  <View>
    <Text>Step 2: Set Hobbies</Text>

  </View>
);

const Step3 = () => (
  <View>
    <Text>Step 3: Set Location</Text>

  </View>
);




const stepComponents = [
  { component: Step1, title: '' },
  { component: Step2, title: 'Set Hobbies' },
  { component: Step3, title: 'Set Location' },
 
];

const ProfileSetup = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEP_COUNT - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };


  const StepIndicator = () => {
    return (
      <View style={styles.stepContainer}>
        {[...Array(STEP_COUNT)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.stepIndicator,
              index <= currentStep && styles.completedStep,
              index === currentStep && styles.activeStep,
            ]}
          />
        ))}
      </View>
    );
  };


  const CurrentStepComponent = stepComponents[currentStep]?.component || (() => <Text>Step {currentStep + 1}</Text>);
  const currentStepTitle = stepComponents[currentStep]?.title || `Step ${currentStep + 1}`;

  return (
    <View style={styles.container}>
      {/* Previous Button (Small Back Icon) */}
      {currentStep > 0 && (
        <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
      )}

      {/* Fixed Step Indicator at the Top */}
      <View style={styles.stepIndicatorContainer}>
        <StepIndicator />
      </View>

      {/* Scrollable Content for Each Step */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>{currentStepTitle}</Text>
          {/* Render the current step component */}
          <CurrentStepComponent />
        </View>
      </ScrollView>

      {/* Next Button (Big Centered Button) */}
      <TouchableOpacity style={styles.nextButton}>
        <Button
          onPress={handleNext}
          title={currentStep === STEP_COUNT - 1 ? 'Complete' : 'Next'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: Colors.light.background,
  },
  // Previous Button (Small Back Icon)
  previousButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 2, // Ensure it's above the step indicator
    padding: 10,
    borderRadius: 20,
  },
  // Step Indicator
  stepIndicatorContainer: {
    position: 'absolute',
    top: 70, // Adjusted to make space for the previous button
    left: 20,
    right: 20,
    zIndex: 1, // Ensure it stays above the content
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepIndicator: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#bdc3c7', // Inactive step color
    flex: 1,
    marginHorizontal: 2, // Small gap between steps
  },
  completedStep: {
    backgroundColor: Colors.light.primaryColor, // Completed step color
  },
  activeStep: {
    backgroundColor: Colors.light.inactiveButton, // Active step color
  },
  // Scrollable Content
  scrollContent: {
    flexGrow: 1,
    paddingTop: 100, // Adjusted to make space for the step indicator and previous button
  },
  stepContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  stepTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  // Next Button (Big Centered Button)
  nextButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 15,
  },
});

export default ProfileSetup;