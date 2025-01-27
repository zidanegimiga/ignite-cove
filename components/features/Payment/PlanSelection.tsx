import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from "@/components/ThemedText";
import { useFonts } from "expo-font";
import OutlinedCheckMark from '@/components/shared/Icons/OutlinedCheckmark';
import Button from '@/components/shared/Button';

const PlanSelection = ({handleForward}: { handleForward: ()=> void}) => {
  const [loaded, error] = useFonts({
    "Oswald-Regular": require("../../../assets/fonts/oswald/Oswald-Regular.ttf"),
    "Oswald-Light": require("../../../assets/fonts/oswald/Oswald-Light.ttf"),
    "Oswald-Medium": require("../../../assets/fonts/oswald/Oswald-Medium.ttf"),
  });
  return (
    <View
      style={{
        width: "100%",
        padding: 16,
        borderRadius: 16,
        backgroundColor: "#fff",
        height: 200,
        marginTop: 16,
      }}
    >
      <ThemedText
        style={{
          fontFamily: "Oswald-Medium",
          fontSize: 14,
          lineHeight: 24,
          marginTop: 4,
          color: "#0F0D13",
        }}
      >
        Silver Plan
      </ThemedText>
      <ThemedText
        style={{
          fontFamily: "Oswald-Medium",
          fontSize: 16,
          lineHeight: 24,
          marginTop: 4,
          color: "#0F0D13",
        }}
      >
        Ksh. 199.00
      </ThemedText>
      <View
        style={{
          width: "100%",
          borderTopColor: "#CBD5E1",
          borderTopWidth: 1,
          marginVertical: 8,
          borderStyle: "solid",
        }}
      ></View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: 16,
          gap: 4,
        }}
      >
        <OutlinedCheckMark />
        <ThemedText
          style={{
            fontFamily: "Oswald-Light",
            fontSize: 12,
            lineHeight: 24,
            marginBottom: 4,
            color: "#484646",
          }}
        >
          You get two phone numbers
        </ThemedText>
      </View>
      <Button
        title="Choose Plan"
        // disabled={returnButtonActiveState()}
        onPress={handleForward}
      />
    </View>
  );
}

export default PlanSelection

const styles = StyleSheet.create({})