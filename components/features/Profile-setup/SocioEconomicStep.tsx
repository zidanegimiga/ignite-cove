import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
import {
  saveProfileData,
  loadProfileData,
} from "@/utilities/profileDataStorage";
import { ThemedText } from "@/components/ThemedText";

type SocioEconomicStepProps = {
  onCompletionChange: (isComplete: boolean) => void;
  onSkip: () => void;
};

const SocioEconomicStep: React.FC<SocioEconomicStepProps> = ({
  onCompletionChange,
  onSkip,
}) => {
  const [dropdownStates, setDropdownStates] = useState({
    languageOpen: false,
    ethnicityOpen: false,
    religionOpen: false,
    educationOpen: false,
  });

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedEthnicity, setSelectedEthnicity] = useState<string | null>(
    null
  );
  const [selectedReligion, setSelectedReligion] = useState<string | null>(null);
  const [selectedEducation, setSelectedEducation] = useState<string | null>(
    null
  );
  const [occupation, setOccupation] = useState("");
  const [industry, setIndustry] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, []);

  useEffect(() => {
    const isComplete = checkCompletion();
    onCompletionChange(isComplete);
  }, [
    selectedLanguages,
    selectedEthnicity,
    selectedReligion,
    selectedEducation,
    occupation,
    industry,
  ]);

  const checkCompletion = () => {
    return !!(
      selectedLanguages.length > 0 ||
      selectedEthnicity ||
      selectedReligion ||
      selectedEducation ||
      occupation ||
      industry
    );
  };

  const loadStoredData = async () => {
    const storedProfile = await loadProfileData();
    if (storedProfile?.socioEconomic) {
      const {
        languages,
        ethnicity,
        religion,
        educationLevel,
        occupation,
        industry,
      } = storedProfile.socioEconomic;
      setSelectedLanguages(languages || []);
      setSelectedEthnicity(ethnicity);
      setSelectedReligion(religion);
      setSelectedEducation(educationLevel);
      setOccupation(occupation);
      setIndustry(industry);
    }
    setLoading(false);
  };

  const handleRemoveLanguage = (language: string) => {
    setSelectedLanguages((prev) => prev.filter((item) => item !== language));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <FlatList
            data={[1]}
            keyExtractor={(item) => item.toString()}
            renderItem={() => (
              <View style={styles.scrollContent}>
                <ThemedText
                  style={{
                    fontFamily: "Oswald-Regular",
                    fontSize: 24,
                    marginVertical: 16,
                    lineHeight: 26,
                  }}
                >
                  What is your cultural, social and educational background?
                </ThemedText>

                <Text style={styles.label}>Languages</Text>
                <DropDownPicker
                  listMode="FLATLIST"
                  zIndex={3000}
                  zIndexInverse={1000}
                  open={dropdownStates.languageOpen}
                  setOpen={() =>
                    setDropdownStates({
                      ...dropdownStates,
                      languageOpen: !dropdownStates.languageOpen,
                    })
                  }
                  multiple={true}
                  value={selectedLanguages}
                  items={[
                    { label: "English", value: "english" },
                    { label: "French", value: "french" },
                    { label: "Spanish", value: "spanish" },
                  ]}
                  labelStyle={{
                    fontFamily: "Oswald-Light",
                  }}
                  setValue={setSelectedLanguages}
                  placeholder="Select languages"
                  style={{ ...styles.dropdown }}
                />

                <View style={styles.selectedItemsContainer}>
                  {selectedLanguages.map((language) => (
                    <View key={language} style={styles.selectedItem}>
                      <Text style={styles.selectedItemText}>{language}</Text>
                      <TouchableOpacity
                        onPress={() => handleRemoveLanguage(language)}
                      >
                        <View style={styles.removeButtonContainer}>
                          <Ionicons name="close" size={8} color="red" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>

                {/* Ethnicity Dropdown */}
                <Text style={styles.label}>Ethnicity</Text>
                <DropDownPicker
                  open={dropdownStates.ethnicityOpen}
                  zIndex={2000}
                  listMode="FLATLIST"
                  zIndexInverse={1000}
                  setOpen={() =>
                    setDropdownStates({
                      ...dropdownStates,
                      ethnicityOpen: !dropdownStates.ethnicityOpen,
                    })
                  }
                  value={selectedEthnicity}
                  items={[
                    { label: "African", value: "african" },
                    { label: "Asian", value: "asian" },
                    { label: "Hispanic", value: "hispanic" },
                  ]}
                  setValue={(val) => setSelectedEthnicity(val)}
                  placeholder="Select your ethnicity"
                  style={styles.dropdown}
                />

                <Text style={styles.label}>Occupation</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your occupation"
                  value={occupation}
                  onChangeText={setOccupation}
                />

                <Text style={styles.label}>Industry</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g technology, health"
                  value={industry}
                  onChangeText={setIndustry}
                />

                {/* Religion Dropdown */}
                <Text style={styles.label}>Religion</Text>
                <DropDownPicker
                  listMode="FLATLIST"
                  open={dropdownStates.religionOpen}
                  zIndex={2500}
                  zIndexInverse={1000}
                  setOpen={() =>
                    setDropdownStates({
                      ...dropdownStates,
                      religionOpen: !dropdownStates.religionOpen,
                    })
                  }
                  value={selectedReligion}
                  items={[
                    { label: "Christianity", value: "christianity" },
                    { label: "Islam", value: "islam" },
                    { label: "Hinduism", value: "hinduism" },
                  ]}
                  setValue={(val) => setSelectedReligion(val)}
                  placeholder="Select your religion"
                  style={styles.dropdown}
                />

                <Text style={styles.label}>Education Level</Text>
                <DropDownPicker
                  listMode="FLATLIST"
                  zIndex={3000}
                  zIndexInverse={1000}
                  labelStyle={{
                    fontFamily: "Oswald-Light",
                  }}
                  open={dropdownStates.educationOpen}
                  setOpen={() =>
                    setDropdownStates({
                      ...dropdownStates,
                      educationOpen: !dropdownStates.educationOpen,
                    })
                  }
                  value={selectedEducation}
                  items={[
                    { label: "High School", value: "high_school" },
                    { label: "Bachelor's", value: "bachelor" },
                    { label: "Master's", value: "master" },
                  ]}
                  setValue={(val) => setSelectedEducation(val)}
                  placeholder="Select highest education level attained"
                  style={styles.dropdown}
                />
              </View>
            )}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
    
  },
  inner: {
    flex: 1,
    
  },
  scrollContent: {
    flex: 1,
    paddingBottom: 440,
    paddingHorizontal: 16,
  },
  selectedItemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  selectedItem: {
    backgroundColor: "#FFF1F1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  selectedItemText: {
    fontSize: 12,
    fontFamily: "Oswald-Light",
  },
  removeButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    width: 16,
    height: 16,
    borderColor: "#EB1E25",
    borderStyle: "solid",
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    fontFamily: "Oswald-Regular",
    marginBottom: 6,
    color: "#333",
  },
  dropdown: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    zIndex: 4,
    fontFamily: "Oswald-Regular",
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
});

export default SocioEconomicStep;
