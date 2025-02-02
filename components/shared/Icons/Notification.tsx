// @ts-nocheck
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const NotificationIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M4 8a8 8 0 1 1 16 0v4.697l2 3V20h-5.611a4.503 4.503 0 0 1-8.777 0H2v-4.303l2-3V8Zm5.708 12a2.5 2.5 0 0 0 4.584 0H9.708ZM12 2a6 6 0 0 0-6 6v5.303l-2 3V18h16v-1.697l-2-3V8a6 6 0 0 0-6-6Z"
    />
  </Svg>
)
export default NotificationIcon
