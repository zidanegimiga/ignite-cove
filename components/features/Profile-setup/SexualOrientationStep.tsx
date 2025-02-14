import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import React, { useState, useEffect } from "react";
import {
  loadProfileData,
  saveProfileData,
} from "@/utilities/profileDataStorage";
import { AntDesign } from "@expo/vector-icons";

type SexualOrientationStepProps = {
  onCompletionChange: (isComplete: boolean) => void;
};

const ORIENTATION_OPTIONS = [
  "Straight",
  "Gay",
  "Lesbian",
  "Bisexual",
  "Asexual",
  "Pansexual",
  "Queer",
  "Questioning",
];

const SexualOrientationStep: React.FC<SexualOrientationStepProps> = ({ onCompletionChange }) => {
  const [selectedOrientations, setSelectedOrientations] = useState<string[]>([]);

  useEffect(() => {
    loadStoredOrientations();
  }, []);

  const loadStoredOrientations = async () => {
    const storedProfile = await loadProfileData();
    if (storedProfile?.sexualOrientation) {
      setSelectedOrientations(storedProfile.sexualOrientation);
      onCompletionChange(storedProfile.sexualOrientation.length > 0);
    }
  };

  const handleToggleSelection = async (orientation: string) => {
    let updatedSelections = [...selectedOrientations];

    if (updatedSelections.includes(orientation)) {
      updatedSelections = updatedSelections.filter((item) => item !== orientation);
    } else {
      updatedSelections.push(orientation);
    }

    setSelectedOrientations(updatedSelections);
    await saveProfileData({ sexualOrientation: updatedSelections });

    onCompletionChange(updatedSelections.length > 0);
  };
  return (
    <View style={styles.container}>
    <ThemedText
      style={{
        fontFamily: "Oswald-Regular",
        fontSize: 24,
        lineHeight: 28,
        marginBottom: 32,
      }}
    >
      My sexual orientation is:
    </ThemedText>
    <FlatList
        data={ORIENTATION_OPTIONS}
        keyExtractor={(item) => item}
        nestedScrollEnabled
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleToggleSelection(item)}
          >
            <View
              style={[
                styles.checkbox,
                { backgroundColor: selectedOrientations.includes(item) ? "#EB1E25" : "white" },
              ]}
            >
              {selectedOrientations.includes(item) && (
                <AntDesign name="check" size={16} color="white" />
              )}
            </View>
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default SexualOrientationStep

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    width: "100%",
    paddingHorizontal: 16
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderColor: "#CBD5E1",
    padding: 2
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Oswald-Light",
    color: "#333",
  },
})