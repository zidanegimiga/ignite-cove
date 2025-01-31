import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import VerifiedCheckmark from "@/components/shared/Icons/verified";

interface VerificationBannerProps {
  onPress?: () => void;
}

const VerificationBanner: React.FC<VerificationBannerProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <VerifiedCheckmark />

      <Text style={styles.text}>
        Verify your profile and make it easier for people to trust you
      </Text>

      <Feather name="chevron-right" size={20} color="white" />
    </TouchableOpacity>
  );
};

export default VerificationBanner;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EB1E25",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 10,
    height: 72,
    gap: 16
  },
  icon: {
    marginRight: 12,
  },
  text: {
    flex: 1,
    color: "white",
    fontSize: 15,
    fontFamily: "Oswald-Light",
  },
});
