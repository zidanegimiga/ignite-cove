import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfile } from "@/types/profile-setup-data";
import ImageUploadIcon from "@/components/shared/Icons/ImageUpload";
import { ThemedText } from "@/components/ThemedText";
import { loadProfileData, saveProfileData } from "@/utilities/profileDataStorage";
import { useRouter } from "expo-router";


type LoadingScreenProps = {
  onCompletionChange: (isComplete: boolean) => void;
  nextStep: () => void;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onCompletionChange,
  nextStep
}) => {
    const router = useRouter()
    useEffect(()=>{
        setTimeout(()=> {
            nextStep()
        }, 3000)
    }, [])
  return (
    <View style={styles.container}>
      <Text style={{fontFamily: "Oswald-Regular", fontSize: 18}}>Setting up your profile...</Text>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    // paddingHorizontal: 16,
    paddingTop: 48,
    textAlign: "left"
  }
});

export default LoadingScreen;
