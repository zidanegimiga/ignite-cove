// @ts-nocheck
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const Eye = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      fill="#EB1E25"
      d="M19.338 10.287A10.431 10.431 0 0 0 10 3.625a10.431 10.431 0 0 0-9.337 6.662.625.625 0 0 0 0 .425A10.43 10.43 0 0 0 10 17.376a10.431 10.431 0 0 0 9.338-6.662.624.624 0 0 0 0-.425ZM10 16.125c-3.312 0-6.812-2.456-8.081-5.625C3.188 7.331 6.688 4.875 10 4.875c3.313 0 6.813 2.456 8.081 5.625-1.268 3.169-4.768 5.625-8.08 5.625Z"
    />
    <Path
      fill="#EB1E25"
      d="M10 6.75a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5ZM10 13a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
    />
  </Svg>
)
export default Eye
