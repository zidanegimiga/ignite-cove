// @ts-nocheck
import React from "react";
import { SafeAreaView, View, Image, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import OnboardingCard from "@/components/features/Onboarding/Card";
import Button from "@/components/shared/Button";
import { useNavigation, useRouter } from "expo-router";

const OnboardingHome = () => {
  const [loaded, error] = useFonts({
    "Oswald-Bold": require("../../assets/fonts/oswald/Oswald-Bold.ttf"),
  });

  const navigation = useNavigation()
  const router = useRouter()

  if (!loaded || error) {
    return null;
  }

  function handlePress() {
    navigation.navigate('payment')
  }
  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <Text
          style={{
            fontSize: 20,
            color: "#FA623B",
            fontFamily: "Oswald-Bold",
          }}
        >
          Ignitecove
        </Text>
      </View>

      <OnboardingCard />
      {/* <Button title="Get Started" onPress={handlePress}/> */}
      <Button title="Get Started" onPress={router.replace('/(profile-setup)')}/>



    </SafeAreaView>
  );
};

export default OnboardingHome;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    gap: 6,
    marginBottom: 24
  },
  logo: {
    height: 40,
    width: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FA623B",
  },
});
