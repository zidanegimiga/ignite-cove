import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { loadProfileData, saveProfileData } from "@/utilities/profileDataStorage";
import { ThemedText } from "@/components/ThemedText";

type PersonalitySelectionProps = {
  onCompletionChange: (isComplete: boolean) => void;
};

const options = [
  {
    id: "adventurous",
    title: "Adventurous",
    description: "I would like my phone number to be displayed to all users",
    url: require("@/assets/images/setup_adventurous.png"),
  },
  {
    id: "cautious",
    title: "Cautious",
    description:
      "I would like my phone number to remain hidden and only be revealed to users I like",
    url: require("@/assets/images/cautious.png"),
  },
];

const PersonalitySelection: React.FC<PersonalitySelectionProps> = ({ onCompletionChange }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    loadSelection();
  }, []);

  const loadSelection = async () => {
    try {
      const storedProfile = await loadProfileData();
      if (storedProfile?.personality) {
        setSelectedOption(storedProfile.personality);
        onCompletionChange(true);
      }
    } catch (error) {
      console.error("Error loading personality selection", error);
    }
  };

  const handleSelect = async (id: string) => {
    setSelectedOption(id);

    await saveProfileData({ personality: id });

    onCompletionChange(true);
  };


  return (
    <View style={styles.container}>

      <ThemedText style={{fontFamily: "Oswald-Regular", fontSize: 24, marginVertical: 16}}> I am: </ThemedText>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.optionCard,
            selectedOption === option.id && styles.selectedCard,
          ]}
          onPress={() => handleSelect(option.id)}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Image source={option.url} style={styles.emoji} />
            <View style={selectedOption === option.id  ? styles.activeRadioCircle : styles.radioCircle }>
              {selectedOption === option.id && (
                <View style={{width: 14, height: 14, borderRadius: 7, backgroundColor: "#EB1E25"}}>
                </View>
              )}
            </View>
          </View>
          <View style={{flex: 1, width: "100%", height: 100}}>
            <Text style={styles.optionTitle}>{option.title}</Text>
            <Text style={styles.optionDescription}>{option.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    marginVertical: 10, 
    paddingHorizontal: 16
   
  },
  optionCard: {
    flexDirection: "column",
    gap: 16,
    // alignItems: "center",
    backgroundColor: "#FFF1F1",
    padding: 15,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "transparent",
    width: "100%",
    height: 200
  },
  selectedCard: { borderColor: "red"},
  emoji: { width: 56, height: 56 },
  textContainer: { flex: 1 },
  optionTitle: { fontSize: 16, color: "red", fontFamily: "Oswald-Regular" },
  optionDescription: { fontSize: 14, color: "#333", fontFamily: "Oswald-Light" },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    // borderColor: "#EB1E25",
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  activeRadioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EB1E25",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  nextButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "red",
    alignItems: "center",
  },
  nextButtonText: { color: "white", fontWeight: "bold" },
  disabledButton: { backgroundColor: "#ccc" },
});

export default PersonalitySelection;
