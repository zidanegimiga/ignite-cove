import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useFonts } from "expo-font";

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  backgroundColor = "#EB1E25",
  textColor = "#fff",
  style,
  textStyle,
}) => {
  const [loaded, error] = useFonts({
    "Oswald-Regular": require("@/assets/fonts/oswald/Oswald-Regular.ttf"),
  });
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: disabled ? "#C9C6C5" : backgroundColor },
        style,
      ]}
    >
      <Text
        style={[
          { fontFamily: "Oswald-Regular" },
          styles.text,
          { color: textColor },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
