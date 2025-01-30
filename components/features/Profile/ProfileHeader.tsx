import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfileAvatar from "./Avatar";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

interface ProfileHeaderProps {
  name?: string;
  image_url?: string;
  age?: string | number;
}

/**
 * Props: Photo url, Profile completion percentage, Name, Age
 * @returns React Component
 */
const ProfileHeader = ({ name, age, image_url }: ProfileHeaderProps) => {
  return (
    <View style={styles.container}>
      <ProfileAvatar photoUrl="https://placebeard.it/250/250" completion={100} />
      <View style={styles.profileDescContainer}>
        <ThemedText style={styles.nameAndAge}>
          {name}, {age}
        </ThemedText>
        <Link href={"/(profile-setup)"}>
          <ThemedText style={styles.editProfileLink}>Edit Profile</ThemedText>
        </Link>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 48,
    paddingLeft: 32,
    paddingBottom: 16,
    marginTop: 16,
  },
  profileDescContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  nameAndAge: {
    fontFamily: "Oswald-Regular",
    fontSize: 18,
    lineHeight: 24,
  },
  editProfileLink: {
    fontFamily: "Oswald-Regular",
    fontSize: 14,
    color: "#EB1E25",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    display: "flex",
  },
});
