import { StyleSheet, Text, View, TouchableOpacity, Platform,  } from 'react-native'
import { ThemedText } from '@/components/ThemedText';
import React, { useState, useEffect } from 'react'
import { loadProfileData, saveProfileData } from '@/utilities/profileDataStorage';
import { AntDesign, Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

type DateProps = {
  onCompletionChange: (isComplete: boolean) => void;
};

const DOBStep: React.FC<DateProps> = ({ onCompletionChange }) => {
  const [dob, setDob] = useState<Date | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    loadStoredDOB();
  }, []);

  const calculateAge = (date: Date) => {
    const today = new Date();
    const birthYear = date.getFullYear();
    const currentYear = today.getFullYear();
    let calculatedAge = currentYear - birthYear;

    if (
      today.getMonth() < date.getMonth() ||
      (today.getMonth() === date.getMonth() && today.getDate() < date.getDate())
    ) {
      calculatedAge--;
    }

    setAge(calculatedAge);
    return calculatedAge;
  };


  const loadStoredDOB = async () => {
    const storedProfile = await loadProfileData();
    if (storedProfile?.DOB) {
      const storedDate = new Date(storedProfile.DOB);
      setDob(storedDate);
      calculateAge(storedDate);
      onCompletionChange(true);
    }
  };

  const onDateChange = async (event: any, selectedDate?: Date) => {
    setShowPicker(false);

    if (selectedDate) {
      setDob(selectedDate);
      const calculatedAge = calculateAge(selectedDate);
      await saveProfileData({ DOB: selectedDate.toISOString(), age: calculatedAge });

      onCompletionChange(true);
    }
  };
  return (
    <View style={styles.container}>
      <ThemedText style={{fontFamily: "Oswald-Regular", fontSize: 24, lineHeight: 28, marginBottom: 16}}>When were you born?</ThemedText>
      <ThemedText style={{fontFamily: "Oswald-Light", fontSize: 14, lineHeight: 18, marginBottom: 32}}>Your date of birth won’t be displayed on your profile, only your age will.</ThemedText>

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
        <Text style={[styles.inputText, dob ? styles.selectedText : styles.placeholderText]}>
          {dob ? dob.toDateString() : "Select date of birth"}
        </Text>
        <AntDesign name="calendar" size={20} color="#666" />
      </TouchableOpacity>

      {dob && (
        <View style={styles.ageContainer}>
          <Feather name="info" size={18} color="#333" />
          <Text style={styles.ageText}>
            Age: <Text style={styles.ageNumber}>{age}</Text>
          </Text>
          <Text style={styles.noteText}>This cannot be changed later</Text>
        </View>
      )}

      {showPicker && Platform.OS === "android" && (
        <DateTimePicker
          value={dob || new Date()}
          mode="date"
          display="calendar"
          onChange={onDateChange}
        />
      )}

      {showPicker && Platform.OS === "ios" && (
        <View style={styles.iosPickerContainer}>
          <DateTimePicker
            value={dob || new Date()}
            mode="date"
            display="spinner"
            onChange={onDateChange}
          />
          <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.doneButton}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      )}


    </View>
  )
}

export default DOBStep

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 16
  },
  input: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    marginBottom: 12,
    fontSize: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  inputText: {
    fontSize: 16,
    fontFamily: "Oswald-Light"
  },
  placeholderText: {
    color: "#999",
    fontFamily: "Oswald-Light"
  },
  selectedText: {
    color: "#333",
    fontFamily: "Oswald-Light"
  },
  iosPickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  doneButton: {
    marginTop: 10,
    backgroundColor: "#EB1E25",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  doneText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Oswald-Regular"
  },
  ageContainer: {
    backgroundColor: "#FFEDED",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ageText: {
    fontSize: 14,
    fontFamily: "Oswald-Regular",
    color: "#333",
  },
  ageNumber: {
    color: "#EB1E25",
    fontFamily: "Oswald-Medium",
    fontSize: 14,
  },
  noteText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Oswald-Light",
  },
});
