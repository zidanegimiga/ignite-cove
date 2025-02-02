import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ToastAndroid,
  ActivityIndicator } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

interface PhotoAlbumCardProps {
  title: string;
  initialPhotos: string[];
}

const PhotoAlbumCard: React.FC<PhotoAlbumCardProps> = ({ title, initialPhotos }) => {
  const [expanded, setExpanded] = useState(false);
  const [photos, setPhotos] = useState(initialPhotos);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const removePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      simulateUpload(result.assets[0].uri);
    }
  };

  const simulateUpload = async (imageUri: string) => {
    setUploading(true);
    setUploadProgress(0);

    for (let progress = 0; progress <= 100; progress += 20) {
      setUploadProgress(progress);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setUploading(false);
    setUploadProgress(0);
    setPhotos([...photos, imageUri]);
    ToastAndroid.show("Photo uploaded successfully!", ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.header, { borderBottomWidth: expanded ? 1 : 0 }]}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.title}>{title}</Text>
        <Feather name={expanded ? "chevron-up" : "chevron-down"} size={20} color="black" />
      </TouchableOpacity>

      {expanded && (
        <FlatList
          data={[...photos, "add"]}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={({ item, index }) =>
            item === "add" ? (
              <TouchableOpacity style={styles.addPhoto} onPress={pickImage} disabled={uploading}>
                {uploading ? (
                  <>
                    <ActivityIndicator size="small" color="red" />
                    <Text style={styles.progressText}>{uploadProgress}%</Text>
                  </>
                ) : (
                  <>
                    <Feather name="image" size={30} color="#EB1E25" />
                    <Feather name="plus" size={16} color="#EB1E25" style={styles.addIcon} />
                  </>
                )}
              </TouchableOpacity>
            ) : (
              <View style={styles.photoContainer}>
                <Image source={{ uri: item }} style={styles.photo} />
                <TouchableOpacity style={styles.deleteButton} onPress={() => removePhoto(index)}>
                  <AntDesign name="closecircle" size={18} color="red" />
                </TouchableOpacity>
              </View>
            )
          }
        />
      )}
    </View>
  );
};
  
  export default PhotoAlbumCard;
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFF",
      borderRadius: 12,
      padding: 16,
      width: "100%",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 8,
      borderBottomColor: "#E0E0E0",
    },
    title: {
      fontFamily: "Oswald-Regular",
      fontSize: 14,
    },
    photoContainer: {
      position: "relative",
      margin: 5,
      borderRadius: 8,
      overflow: "hidden",
    },
    photo: {
      width: 90,
      height: 90,
      borderRadius: 8,
    },
    deleteButton: {
      position: "absolute",
      top: 4,
      right: 4,
      backgroundColor: "white",
      borderRadius: 10,
    },
    addPhoto: {
      width: 90,
      height: 90,
      margin: 5,
      backgroundColor: "#FFF5F5",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    },
    addIcon: {
      position: "absolute",
      top: 8,
      right: 8,
    },
    progressText: {
      fontSize: 12,
      color: "red",
      marginTop: 4,
    },
  });
  
