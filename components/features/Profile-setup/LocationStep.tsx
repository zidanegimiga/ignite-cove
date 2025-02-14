import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import { saveProfileData, loadProfileData } from "@/utilities/profileDataStorage";
import { ThemedText } from "@/components/ThemedText";
import { AntDesign } from "@expo/vector-icons";

type LocationStepProps = {
  onCompletionChange: (isComplete: boolean) => void;
};

const LocationStep: React.FC<LocationStepProps> = ({ onCompletionChange }) => {
  const [location, setLocation] = useState<string | null | undefined>(null);
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStoredLocation();
  }, []);

  const loadStoredLocation = async () => {
    const storedProfile = await loadProfileData();
    if (storedProfile?.location) {
      setLocation(storedProfile.stringLocation);
      setCoords({ latitude: storedProfile.location.latitude, longitude: storedProfile.location.longitude });
      onCompletionChange(true);
    }
  };

  const getLocation = async () => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your location to proceed.");
      setLoading(false);
      return;
    }

    const locationData = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = locationData.coords;
    setCoords({ latitude, longitude });

    const address = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (address.length > 0) {
      const readableLocation = `${address[0].district || address[0].city}, ${address[0].region || address[0].country}`;
      setLocation(readableLocation);

      await saveProfileData({ stringLocation: readableLocation, location: {latitude, longitude} });
      onCompletionChange(true);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <ThemedText style={{fontFamily: "Oswald-Regular", fontSize: 24, lineHeight: 28, marginBottom: 16}}>Where are you at?</ThemedText>
      <TouchableOpacity onPress={getLocation} style={styles.locationBox}>
        <AntDesign name="enviromento" size={20} color="#EB1E25" />
        <Text style={styles.locationText}>{location || "Detecting location..."}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationStep;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 16
  },
  locationBox: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  locationText: {
    fontSize: 16,
    color: "#333",
  },
});
