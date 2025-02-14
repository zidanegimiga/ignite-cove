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

type GenderStepProps = {
  onCompletionChange: (isComplete: boolean) => void;
};

const GENDER_OPTIONS = ["Male", "Female", "Non-binary", "Prefer not to say"];
const EXTENDED_GENDER_OPTIONS = [
  ...GENDER_OPTIONS,
  "Transgender",
  "Genderfluid",
  "Agender",
  "Other",
];

const GenderSelection: React.FC<GenderStepProps> = ({ onCompletionChange }) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadStoredGender();
  }, []);

  const loadStoredGender = async () => {
    const storedProfile = await loadProfileData();
    if (storedProfile?.gender) {
      setSelectedGender(storedProfile.gender);
      onCompletionChange(true);
    }
  };

  const handleSelectGender = async (gender: string) => {
    setSelectedGender(gender);
    await saveProfileData({ gender });
    onCompletionChange(true);
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
        I am a:
      </ThemedText>
      <FlatList
        data={showAll ? EXTENDED_GENDER_OPTIONS : GENDER_OPTIONS}
        keyExtractor={(item) => item}
        nestedScrollEnabled
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.option,
              selectedGender === item && styles.selectedOption,
            ]}
            onPress={() => handleSelectGender(item)}
          >
            <View
              style={[
                styles.radioCircle,
                { borderColor: selectedGender === item ? "#EB1E25" : "#CBD5E1" },
              ]}
            >
              {selectedGender === item && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {!showAll && (
        <TouchableOpacity
          onPress={() => setShowAll(true)}
          style={styles.seeAllButton}
        >
          <Text style={styles.seeAllText}>See All</Text>
          <AntDesign name="right" size={14} color="#EB1E25" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default GenderSelection;

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
  selectedOption: {
    backgroundColor: "#FCEDED",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#EB1E25",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EB1E25",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    fontFamily: 'Oswald-Light'
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  seeAllText: {
    fontSize: 16,
    color: "#EB1E25",
    fontFamily: "Oswald-Regular",
  },
});
