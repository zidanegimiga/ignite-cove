import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { saveProfileData, loadProfileData } from "@/utilities/profileDataStorage";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { HEIGHTS_CM, HEIGHTS_INCHES } from "@/constants";
import HumanHeight from "@/components/shared/Icons/human-height";
import Human from "@/components/shared/Icons/Human";
import EyeOutline from "@/components/shared/Icons/EyeOutline";
import Hair from "@/components/shared/Icons/Hair";

type PhysicalAttributesStepProps = {
  onCompletionChange: (isComplete: boolean) => void;
  onSkip: () => void;
};

const HEIGHT_UNITS = [
  { label: "cm", value: "cm" },
  { label: "in", value: "in" },
];

const BODY_TYPES = ["Slim", "Athletic", "Average", "Muscular", "Curvy", "Full"];
const EYE_COLORS = ["Brown", "Blue", "Green", "Hazel", "Gray", "Black"];
const HAIR_COLORS = ["Black", "Brown", "Blonde", "Red", "Gray", "White"];

const PhysicalAttributesStep: React.FC<PhysicalAttributesStepProps> = ({ onCompletionChange, onSkip }) => {
  const [height, setHeight] = useState<string | null | number>(null);
  const [heightUnit, setHeightUnit] = useState<string>("cm");
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);
  const [selectedEyeColor, setSelectedEyeColor] = useState<string | null>(null);
  const [selectedHairColor, setSelectedHairColor] = useState<string | null>(null);

  const [unitDropdownOpen, setUnitDropdownOpen] = useState(false);
  const [heightDropdownOpen, setHeightDropdownOpen] = useState(false);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    const storedProfile = await loadProfileData();
    if (storedProfile?.physicalAttributes) {
      const { height, metric: heightUnit, bodyType, eyeColor, hairColor } = storedProfile.physicalAttributes;
      setHeight(height);
      setHeightUnit(heightUnit);
      setSelectedBodyType(bodyType);
      setSelectedEyeColor(eyeColor);
      setSelectedHairColor(hairColor);

      const isCompleted = !!(height || bodyType || eyeColor || hairColor);
      onCompletionChange(isCompleted);
    }
  };

  const handleSave = async () => {
    const updatedData = {
      height,
      metric: heightUnit,
      bodyType: selectedBodyType,
      eyeColor: selectedEyeColor,
      hairColor: selectedHairColor,
    };

    await saveProfileData({ physicalAttributes: updatedData });

    const isCompleted = !!(height || selectedBodyType || selectedEyeColor || selectedHairColor);
    onCompletionChange(isCompleted);
  };

  const handleSkip = async () => {
    // @ts-ignore
    await saveProfileData({ skippedSteps: [...(await loadProfileData())?.skippedSteps, "physicalAttributes"] });
    onSkip();
  };

  return (
    <View style={styles.container}>
      <ThemedText
        style={{
          fontFamily: "Oswald-Regular",
          fontSize: 24,
          lineHeight: 28,
          // marginBottom: 16,
        }}
      >
        Tell us more about you
      </ThemedText>
      <View style={styles.labelContainer}>
        <HumanHeight/>
        <Text style={styles.label}>Body Type</Text>
      </View>
      <View style={styles.heightContainer}>
        <View style={{ width: "25%", height: 40 }}>
          <DropDownPicker
            open={unitDropdownOpen}
            setOpen={setUnitDropdownOpen}
            value={heightUnit}
            items={HEIGHT_UNITS}
            setValue={setHeightUnit}
            style={styles.unitPicker}
            ArrowUpIconComponent={() => (
              <AntDesign
                name={unitDropdownOpen ? "up" : "down"}
                size={16}
                color="#CBD5E1"
              />
            )}
          />
        </View>

        <View style={{ width: "70%" }}>
          <DropDownPicker
            open={heightDropdownOpen}
            setOpen={setHeightDropdownOpen}
            value={height}
            items={heightUnit == "in" ? HEIGHTS_INCHES : HEIGHTS_CM}
            setValue={setHeight}
            style={styles.unitPicker}
            ArrowUpIconComponent={() => (
              <AntDesign
                name={unitDropdownOpen ? "up" : "down"}
                size={16}
                color="#CBD5E1"
              />
            )}
          />
        </View>
      </View>

      <View style={styles.labelContainer}>
        <Human/>
        <Text style={styles.label}>Body Type</Text>
      </View>
      <View style={styles.selectionContainer}>
        {BODY_TYPES.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.option,
              selectedBodyType === type && styles.selectedOption,
            ]}
            onPress={() => {
              setSelectedBodyType(type);
              handleSave();
            }}
          >
            <Text style={styles.optionText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.labelContainer}>
        <EyeOutline/>
        <Text style={styles.label}>Eye Color</Text>
      </View>      
      <View style={styles.selectionContainer}>
        {EYE_COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.option,
              selectedEyeColor === color && styles.selectedOption,
            ]}
            onPress={() => {
              setSelectedEyeColor(color);
              handleSave();
            }}
          >
            <Text style={styles.optionText}>{color}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.labelContainer}>
        <Hair/>
        <Text style={styles.label}>Hair Color</Text>
      </View>   
     
      <View style={styles.selectionContainer}>
        {HAIR_COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.option,
              selectedHairColor === color && styles.selectedOption,
            ]}
            onPress={() => {
              setSelectedHairColor(color);
              handleSave();
            }}
          >
            <Text style={styles.optionText}>{color}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PhysicalAttributesStep;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 16

  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    gap: 8,
    marginBottom: 8,
    marginTop: 16,
  },
  heightContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",

  },
  unitPicker: {
    borderColor: "#CBD5E1",
    backgroundColor: "#fff",
    borderRadius: 10,
    
  },
  heightInput: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeholderText: {
    color: "#999",
    fontSize: 16,
    fontFamily: "Oswald-Regular"
  },
  filledText: {
    color: "#333",
    fontSize: 16,
    fontFamily: "Oswald-Regular"
  },
  label: {
    fontSize: 16,
    color: "#000000",
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
});
