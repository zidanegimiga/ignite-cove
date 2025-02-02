// @ts-nocheck
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

interface VerifiedCheckmarkProps extends SvgProps {
  color?: string;
}

const VerifiedCheckmark: React.FC<VerifiedCheckmarkProps> = ({ color = "#fff", ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M23.875 1.353a2.88 2.88 0 0 0-3.088-1.28l-4.143.953a2.88 2.88 0 0 1-1.29 0L11.211.074a2.88 2.88 0 0 0-3.087 1.279L5.866 4.956c-.23.369-.542.68-.91.913L1.351 8.127a2.88 2.88 0 0 0-1.28 3.083l.953 4.147a2.88 2.88 0 0 1 0 1.288l-.952 4.146a2.88 2.88 0 0 0 1.279 3.085l3.603 2.258c.37.23.68.541.913.91l2.258 3.604a2.88 2.88 0 0 0 3.085 1.279l4.143-.952a2.883 2.883 0 0 1 1.29 0l4.146.951a2.88 2.88 0 0 0 3.085-1.278l2.258-3.604c.23-.369.541-.68.91-.91l3.606-2.258a2.88 2.88 0 0 0 1.276-3.088l-.949-4.143a2.88 2.88 0 0 1 0-1.29l.952-4.145a2.88 2.88 0 0 0-1.277-3.085l-3.606-2.258a2.88 2.88 0 0 1-.91-.91l-2.26-3.604Zm-1.16 9.509a1.152 1.152 0 0 0-1.98-1.173l-6.026 10.198-3.638-3.484a1.151 1.151 0 1 0-1.593 1.664l4.687 4.49a1.153 1.153 0 0 0 1.788-.246l6.763-11.45Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default VerifiedCheckmark;

