import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfile } from "@/types/profile-setup-data";
import ImageUploadIcon from "@/components/shared/Icons/ImageUpload";
import { ThemedText } from "@/components/ThemedText";
import {
  calculateCompletion,
  loadProfileData,
  saveProfileData,
} from "@/utilities/profileDataStorage";
import ProfileAvatar from "../Profile/Avatar";
import Button from "@/components/shared/Button";
import { router } from "expo-router";

type ProfileIsReadyProps = {
  onCompletionChange: (isComplete: boolean) => void;
};

const ProfileIsReady: React.FC<ProfileIsReadyProps> = ({
  onCompletionChange,
}) => {
  const [userProfile, setUserProfile] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState(null);
  const [percentage, setPercentage] = useState("");

  useEffect(() => {
    loadProfilePhoto();
    const storedProfile = loadProfileData();
    console.log("Stored: ", storedProfile);
  }, []);

  const loadProfilePhoto = async () => {
    try {
      const storedProfile = await loadProfileData();
      setUserProfile(storedProfile);
      console.log("Loaded Profile : ", storedProfile);

      if (storedProfile?.profile_photo) {
        setImage(storedProfile.profile_photo);
        onCompletionChange(true);
      }
    } catch (e) {
      console.error("Error loading profile photo:", e);
    }
  };

 function  handleOpenProfileScreen(){
    router.push("/profile");
 }

 function handleOpenHomeScreen(){
    router.push("/(screen-home)");
 }

  return (
    <View style={styles.container}>
      {image && <ProfileAvatar photoUrl={image} completion={75} />}
      <View
        style={{
          flexDirection: "column",
          marginTop: 64,
          alignContent: "center",
          width: "100%",
        }}
      >
        <ThemedText
          style={{
            fontFamily: "Oswald-Regular",
            fontSize: 24,
            lineHeight: 32,
            textAlign: "center",
            flexDirection: "column",
            gap: 40
          }}
        >
          Your Profile is ready
        </ThemedText>
        <ThemedText
          style={{
            fontFamily: "Oswald-Light",
            fontSize: 16,
            lineHeight: 24,
            textAlign: "center",
          }}
        >
          Ready to make connections, enjoy and all the Best
        </ThemedText>

        <View style={{ marginTop: 40 }}>
          <Button 
            title="Start Exploring Matches"
            onPress={handleOpenProfileScreen}
            >

            </Button>
          <Button
            title="View Account"
            spinnerColor="white"
            variant="text-only"
            onPress={handleOpenProfileScreen}
          ></Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    // paddingHorizontal: 16,
    paddingTop: 172,
    textAlign: "left",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: "Oswald-Regular",
  },
  photoContainer: {
    width: "100%",
    height: 367,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF1F1",
  },
  addText: {
    fontSize: 14,
    color: "gray",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  removeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#EB1E25",
    borderRadius: 8,
  },
  removeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileIsReady;
