import React, { useState, useEffect, useMemo, useCallback } from "react";
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
};

const SocioEconomicStep: React.FC<SocioEconomicStepProps> = ({ onCompletionChange }) => {
  const [dropdownStates, setDropdownStates] = useState({
    languageOpen: false,
    ethnicityOpen: false,
    religionOpen: false,
    educationOpen: false,
  });

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedEthnicity, setSelectedEthnicity] = useState<string | null>(null);
  const [selectedReligion, setSelectedReligion] = useState<string | null>(null);
  const [selectedEducation, setSelectedEducation] = useState<string | null>(null);
  const [occupation, setOccupation] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // **Load Stored Data When Component Mounts**
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedProfile = await loadProfileData();
        if (storedProfile?.socioEconomic) {
          const { languages, ethnicity, religion, educationLevel, occupation, industry } =
            storedProfile.socioEconomic;

          setSelectedLanguages(languages || []);
          setSelectedEthnicity(ethnicity);
          setSelectedReligion(religion);
          setSelectedEducation(educationLevel);
          setOccupation(occupation || "");
          setIndustry(industry || "");
        }
      } catch (error) {
        console.error("Error loading socio-economic data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredData();
  }, []);

  // **Save Data to Storage Whenever Any Field Updates**
  useEffect(() => {
    const isComplete = checkCompletion();
    onCompletionChange(isComplete);

    const saveData = async () => {
      try {
        await saveProfileData({
          socioEconomic: {
            languages: selectedLanguages,
            ethnicity: selectedEthnicity,
            religion: selectedReligion,
            educationLevel: selectedEducation,
            occupation,
            industry,
          },
        });

        console.log("Socio-economic data saved");
      } catch (error) {
        console.error("Error saving socio-economic data:", error);
      }
    };

    saveData();
  }, [
    selectedLanguages,
    selectedEthnicity,
    selectedReligion,
    selectedEducation,
    occupation,
    industry,
  ]);

  // **Check if All Required Fields are Filled**
  const checkCompletion = useCallback(() => {
    return !!(
      selectedLanguages.length > 0 ||
      selectedEthnicity ||
      selectedReligion ||
      selectedEducation ||
      occupation ||
      industry
    );
  }, [selectedLanguages, selectedEthnicity, selectedReligion, selectedEducation, occupation, industry]);

  // **Remove a Selected Language**
  const handleRemoveLanguage = (language: string) => {
    setSelectedLanguages((prev) => prev.filter((item) => item !== language));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <FlatList
            data={[1]}
            keyExtractor={(item) => item.toString()}
            renderItem={() => (
              <View style={styles.scrollContent}>
                <ThemedText style={{ fontFamily: "Oswald-Regular", fontSize: 24, marginVertical: 16 }}>
                  What is your cultural, social, and educational background?
                </ThemedText>

                {/* Language Selection */}
                <Text style={styles.label}>Languages</Text>
                <DropDownPicker
                  listMode="FLATLIST"
                  open={dropdownStates.languageOpen}
                  setOpen={() => setDropdownStates({ ...dropdownStates, languageOpen: !dropdownStates.languageOpen })}
                  multiple={true}
                  value={selectedLanguages}
                  items={[
                    { label: "English", value: "english" },
                    { label: "French", value: "french" },
                    { label: "Spanish", value: "spanish" },
                  ]}
                  setValue={setSelectedLanguages}
                  placeholder="Select languages"
                  style={styles.dropdown}
                />

                <View style={styles.selectedItemsContainer}>
                  {selectedLanguages.map((language) => (
                    <View key={language} style={styles.selectedItem}>
                      <Text style={styles.selectedItemText}>{language}</Text>
                      <TouchableOpacity onPress={() => handleRemoveLanguage(language)}>
                        <Ionicons name="close" size={14} color="red" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>

                {/* Ethnicity Dropdown */}
                <Text style={styles.label}>Ethnicity</Text>
                <DropDownPicker
                  open={dropdownStates.ethnicityOpen}
                  setOpen={() => setDropdownStates({ ...dropdownStates, ethnicityOpen: !dropdownStates.ethnicityOpen })}
                  value={selectedEthnicity}
                  items={[
                    { label: "African", value: "african" },
                    { label: "Asian", value: "asian" },
                    { label: "Hispanic", value: "hispanic" },
                  ]}
                  setValue={setSelectedEthnicity}
                  placeholder="Select your ethnicity"
                  style={styles.dropdown}
                />

                {/* Occupation Input */}
                <Text style={styles.label}>Occupation</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your occupation"
                  value={occupation}
                  onChangeText={setOccupation}
                />

                {/* Industry Input */}
                <Text style={styles.label}>Industry</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., technology, health"
                  value={industry}
                  onChangeText={setIndustry}
                />

                {/* Religion Dropdown */}
                <Text style={styles.label}>Religion</Text>
                <DropDownPicker
                  open={dropdownStates.religionOpen}
                  setOpen={() => setDropdownStates({ ...dropdownStates, religionOpen: !dropdownStates.religionOpen })}
                  value={selectedReligion}
                  items={[
                    { label: "Christianity", value: "christianity" },
                    { label: "Islam", value: "islam" },
                    { label: "Hinduism", value: "hinduism" },
                  ]}
                  setValue={setSelectedReligion}
                  placeholder="Select your religion"
                  style={styles.dropdown}
                />

                {/* Education Level Dropdown */}
                <Text style={styles.label}>Education Level</Text>
                <DropDownPicker
                  open={dropdownStates.educationOpen}
                  setOpen={() => setDropdownStates({ ...dropdownStates, educationOpen: !dropdownStates.educationOpen })}
                  value={selectedEducation}
                  items={[
                    { label: "High School", value: "high_school" },
                    { label: "Bachelor's", value: "bachelor" },
                    { label: "Master's", value: "master" },
                  ]}
                  setValue={setSelectedEducation}
                  placeholder="Select education level"
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
