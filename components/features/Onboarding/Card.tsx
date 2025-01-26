import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState, useRef } from "react";
import { red } from "react-native-reanimated/lib/typescript/Colors";
import { Step1SVG, Step2SVG } from "./SvgComponents";
export { Image } from "expo-image";
const { width } = Dimensions.get("window");

type IndicatorProps = {
  steps: number;
  activeStep: number;
};

function Indicator({ steps, activeStep }: IndicatorProps) {
  return (
    <View style={styles.indicatorContainer}>
      {Array.from({ length: steps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.normalIndicator,
            index === activeStep && styles.activeIndicator,
          ]}
        />
      ))}
    </View>
  );
}

export default function OnboardingCard() {
  const [step, setStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;

  const [loaded, error] = useFonts({
    "Oswald-Regular": require("@/assets/fonts/oswald/Oswald-Regular.ttf"),
  });

  if (!loaded || error) {
    return null;
  }

  const config = [
    {
      text: "Where Sparks Fly & Connections Ignite!",
      svgBackground: () => <Step1SVG />
    },
    {
      text: "Skip Small Talk, Let's Go On Dates",
      svgBackground: () => <Step2SVG />
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: -width,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setStep((prev) => (prev + 1) % config.length);
        fadeAnim.setValue(0);
        translateAnim.setValue(width);

        Animated.sequence([
          Animated.timing(translateAnim, {
            toValue: 0,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [fadeAnim, translateAnim]);

  const currentStep = config[step] || config[0];

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 300,
          paddingTop: 16,
          width: "100%"
        }}
      >
        <Animated.View
          style={[
            styles.textContainer,
            { opacity: fadeAnim, transform: [{ translateX: translateAnim }] },
          ]}
        >
          <Text style={ {fontFamily: 'Oswald-Regular', ...styles.text}}>{currentStep.text}</Text>
        </Animated.View>
      </View>

      <View style={styles.svgContainer}>{currentStep.svgBackground()}</View>

      <Indicator steps={config.length} activeStep={step} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 540,
    backgroundColor: "#FFC6C8",
    borderRadius: 24,
    padding: 32,
    position: "relative",
    marginBottom: 32,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    overflow: "hidden"
  },
  text: {
    fontSize: 56,
    lineHeight: 64,
    color: "#000",
  },
  activeIndicator: {
    borderRadius: 12,
    width: 32,
    height: 12,
    backgroundColor: "#EB1E25",
  },
  normalIndicator: {
    borderRadius: "50%",
    width: 12,
    height: 12,
    backgroundColor: "#fff",
  },
  svgContainer: {
    position: "absolute",
    bottom: -5,
    right: -15,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  textContainer: {

  },
});
