import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { saveProfileData, loadProfileData } from "@/utilities/profileDataStorage";
import { ThemedText } from "@/components/ThemedText";
import InputField from "@/components/ui/InputField";

type NameStepProps = {
  onCompletionChange: (isComplete: boolean) => void;
};

const NameStep: React.FC<NameStepProps> = ({ onCompletionChange }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    loadStoredNames();
  }, []);

  const loadStoredNames = async () => {
    const storedProfile = await loadProfileData();
    if (storedProfile) {
      if (storedProfile.firstName) setFirstName(storedProfile.firstName);
      if (storedProfile.lastName) setLastName(storedProfile.lastName);
    }
  };

  useEffect(() => {
    const saveName = async () => {
      const isComplete = firstName.trim() !== "" && lastName.trim() !== "";
      await saveProfileData({ firstName, lastName });

      onCompletionChange(isComplete);
    };
    saveName();
  }, [firstName, lastName]);

  return (
    <View style={styles.container}>
      <ThemedText style={{fontFamily: "Oswald-Regular", fontSize: 24, lineHeight: 28, marginBottom: 32}}>What is your name?</ThemedText>
      <InputField placeholder="Enter first name" value={firstName} onChangeText={setFirstName} label="First Name"/>
      <InputField placeholder="Enter last name" value={lastName} onChangeText={setLastName} label="Last Name"/>
    </View>
  );
};

export default NameStep;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    width: "100%",
    paddingHorizontal: 16
  },
  input: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
    fontSize: 16,
    fontFamily: "Oswald-Light"
  },
});
