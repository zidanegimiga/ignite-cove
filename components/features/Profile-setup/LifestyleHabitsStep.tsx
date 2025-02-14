import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { saveProfileData, loadProfileData } from "@/utilities/profileDataStorage";
import Fitness from "@/components/shared/Icons/Fitness";
import EyeOutline from "@/components/shared/Icons/EyeOutline";
import Smoking from "@/components/shared/Icons/Smoking";
import Drinking from "@/components/shared/Icons/Drinking";
import Pets from "@/components/shared/Icons/Pets";
import { ThemedText } from "@/components/ThemedText";

type LifestyleHabitsStepProps = {
  onCompletionChange: (isComplete: boolean) => void;
  onSkip: () => void;
};

const FITNESS_LEVELS = ["Sedentary", "Lightly Active", "Active", "Very Active"];
const DIETARY_PREFERENCES = ["Vegetarian", "Vegan", "Pescatarian", "Omnivore"];
const SMOKING_HABITS = ["Non-smoker", "Occasionally", "Regular Smoker"];
const DRINKING_HABITS = ["Non-drinker", "Social Drinker", "Frequent Drinker"];
const PETS = ["No Pets", "Cat", "Dog", "Multiple Pets"];

const LifestyleHabitsStep: React.FC<LifestyleHabitsStepProps> = ({
  onCompletionChange,
  onSkip,
}) => {
  const [selectedFitness, setSelectedFitness] = useState<string | null>(null);
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null);
  const [selectedSmoking, setSelectedSmoking] = useState<string | null>(null);
  const [selectedDrinking, setSelectedDrinking] = useState<string | null>(null);
  const [selectedPets, setSelectedPets] = useState<string | null>(null);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    const storedProfile = await loadProfileData();
    if (storedProfile?.lifestyle) {
      const { fitness, diet, smoking, drinking, pets } = storedProfile.lifestyle;
      setSelectedFitness(fitness);
      setSelectedDiet(diet);
      setSelectedSmoking(smoking);
      setSelectedDrinking(drinking);
      setSelectedPets(pets);

      const isCompleted = !!(fitness || diet || smoking || drinking || pets);
      onCompletionChange(isCompleted);
    }
  };

  const handleSave = async () => {
    const updatedData = {
      fitness: selectedFitness,
      diet: selectedDiet,
      smoking: selectedSmoking,
      drinking: selectedDrinking,
      pets: selectedPets,
    };

    await saveProfileData({ lifestyle: updatedData });

    const isCompleted = !!(selectedFitness || selectedDiet || selectedSmoking || selectedDrinking || selectedPets);
    onCompletionChange(isCompleted);
  };

  const handleSkip = async () => {
    // @ts-ignore
    await saveProfileData({ skippedSteps: [...(await loadProfileData()).skippedSteps, "lifestyle"] });
    onSkip();
  };

  return (
    <View style={styles.container}>

      <ThemedText style={{fontFamily: "Oswald-Regular", fontSize: 24, marginTop: 8, lineHeight: 26}}> What are your lifestyle habits? </ThemedText>
        <View style={styles.labelContainer}>
        <Fitness/>
        <Text style={styles.label}>Fitness Level</Text>
      </View> 
      
      <View style={styles.selectionContainer}>
        {FITNESS_LEVELS.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, selectedFitness === option && styles.selectedOption]}
            onPress={() => {
              setSelectedFitness(option);
              handleSave();
            }}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.labelContainer}>
        <EyeOutline/>
        <Text style={styles.label}>Dietary Preference</Text>
      </View> 

      
      <View style={styles.selectionContainer}>
        {DIETARY_PREFERENCES.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, selectedDiet === option && styles.selectedOption]}
            onPress={() => {
              setSelectedDiet(option);
              handleSave();
            }}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.labelContainer}>
        <Smoking/>
        <Text style={styles.label}>Smoking Habits</Text>
      </View> 
      
      <View style={styles.selectionContainer}>
        {SMOKING_HABITS.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, selectedSmoking === option && styles.selectedOption]}
            onPress={() => {
              setSelectedSmoking(option);
              handleSave();
            }}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.labelContainer}>
        <Drinking/>
        <Text style={styles.label}>Drinking Habits</Text>
      </View> 
      

      <View style={styles.selectionContainer}>
        {DRINKING_HABITS.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, selectedDrinking === option && styles.selectedOption]}
            onPress={() => {
              setSelectedDrinking(option);
              handleSave();
            }}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.selectionContainer}>
        <Pets/>
        <Text style={styles.label}>Pets</Text>
      </View>

      <View style={styles.selectionContainer}>
        {PETS.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, selectedPets === option && styles.selectedOption]}
            onPress={() => {
              setSelectedPets(option);
              handleSave();
            }}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default LifestyleHabitsStep;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingBottom: 50,
    paddingHorizontal: 16
  },
  label: {
    fontSize: 14,
    color: "#000",
    marginVertical: 8,
    fontFamily: "Oswald-Regular"
  },
  selectionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 12,
  },
  option: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingVertical: 4,
    paddingHorizontal: 13,
    borderRadius: 20,
  },
  selectedOption: {
    borderColor: "#F6F6F6",
    backgroundColor: "#FCEDED",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Oswald-Light"
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    gap: 8,
    marginBottom: 8,
    marginTop: 16,
  },
});
