// @ts-nocheck
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { blurhash } from "@/constants";
import { useNavigation, useRouter } from "expo-router";

const CustomSplash = () => {
  const [loaded, error] = useFonts({
    'Oswald-Regular': require('../assets/fonts/oswald/Oswald-Regular.ttf'),
    'Oswald-Bold': require('../assets/fonts/oswald/Oswald-Bold.ttf'),
  });
  const navigation = useNavigation();
  const router = useRouter()

  useEffect(() => {
    if (loaded) {
      console.log("Fonts have loaded, navigating to onboarding...");
      setTimeout(() => {
        router.replace("(onboarding)");
      }, 100);
    }
  }, [loaded]);

  useEffect(() => {
    if (error) {
      console.log("Error loading fonts:", error);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/splash.png")}
          placeholder={{ blurhash }}
        />
        <View>
          <Text style={{ fontFamily: 'Oswald-Bold', fontSize: 20, marginBottom: 4, marginTop: 16, color: "#FA623B", textAlign: "center" }}>Ignitecove</Text>
          <Text style={{ fontFamily: 'Oswald-Regular', fontSize: 18 }}>The ultimate dating app.</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomSplash;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%"
  },
  image: {
    height: 200,
    width: 200,
    contentFit: "contain"
  },
  imageContainer: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    backgroundColor: "transparent",
    color: "white",
    textAlign: "center",
  },
});
