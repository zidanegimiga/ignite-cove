import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";
// "https://placebeard.it/250/250"

interface ProfileAvatar {
  photoUrl: string;
  completion: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * Props: Photo url, Profile completion percentage, Name, Age
 * @returns React Component
 */
const ProfileAvatar = ({ photoUrl, completion }: ProfileAvatar) => {
  const size = 72;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress: any = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming((completion / 100) * circumference, {
      duration: 1500,
      easing: Easing.out(Easing.exp),
    });
  }, [completion]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference - progress.value,
  }));

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: "absolute" }}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#D9D9D9"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F36827"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <Image
        source={{ uri: photoUrl }}
        style={{
          width: size - strokeWidth * 2,
          height: size - strokeWidth * 2,
          borderRadius: (size - strokeWidth * 2) / 2,
          position: "absolute",
        }}
      />

      <View style={styles.completionChip}>
        <Text style={styles.completionText}>{completion}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  completionText: {
    color: "#FF5733",
    fontFamily: "Oswald-Bold",
    fontSize: 12,
  },
  completionChip: {
    position: "absolute",
    bottom: -42,
    backgroundColor: "#FFF1F1",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
});

export default ProfileAvatar;
