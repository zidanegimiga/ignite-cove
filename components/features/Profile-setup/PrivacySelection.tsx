import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";

type PrivacySelectionProps = {
  onSelectionChange: (option: string) => void;
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

const PrivacySelection: React.FC<PrivacySelectionProps> = ({
  onSelectionChange, onCompletionChange
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    loadSelection();
  }, []);

  const loadSelection = async () => {
    try {
      const storedOption = await AsyncStorage.getItem("privacy_selection");
      if (storedOption) {
        console.log("Selection: ", storedOption)
        setSelectedOption(storedOption);
        onSelectionChange(storedOption);
        onCompletionChange(true);
      }
      console.log("Selection: ", storedOption)
    } catch (error) {
      console.error("Error loading selection", error);
    }
  };

  const handleSelect = async (id: string) => {
    setSelectedOption(id);
    onSelectionChange(id);
    onCompletionChange(true);
    await AsyncStorage.setItem("privacy_selection", id);
  };

  return (
    <View style={styles.container}>
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
            <View style={ selectedOption === option.id && styles.radioCircle}>
              {selectedOption === option.id && (
                <View style={{width: 14, height: 14, borderRadius: 7, backgroundColor: "#EB1E25"}} />
              )}
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>{option.title}</Text>
            <Text style={styles.optionDescription}>{option.description}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* <TouchableOpacity
        style={[styles.nextButton, !selectedOption && styles.disabledButton]}
        onPress={onNext}
        disabled={!selectedOption}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10, paddingHorizontal: 16
   },
  optionCard: {
    flexDirection: "column",
    gap: 16,
    // alignItems: "center",
    backgroundColor: "#fdecec",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "transparent",
    width: Dimensions.get("window").width - 32
  },
  selectedCard: { borderColor: "red" },
  emoji: { width: 56, height: 56 },
  textContainer: { flex: 1 },
  optionTitle: { fontSize: 18, color: "red", fontFamily: "Oswald-Bold" },
  optionDescription: { fontSize: 14, color: "#333", fontFamily: "Oswald-Light" },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#EB1E25",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  activeRadioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
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

export default PrivacySelection;
