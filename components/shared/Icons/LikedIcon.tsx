// @ts-nocheck
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

interface Props extends SvgProps {
  active?: boolean
}

const LikedIcon = (props: Props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.active ? "#EB1E25" : "#484646"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.5 3C4.463 3 2 5.583 2 8.768 2 14.536 8.5 19.78 12 21c3.5-1.22 10-6.464 10-12.232C22 5.583 19.538 3 16.5 3c-1.86 0-3.505.969-4.5 2.451a5.584 5.584 0 0 0-1.964-1.802A5.29 5.29 0 0 0 7.5 3Z"
    />
  </Svg>
)
export default LikedIcon