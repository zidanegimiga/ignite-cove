// @ts-nocheck
import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const OutlinedCheckMark = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G
      stroke="#F36827"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#a)"
    >
      <Path d="M10 18.333A8.333 8.333 0 1 0 1.667 10 8.333 8.333 0 0 0 10 18.333Z" />
      <Path d="m7.5 10 1.667 1.667L12.5 8.333" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default OutlinedCheckMark;
