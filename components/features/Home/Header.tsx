import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "expo-image";
import IgnitecoveIcon from "@/components/shared/Icons/IgnitecoveIcon";
import NotificationIcon from "@/components/shared/Icons/Notification";
import IgniteMaskedText from "@/components/shared/Text/IgniteCoveText";

const Header = () => {
  return (
    <ThemedView
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F6F6F6"
      }}
    >
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 16
        }}
      >
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ width: 24, height: 24 }}
        />
        <IgnitecoveIcon />
      </ThemedView>
      <NotificationIcon />
    </ThemedView>
  );
};

export default Header;

const styles = StyleSheet.create({});
