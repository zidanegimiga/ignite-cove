import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Drinking = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#EB1E25"
      d="M18 1.5a4.5 4.5 0 1 1-1.64 8.692l-5.11 6.809V21h2.25a.75.75 0 1 1 0 1.5h-6a.75.75 0 1 1 0-1.5h2.25v-4L1.8 6.41a1.5 1.5 0 0 1-.3-.9v-.25a.75.75 0 0 1 .75-.75h1.683L2.397 2.545a.75.75 0 1 1 1.182-.924l2.256 2.89h7.916A4.501 4.501 0 0 1 18 1.5Zm-2.604 3.01h3.354a.75.75 0 0 1 .75.75v.25a1.5 1.5 0 0 1-.3.9l-1.886 2.512a3 3 0 1 0-1.92-4.41V4.51h.002Zm-8.388 1.5 3.035 3.885a.75.75 0 0 1-1.182.923L5.104 6.01H3.375L10.5 15.5l7.125-9.49H7.008Z"
    />
  </Svg>
)
export default Drinking
