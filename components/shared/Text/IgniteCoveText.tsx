import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const IgniteMaskedText = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={97}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="url(#a)"
      d="M.136 19V5.128H3.76V19H.136ZM.112 2.848V.136H3.76v2.712H.112Zm10.484 20.856c-.992 0-1.872-.104-2.64-.312-.752-.192-1.336-.496-1.752-.912-.416-.416-.624-.936-.624-1.56 0-.48.104-.904.312-1.272.224-.368.528-.688.912-.96a5.511 5.511 0 0 1 1.296-.672l1.44.24c-.192.16-.368.32-.528.48-.16.16-.296.328-.408.504a1.284 1.284 0 0 0-.144.624c0 .368.192.64.576.816.4.176 1.064.264 1.992.264.8 0 1.416-.08 1.848-.24.432-.144.648-.424.648-.84a.873.873 0 0 0-.168-.552c-.112-.144-.304-.256-.576-.336-.256-.096-.616-.168-1.08-.216l-3.36-.408c-.704-.096-1.264-.344-1.68-.744-.4-.416-.6-.92-.6-1.512 0-.56.168-1.072.504-1.536a8.56 8.56 0 0 1 1.368-1.392l1.248.744c-.16.176-.304.36-.432.552a1.052 1.052 0 0 0-.168.576c0 .192.096.344.288.456.192.112.52.192.984.24l3.096.384c1.152.144 2 .528 2.544 1.152.56.624.84 1.44.84 2.448 0 .864-.192 1.592-.576 2.184-.384.592-1 1.04-1.848 1.344-.832.304-1.936.456-3.312.456Zm.216-9.144c-1.056 0-1.944-.192-2.664-.576-.704-.4-1.24-.96-1.608-1.68-.352-.72-.528-1.576-.528-2.568 0-1.04.184-1.92.552-2.64a3.688 3.688 0 0 1 1.608-1.632c.72-.384 1.6-.576 2.64-.576.992 0 1.824.2 2.496.6.688.4 1.208.96 1.56 1.68.352.72.528 1.584.528 2.592 0 .992-.168 1.848-.504 2.568a3.784 3.784 0 0 1-1.512 1.656c-.672.384-1.528.576-2.568.576Zm0-2.232c.24 0 .432-.048.576-.144a.874.874 0 0 0 .36-.456 3.1 3.1 0 0 0 .168-.792c.032-.336.048-.736.048-1.2 0-.464-.016-.856-.048-1.176a3.156 3.156 0 0 0-.168-.816c-.08-.224-.2-.384-.36-.48-.144-.096-.336-.144-.576-.144-.24 0-.44.048-.6.144a.998.998 0 0 0-.384.456c-.08.208-.136.48-.168.816-.032.336-.048.736-.048 1.2 0 .448.016.84.048 1.176a3.1 3.1 0 0 0 .168.792c.08.208.2.368.36.48.16.096.368.144.624.144Zm3.816-4.992-.768-1.032a3.33 3.33 0 0 1 .888-1.056c.384-.288.872-.568 1.464-.84l.864 1.824c-.16.048-.408.144-.744.288-.32.128-.648.272-.984.432-.32.144-.56.272-.72.384ZM17.994 19V5.128h3.624V6.52a6.554 6.554 0 0 1 1.56-1.176 3.669 3.669 0 0 1 1.776-.456c.576 0 1.04.144 1.392.432.368.288.64.672.816 1.152.176.464.264.992.264 1.584V19h-3.6V8.656c0-.384-.064-.672-.192-.864-.112-.192-.336-.288-.672-.288-.192 0-.408.056-.648.168a3.564 3.564 0 0 0-.696.408V19h-3.624Zm11.884 0V5.128h3.624V19h-3.624Zm-.024-16.152V.136h3.648v2.712h-3.648Zm10.34 16.296c-.976 0-1.736-.144-2.28-.432a2.435 2.435 0 0 1-1.104-1.296c-.208-.56-.312-1.24-.312-2.04V7.504H35.13V5.128h1.368v-4.2h3.648v4.2h2.04v2.376h-2.04v7.536c0 .432.112.744.336.936.224.176.528.264.912.264.192 0 .376-.008.552-.024.176-.032.336-.056.48-.072v2.832c-.24.032-.568.064-.984.096-.4.048-.816.072-1.248.072Zm8.371.096c-1.024 0-1.88-.184-2.568-.552a3.721 3.721 0 0 1-1.56-1.656c-.352-.736-.528-1.616-.528-2.64V9.736c0-1.056.176-1.936.528-2.64.352-.72.88-1.264 1.584-1.632.704-.384 1.552-.576 2.544-.576 1.056 0 1.912.192 2.568.576.656.384 1.136.944 1.44 1.68.32.736.48 1.632.48 2.688v2.424h-5.568v2.688c0 .4.04.728.12.984.096.256.224.44.384.552.16.096.36.144.6.144a1.1 1.1 0 0 0 .576-.144.954.954 0 0 0 .384-.504c.08-.224.12-.52.12-.888v-1.32h3.36v1.152c0 1.408-.384 2.48-1.152 3.216-.768.736-1.872 1.104-3.312 1.104Zm-1.08-8.712h2.184V9.16c0-.4-.04-.72-.12-.96-.08-.256-.208-.432-.384-.528-.16-.112-.368-.168-.624-.168-.24 0-.44.056-.6.168-.144.112-.256.312-.336.6-.08.272-.12.664-.12 1.176v1.08ZM59.58 19.24c-1.024 0-1.88-.192-2.568-.576a3.863 3.863 0 0 1-1.56-1.68c-.336-.72-.504-1.576-.504-2.568v-4.68c0-1.04.168-1.912.504-2.616a3.721 3.721 0 0 1 1.56-1.656c.688-.384 1.544-.576 2.568-.576.992 0 1.824.16 2.496.48.672.304 1.168.768 1.488 1.392.336.624.504 1.408.504 2.352v1.32h-3.456V9.016c0-.416-.04-.736-.12-.96-.064-.24-.176-.408-.336-.504-.144-.096-.336-.144-.576-.144-.24 0-.432.064-.576.192-.144.112-.248.312-.312.6-.064.272-.096.656-.096 1.152V14.8c0 .752.08 1.264.24 1.536.176.256.432.384.768.384.256 0 .456-.056.6-.168.144-.112.248-.288.312-.528.064-.24.096-.544.096-.912v-1.68h3.456v1.512c0 .928-.168 1.72-.504 2.376-.336.64-.84 1.12-1.512 1.44-.672.32-1.496.48-2.472.48Zm10.97 0c-.992 0-1.84-.176-2.544-.528a3.749 3.749 0 0 1-1.608-1.584c-.352-.688-.528-1.544-.528-2.568V9.568c0-1.024.176-1.88.528-2.568a3.61 3.61 0 0 1 1.608-1.56c.704-.368 1.552-.552 2.544-.552s1.84.184 2.544.552A3.61 3.61 0 0 1 74.702 7c.368.688.552 1.544.552 2.568v4.992c0 1.024-.184 1.88-.552 2.568a3.749 3.749 0 0 1-1.608 1.584c-.704.352-1.552.528-2.544.528Zm.024-2.448c.304 0 .536-.08.696-.24.16-.176.264-.408.312-.696.048-.304.072-.648.072-1.032V9.328c0-.4-.024-.744-.072-1.032-.048-.288-.152-.52-.312-.696-.16-.176-.392-.264-.696-.264-.304 0-.536.088-.696.264-.16.176-.272.408-.336.696a6.378 6.378 0 0 0-.072 1.032v5.496c0 .384.024.728.072 1.032.064.288.176.52.336.696.16.16.392.24.696.24ZM79.255 19 76.471 5.128h3.504l1.272 9.336 1.2-9.336h3.48L83.119 19h-3.864Zm12.482.24c-1.024 0-1.88-.184-2.568-.552a3.721 3.721 0 0 1-1.56-1.656c-.352-.736-.528-1.616-.528-2.64V9.736c0-1.056.176-1.936.528-2.64.352-.72.88-1.264 1.584-1.632.704-.384 1.552-.576 2.544-.576 1.056 0 1.912.192 2.568.576.656.384 1.136.944 1.44 1.68.32.736.48 1.632.48 2.688v2.424h-5.568v2.688c0 .4.04.728.12.984.096.256.224.44.384.552.16.096.36.144.6.144a1.1 1.1 0 0 0 .576-.144.954.954 0 0 0 .384-.504c.08-.224.12-.52.12-.888v-1.32h3.36v1.152c0 1.408-.384 2.48-1.152 3.216-.768.736-1.872 1.104-3.312 1.104Zm-1.08-8.712h2.184V9.16c0-.4-.04-.72-.12-.96-.08-.256-.208-.432-.384-.528-.16-.112-.368-.168-.624-.168-.24 0-.44.056-.6.168-.144.112-.256.312-.336.6-.08.272-.12.664-.12 1.176v1.08Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={60}
        x2={26.654}
        y1={22.182}
        y2={-4.934}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FA623B" />
        <Stop offset={0.455} stopColor="#FE8D61" />
        <Stop offset={1} stopColor="#EB1E25" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default IgniteMaskedText;
