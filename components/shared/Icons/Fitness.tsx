import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Fitness = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#EB1E25"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21.5 13c-1.227-.504-3.5-2.5-7.5.5-1.052-.588-3-2-6 .5-.35-1.428-.42-4.678 0-7.5.175-.42.897-.718 3 1.5l2.5-2.5C13.325 4.408 12 3 8 3 6.5 3 5.131 4.282 4.5 6.5c-.788 2.268-2 7.5-2 10.5 0 .924 1.25 3 6 3 1 0 3.925.113 7.5-1.5l3 2.5"
    />
  </Svg>
)
export default Fitness
