//@ts-nocheck
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { View, StyleSheet } from "react-native";

const Chevron = (props: SvgProps) => (
  <View>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m15 18-6-6 6-6"
      />
    </Svg>
  </View>
);
export default Chevron;
