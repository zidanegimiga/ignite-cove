import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const ImageUploadIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={56}
    fill="none"
    {...props}
  >
    <Path
      stroke="#313030"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M37.333 11.667h14m-7-7v14M49 26.833v17.5A4.667 4.667 0 0 1 44.333 49H11.667A4.667 4.667 0 0 1 7 44.333V11.667A4.667 4.667 0 0 1 11.667 7h17.5"
    />
    <Path
      stroke="#313030"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m49 35-7.2-7.2a4.667 4.667 0 0 0-6.6 0L14 49M21 25.667a4.667 4.667 0 1 0 0-9.333 4.667 4.667 0 0 0 0 9.333Z"
    />
  </Svg>
)
export default ImageUploadIcon
