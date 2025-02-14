import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfile } from "@/types/profile-setup-data";
import ImageUploadIcon from "@/components/shared/Icons/ImageUpload";
import { ThemedText } from "@/components/ThemedText";
import { loadProfileData, saveProfileData } from "@/utilities/profileDataStorage";


type PhotoUploadStepProps = {
  onCompletionChange: (isComplete: boolean) => void;
  // onSkip: () => void;
  // userProfile: UserProfile;
  // setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
};

const PhotoUploadStep: React.FC<PhotoUploadStepProps> = ({
  onCompletionChange,
  // userProfile,
  // setUserProfile,
}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [ userProfile, setUserProfile] = useState<UserProfile>()

  useEffect(() => {
    loadProfilePhoto()
  }, []);

  const loadProfilePhoto = async () => {
    try{
      const storedProfile = await loadProfileData();
      setUserProfile(storedProfile);

      if(storedProfile?.profile_photo) {
        setImageUri(storedProfile.profile_photo)
        onCompletionChange(true);
      }
    }catch(e){
      console.error("Error loading profile photo:", e);
    }
  }

  const handleImagePick = async () => {
    // if (!imageUri) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        console.log("Image selection: ", imageUri)
        console.log("Image 2: ", result.assets[0].uri)

        

        // Update the user profile with the new image URI
        const updatedProfile = { ...userProfile, profile_photo: result.assets[0].uri};
        saveProfileData(updatedProfile);

        const newData = await loadProfileData()

        onCompletionChange(true);
      }
    
  };

  return (
    <View style={styles.container}>
      <ThemedText style={{fontFamily: "Oswald-Regular", fontSize: 24, lineHeight: 28, marginVertical: 16,}}>Almost done. Let’s see that smile! Add your best photos.</ThemedText>
      <View style={{padding: 16, width: "100%"}}>
      <TouchableOpacity style={styles.photoContainer} onPress={handleImagePick}>
        {!imageUri ? (
          // <Text style={styles.addText}>Tap to add a photo</Text>
          // <></>
          <ImageUploadIcon />
        ) : (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        )}
      </TouchableOpacity>
      {imageUri && (
        <TouchableOpacity style={styles.removeButton} onPress={() => setImageUri(null)}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      )}
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
    // paddingTop: 16,
    textAlign: "left"
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

export default PhotoUploadStep;
