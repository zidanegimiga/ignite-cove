import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import MaskedView from "@react-native-masked-view/masked-view";

const MaskedText = ({ text }: { text: string}) => {
  const [loaded, error] = useFonts({
    "Oswald-Bold": require("../../../assets/fonts/oswald/Oswald-Bold.ttf"),
  });

  return (
    <MaskedView
      style={{ flex: 1, flexDirection: "row", height: "100%" }}
      maskElement={
        <View
          style={{
            backgroundColor: "transparent",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: "black",
              fontWeight: "bold",
              fontFamily: "Oswald-Bold",
            }}
          >
            { text }
          </Text>
        </View>
      }
    >
      <View
        style={{ flex: 1, height: "100%", backgroundColor: "#FA623B" }}
      ></View>
      <View
        style={{ flex: 1, height: "100%", backgroundColor: "#FE8D61" }}
      ></View>
      <View
        style={{ flex: 1, height: "100%", backgroundColor: "#EB1E25" }}
      ></View>
    </MaskedView>
  );
};

export default MaskedText;

const styles = StyleSheet.create({});
